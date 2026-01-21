import jwt from "jsonwebtoken";

export const createEmailToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.EMAIL_SECRET as string,
    { expiresIn: "15m" }
  );
};
