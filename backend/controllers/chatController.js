import { PrismaClient } from '@prisma/client';
import { getResponseForProvider } from '../services/llmService.js';
import { checkAndRedirectModel } from '../services/routingService.js';

const prisma = new PrismaClient();

export const handleChatCompletion = async (req, res) => {
    try {
        let { provider, model, prompt } = req.body;

        if (!provider || !model || !prompt) {
            return res.status(400).json({ error: 'Missing provider, model, or prompt' });
        }

        // Step 1: Check if model exists in DB
        
        // Check if provider exists
        const providerExists = await prisma.aibots.findFirst({
            where: { name: { startsWith: provider } }
        });

        if (!providerExists) {
            return res.status(404).json({ error: `Provider '${provider}' not found in the database` });
        }

        let finalModel = model;

        // Check if model exists
        const modelExists = await prisma.aibots.findFirst({
            where: { name: `${provider}/${model}` }
        });

        if (!modelExists) {
            console.log(`Model '${model}' not found, redirecting to 'gemini-alpha'`);
            finalModel = 'gemini-alpha';
        }
        // Step 2: Check for regex-based redirection
        const redirectedModel = await checkAndRedirectModel(finalModel, prompt);

        // Step 3: Get response from the selected model
        const response = getResponseForProvider(provider, redirectedModel, prompt);

        res.json({ provider, model, response });
    } catch (error) {
        console.error('Error handling chat completion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
