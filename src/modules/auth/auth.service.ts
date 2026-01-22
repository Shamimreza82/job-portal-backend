/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { TUser, TUserPayload } from '../../types/user';
import { prisma } from '../../config/prisma';
import { TProfileInput } from './profile.validation';
import { AppError } from '../../utils/AppError';
import { createEmailToken } from '../../utils/createEmailToken';
import sendEmail from '../../utils/sendEmail';
import bcrypt from "bcryptjs";
import { verifyEmailTemplate } from '../../utils/emailTemplate/VerifyLink';



const register = async (payload: TUser) => {


    const salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);
    const hash = bcrypt.hashSync(payload.password, salt);
    payload.password = hash;



    const isExist = await prisma.user.findUnique({ where: { email: payload.email } })
    if (isExist) {
        throw new AppError(404, "User already exists")
    }


    const result = await prisma.user.create({
        data: {
            ...payload
        }
    })

    if (!result.isEmailVerified) {
        const token = createEmailToken(result.id);
        const link = `${process.env.BASE_API}/auth/verify-email?token=${token}`;
        const emailTemplate = verifyEmailTemplate(link);

        await sendEmail(result.email, "Verify your email", emailTemplate);
        console.log("email send successfull")
    }

    return {}
}






const login = async (payload: TUser) => {



    const result = await prisma.user.findUnique({ where: {  email: payload.email, }})
    if (!result) {
        throw new AppError(401, "Invalid credentials")
    }

    const veryfy = bcrypt.compareSync(payload.password, result.password); // true

    if (!veryfy) {
        throw new AppError(401, "Invalid credentials")
    }
    
    if (!result.isEmailVerified) {
        throw new AppError(401, "Please verify your email to login")
    }

    if (!result) {
        throw new Error("User not found")
    }
    const jwtPayload = {
        id: result.id,
        // name: result.name,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt,
        // updatedAt: result.updatedAt
    }
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || "ebdwegweuweurgweurguwer6734873457" as string, {
        expiresIn: "7d"
    })
    console.log(token)
    return { token }
}

const verifyEmail = async (token: string) => {
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET as string) as {
        userId: string; id: string
    };
    console.log(decoded)
    const user = await prisma.user.findFirst({ where: { id: decoded.userId } });
    if (!user) {
        throw new AppError(404, "User not found");
    }
    await prisma.user.update({
        where: { id: decoded.userId },
        data: { isEmailVerified: true }
    });
    return { message: "Email verified successfully" };
};



const getAllUsers = async () => {

    const result = await prisma.user.findMany()
    return result

}

/////// Profile ////////

const createProfile = async (payload: TProfileInput, user: TUserPayload, avatarUrl: string | null, resumeUrl: string | null) => {

    payload.avatar = avatarUrl || undefined;
    payload.resumeUpload = resumeUrl || undefined;
    const { workExperience, education, ...rest } = payload;





    const result = await prisma.profile.upsert({
        where: { userId: user.id }, // unique field
        update: {
            ...rest,

            // For nested relations, you might want to replace or update existing entries
            workExperience: {
                deleteMany: {}, // optional: delete old entries
                create: workExperience?.map((we) => ({ ...we })),
            },
            education: {
                deleteMany: {},
                create: education?.map((edu) => ({ ...edu })),
            },
        },
        create: {
            ...rest,
            userId: user.id,
            workExperience: {
                create: workExperience?.map((we) => ({ ...we })),
            },
            education: {
                create: education?.map((edu) => ({ ...edu })),
            },
        },
    });

    return result;
};


const getSingleUser = async (payload: TUserPayload) => {

    const { email } = payload

    const result = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
            profile: true,
        }
    })
    return result
}







export const AuthService = {
    register,
    getAllUsers,
    createProfile,
    getSingleUser,
    login,
    verifyEmail
}



