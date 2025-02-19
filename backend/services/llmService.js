export const getResponseForProvider = (provider, model, prompt) => {
    const responses = {
        openai: `OpenAI: Processed your prompt with advanced language understanding. Response ID: openai_response_001`,
        anthropic: `Anthropic: Your prompt has been interpreted with ethical AI principles. Response ID: anthropic_response_002`,
        gemini: `Gemini: Your request has been processed using Google's AI capabilities. Response ID: gemini_response_003`,
    };

    return {
        provider,
        model,
        response: responses[provider] || "Unknown provider response.",
    };
};
