import express from 'express';
import { getModels } from '../controllers/models.controllers.js'; // Adjust the path as needed

const router = express.Router();

router.get('/models', getModels);

export default router;
