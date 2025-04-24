import multer = require("multer");
import * as path from "path";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
      cb(null, file.originalname); // or create custom name
    }
  });
  
const upload = multer({ storage });

export default upload;