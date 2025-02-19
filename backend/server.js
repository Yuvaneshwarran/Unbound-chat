import dotenv from "dotenv";
// import express from "express";
// import modelsRoutes from './routes/models.routes.js';
import path from "path";
dotenv.config();

import express from 'express';
import modelsRoutes from './routes/models.routes.js'; // Adjust path if necessary
import chatRoutes from './routes/chat.js';
import uploadRoutes from './routes/upload.routes.js';
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ To handle form data

app.use('/models', modelsRoutes);
app.use('/api', chatRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use('/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
