import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.toLowerCase()}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg .jpg and .png formats are allowed."), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1000 * 1000 * 2 },
  fileFilter,
});

export default upload;
