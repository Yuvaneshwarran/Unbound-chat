import multer from "multer";
import path from "path";

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in 'backend/uploads/'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage });

export const uploadFile = (req, res) => {
    console.log("Here");
    upload.single("file")(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: "File upload failed." });
        }
        res.json({ message: "File uploaded successfully", file: req.file });
    });
};
