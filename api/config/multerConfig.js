import multer from "multer";
import crypto from "crypto";
import path from "path";

//disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../api/public/Images')
    },
    filename: (req, file, cb) => { 
        crypto.randomBytes(12, (err, buf) => {
          const uniqueFilename = buf.toString('hex') + path.extname(file.originalname);
          cb(null, uniqueFilename);
        });
      },
  })
  
  const upload = multer({ storage: storage });
  export default upload;