import express from 'express';
import { handleChatCompletion } from '../controllers/chatController.js';

const router = express.Router();

router.post('/v1/chat/completions', handleChatCompletion);

export default router;
