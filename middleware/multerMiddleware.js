import multer from "multer";
import DataParser from "datauri/parser.js";
import path from "path";

//use mem storage -> save image as buffer -> parse image so cloudinary can use it
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const parser = new DataParser();

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content; //pass this into cloudinary
};

export default upload;
