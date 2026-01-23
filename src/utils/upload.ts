import multer from "multer";
import path from "path";
import fs from "fs"

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

const diskstorage = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, "uploads/");},
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});


export const uploadBystorage = multer({
  storage: diskstorage,
  limits: {
    fileSize: 40 * 1024 * 1024, // 40MB
  },
});
