import dotenv from "dotenv";
// import express from "express";
// import modelsRoutes from './routes/models.routes.js';

dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;


// app.use(express.json()); // to parse req.body
// app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

// app.use(cookieParser());

// app.use("/api/models", modelsRoutes);

// app.listen(PORT, () => {
// 	console.log(`Server is running on port ${PORT}`);
// 	connectMongoDB();
// });
import express from 'express';
import modelsRoutes from './routes/models.routes.js'; // Adjust path if necessary
import chatRoutes from './routes/chat.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ To handle form data

app.use('/models', modelsRoutes);
app.use('/api', chatRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
