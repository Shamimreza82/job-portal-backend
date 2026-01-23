
import { TUserPayload } from "../../types/user";
import { catchAsync } from "../../utils/catchAsync";
import uploadToCloudinary from "../../utils/uploadToCloudinary";
import { AuthService } from "./auth.service";
import { profileSchema } from "./profile.validation";

////// Auth /////////

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
    sameSite: "none" as const,
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
const googleAuth = catchAsync(async (req, res) => {
  const { idToken } = req.body
  const { token } = await AuthService.googleAuth(idToken)

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })

  res.status(200).json({
    status: true,
    message: "User Login by Google successfully",
  })
})
////// Auth /////////



////// Profile create /////////

const me = catchAsync(async (req, res) => {
  const user = req.user

  const result = await AuthService.me(user as TUserPayload)

  res.status(201).json({
    status: true,
    message: "get my profile successfully",
    data: result
  })
})
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
const logout = catchAsync(async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
});

const createCertificate = catchAsync(async (req, res) => {
  const files = req.files;

  const certNames = Array.isArray(req.body.certNames) ? req.body.certNames : req.body.certNames?.split(","); // if sent as comma-separated string
  const user = req.user


  const result = await AuthService.createCertificate(user as TUserPayload, files as Express.Multer.File[], certNames)

  res.status(201).json({
    status: true,
    message: "cartificate created successfully",
    data: result
  })
})

////// Profile create /////////

export const AuthController = {
  register,
  getAllUsers,
  getSingleUser,
  login,
  createProfile,
  verifyEmail,
  googleAuth,
  me,
  logout,
  createCertificate
}





