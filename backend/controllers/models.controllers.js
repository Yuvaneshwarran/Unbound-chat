import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getModels = async (req, res) => {
    try {
        const models = await prisma.aibots.findMany({
            select: { name: true }, // Select only the name field
        });

        res.json(models.map((model) => model.name)); // Return as a simple array
    } catch (error) {
        console.error('Error fetching AI models:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
