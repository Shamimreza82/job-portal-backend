import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();


export type TAdminSeed = {
  name: string;
  email: string;
  password: string;
  role: "ADMIN";
  isEmailVerified: boolean;
};


const seed = async () => {
  try {
    const admin: TAdminSeed = {
      name: "Robin",
      email: process.env.ADMIN || "robin.promoture@gmail.com",
      password: process.env.PASSWORD || "123456",
      role: "ADMIN",
      isEmailVerified: true,
    };

    // Check if admin already exists
    const isExist = await prisma.user.findUnique({
      where: { email: admin.email },
    });

    if (isExist) {
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    // Create admin
    await prisma.user.create({
      data: {
        fullName: admin.name,
        email: admin.email,
        password: hashedPassword,
        role: admin.role,
        isEmailVerified: admin.isEmailVerified,
      },
    });

    console.log("Admin seeded successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export default seed;
