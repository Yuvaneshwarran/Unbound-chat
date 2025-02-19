import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkAndRedirectModel = async (model, prompt) => {
    try {
        const rules = await prisma.routingRule.findMany({
            where: { originalModel: model }
        });

        for (const rule of rules) {
            const regex = new RegExp(rule.regexPattern, 'i'); // Case-insensitive match
            if (regex.test(prompt)) {
                console.log(`Redirecting from ${model} to ${rule.redirectModel}`);
                return rule.redirectModel; // Redirect model found
            }
        }

        return model; // No match, return original model
    } catch (error) {
        console.error("Error in regex routing:", error);
        return model; // Fail-safe: return original model
    }
};
