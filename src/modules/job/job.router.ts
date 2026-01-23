
// import { auth } from '../../middlewares/auth';

import express from "express";
import { JobController } from "./job.controller";


const router = express.Router();


////Category///
router.get("/category",  JobController.getAllCategory);
router.post("/category",  JobController.createCategory);
router.get("/categorys/:id",  JobController.getJobsByCategory);



///Jobs
router.post("/",  JobController.createJob);
router.get('/', JobController.getAllJobs)
router.get('/:id', JobController.getJobById)









export const Jobrouter = router;

