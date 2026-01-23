import { prisma } from "../../config/prisma"
import { AppError } from "../../utils/AppError"
import { createSlug } from "../../utils/createSlug"
import { generateJobId } from "../../utils/generateJobId"
import { TJobCategoryInput, TJobCreateInput } from "./job.validation"




// const createJob = async (payload: TJobCreateInput) => {

//   const id = await generateJobId()
//   if (id) {
//     payload.jobUniqueId = id
//   } else {
//     throw new AppError(500, "Id not found")
//   }
//   const result = await prisma.job.create({
//     data: {
//       ...payload,
//       slug: createSlug(payload.title)
//     }
//   })
//   return result
// }

export const createJob = async (payload: TJobCreateInput) => {
  // Generate a unique job ID
  const id = await generateJobId();
  if (!id) throw new AppError(500, "Id not found");

  // Create a slug from title
  const slug = createSlug(payload.title);

  // Make sure payload includes categoryId
  if (!payload.categoryId) {
    throw new AppError(400, "CategoryId is required");
  }

  const result = await prisma.job.upsert({
    where: {
      jobUniqueId: payload.jobUniqueId ?? id,
    },
    create: {
      title: payload.title,
      jobRole: payload.jobRole,
      jobType: payload.jobType,
      salaryRange: payload.salaryRange,
      location: payload.location,
      expDate: new Date(payload.expDate),
      requirSkills: payload.requirSkills,
      responsibilities: payload.responsibilities,
      features: payload.features,
      requirments: payload.requirments,
      categoryId: payload.categoryId, // 👈 must include relation ID explicitly
      jobUniqueId: id,
      slug,
    },
    update: {
      title: payload.title,
      jobRole: payload.jobRole,
      jobType: payload.jobType,
      salaryRange: payload.salaryRange,
      location: payload.location,
      expDate: new Date(payload.expDate),
      requirSkills: payload.requirSkills,
      responsibilities: payload.responsibilities,
      features: payload.features,
      requirments: payload.requirments,
      categoryId: payload.categoryId, // 👈 update relation if changed
      slug,
    },
  });

  return result;
};



const getAllJobs = async () => {

  const result = prisma.job.findMany()

  return result
}


const getJobsByCategory = async (categoryId: string) => {

  const result = prisma.job.findMany({
    where: {
      categoryId: categoryId
    }
  })

  return result
}





//////categori ///////

const createCategory = async (payload: TJobCategoryInput) => {

  console.log(payload)
  const result = await prisma.jobCategory.create({
    data: {
      title: payload.title,
      desc: payload.desc
    }
  })
  return result

}


const getJobById = async (id: string) => {

  const result = await prisma.job.findUnique({
    where: {id}
  })
  return result
}




const getAllCategory = async () => {

  const result = await prisma.jobCategory.findMany({
    select: {
      id: true,
      title: true,
      desc: true
    }
  })
  return result

}


export const JobService = {
  createJob,
  getAllJobs,
  createCategory,
  getAllCategory, 
  getJobById, 
  getJobsByCategory
}
