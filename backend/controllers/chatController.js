import { PrismaClient } from '@prisma/client';
import { getResponseForProvider } from '../services/llmService.js';

const prisma = new PrismaClient();

export const handleChatCompletion = async (req, res) => {
    try {
        const { provider, model, prompt } = req.body;
        // console.log(provider, model, prompt);
        
        // Validate request data
        if (!provider || !model || !prompt) {
            return res.status(400).json({ error: 'Missing provider, model, or prompt' });
        }

        // Check if the model exists in the DB
        const modelExists = await prisma.aibots.findFirst({
            where: { name: `${provider}/${model}` },
        });

        if (!modelExists) {
            return res.status(404).json({ error: 'Model not found in the database' });
        }

        // Get a predefined response based on provider and model
        const response = getResponseForProvider(provider, model, prompt);

        res.json(response);
    } catch (error) {
        console.error('Error handling chat completion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
