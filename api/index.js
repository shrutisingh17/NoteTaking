import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import notesRoute from "./routes/noteRoute.js";
import labelRoute from "./routes/labelRoute.js";
import upload from "./config/multerConfig.js";

// dotenv.config();
if(process.env.NODE_ENV !== "production") {
  dotenv.config({ path: './config/config.env' });
}

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS error: The request is not allowed from this origin.'));
    }
  },
  credentials: true, // Enable credentials (cookies, HTTP authentication) in cross-origin requests
}));

app.use(express.json());

// Use the routes as middleware
app.use("/api/notes", notesRoute);
app.use("/api/labels", labelRoute);
app.post("/api/upload", upload.array("images", 5), function (req, res) {
  console.log(req.files);
  try {
    const files = req.files;
    if (!files) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const fileUrls = files.map(file => file.filename);
    res.status(200).json(fileUrls); // image URLs
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Server error" });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Database Connected: ${mongoose.connection.host}`);
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

