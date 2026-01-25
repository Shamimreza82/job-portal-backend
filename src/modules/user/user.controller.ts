
import { TUserPayload } from "../../types/user";
import { catchAsync } from "../../utils/catchAsync";
import uploadToCloudinary from "../../utils/uploadToCloudinary";
import { UserService } from "./user.service";
import { profileSchema } from "./user.validation";




////// Profile create /////////

const me = catchAsync(async (req, res) => {
  const user = req.user

  const result = await UserService.me(user as TUserPayload)

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

  console.log(avater, resume)

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
  const result = await UserService.createProfile(validatedData, user as TUserPayload, avatarUrl, resumeUrl)
  res.status(201).json({
    status: true,
    message: "Profile created successfully",
    data: result
  })
})


const createCertificate = catchAsync(async (req, res) => {
  const files = req.files;

  const certNames = Array.isArray(req.body.certNames) ? req.body.certNames : req.body.certNames?.split(","); // if sent as comma-separated string
  const user = req.user


  const result = await UserService.createCertificate(user as TUserPayload, files as Express.Multer.File[], certNames)

  res.status(201).json({
    status: true,
    message: "cartificate created successfully",
    data: result
  })
})

////// Profile create /////////

export const UserController = {
  createProfile,
  me,
  createCertificate
}





