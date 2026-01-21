import { AuthGard } from './../../utils/constant/auth.Constant';
import { auth } from '../../middlewares/auth';
import { AuthController } from './auth.controller';
import express from "express";
import { upload } from '../../utils/upload';



const router = express.Router();

router.post("/register",  AuthController.register);
router.post("/login",  AuthController.login);
router.get("/verify-email",  AuthController.verifyEmail);


///// Profile /////
router.get('/profile', auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR), AuthController.getSingleUser)

router.post('/profile', upload.fields([
    { name: "avater", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]), auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR), AuthController.createProfile)




export const Authrouter = router;



