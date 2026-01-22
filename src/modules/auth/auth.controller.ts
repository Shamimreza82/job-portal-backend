
import { TUserPayload } from "../../types/user";
import { catchAsync } from "../../utils/catchAsync";
import uploadToCloudinary from "../../utils/uploadToCloudinary";
import { AuthService } from "./auth.service";
import { profileSchema } from "./profile.validation";


const register = catchAsync(async (req, res) => {

  const result = await AuthService.register(req.body)

  res.status(201).json({
    status: true,
    message: "Registration successful. Please verify your email.",
    data: result
  })
})




const login = catchAsync(async (req, res) => {

  const { token } = await AuthService.login(req.body)


  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  }

  res.cookie('token', token, cookieOptions)

  res.status(201).json({
    status: true,
    message: "User Login successfully",
    data: { token: token },
  })
})


const verifyEmail = catchAsync(async (req, res) => {

  const token = req.query.token as string;
  const result = await AuthService.verifyEmail(token)
  if (!result) {
    res.redirect(`${process.env.CLIENT_URL}/verify-error`);
  } else {
    res.redirect(`${process.env.CLIENT_URL}/login`);
  }
})




const getAllUsers = catchAsync(async (req, res) => {


  const result = await AuthService.getAllUsers()

  res.status(201).json({
    status: true,
    message: "get all users successfully",
    data: result
  })

})
const getSingleUser = catchAsync(async (req, res) => {
  const user = req.user


  const result = await AuthService.getSingleUser(user as TUserPayload)

  res.status(201).json({
    status: true,
    message: "get single user successfully",
    data: result
  })

})






////// Profile create /////////

const createProfile = catchAsync(async (req, res) => {

  const data = JSON.parse(req.body.data);
  const validatedData = profileSchema.parse(data);

  const files = req.files as {
    avater?: Express.Multer.File[];
    resume?: Express.Multer.File[];
  };

  const avater = files.avater?.[0];
  const resume = files.resume?.[0];
  let avatarUrl: string | null = null;
  let resumeUrl: string | null = null;
  // const avater = 

  // 🖼 Avatar upload
  if (avater) {
    avatarUrl = await uploadToCloudinary(
      avater.buffer,
      "profiles/avatars",
      "image"
    );
  }

  // 📄 Resume upload
  if (resume) {
    resumeUrl = await uploadToCloudinary(
      resume.buffer,
      "profiles/resumes",
      "raw"
    );
  }




  const user = req.user
  const result = await AuthService.createProfile(validatedData, user as TUserPayload, avatarUrl, resumeUrl)
  res.status(201).json({
    status: true,
    message: "Profile created successfully",
    data: result
  })
})



export const AuthController = {
  register,
  getAllUsers,
  getSingleUser,
  login,
  createProfile,
  verifyEmail
}





