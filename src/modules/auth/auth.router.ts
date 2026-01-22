import { AuthGard } from './../../utils/constant/auth.Constant';
import { auth } from '../../middlewares/auth';
import { AuthController } from './auth.controller';
import express from "express";
import { upload } from '../../utils/upload';
import { meAuth } from '../../middlewares/me.auth';


const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/verify-email", AuthController.verifyEmail);
router.post('/oauth/google', AuthController.googleAuth)
router.get('/me', auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR), AuthController.me);
router.post("/logout", async (req, res) => {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
});


///// Profile /////
router.get('/profile', auth(AuthGard.USER), AuthController.getSingleUser)

router.post('/profile', upload.fields([
  { name: "avater", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]), auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR), AuthController.createProfile)




export const Authrouter = router;



