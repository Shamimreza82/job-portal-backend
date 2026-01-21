import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";

export const verifyEmail = async (token: string) => {
  const decoded = jwt.verify(
    token,
    process.env.EMAIL_SECRET as string
  ) as { userId: string };

  await prisma.user.update({
    where: { id: decoded.userId },
    data: { isEmailVerified: true },
  });

  return { message: "Email verified successfully" };
};
