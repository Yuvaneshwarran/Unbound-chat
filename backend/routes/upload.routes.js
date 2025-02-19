import express from 'express';
import { uploadFile } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/uploadfile', uploadFile);

export default router;
