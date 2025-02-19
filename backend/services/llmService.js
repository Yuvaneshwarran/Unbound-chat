export const getResponseForProvider = (provider, model, prompt) => {
    const responses = {
        "gpt-3.5": `OpenAI: Processed your prompt with advanced language understanding. Response ID: openai_response_001`,
        "claude-v1": `Anthropic: Your prompt has been interpreted with ethical AI principles. Response ID: anthropic_response_002`,
        "gemini-alpha": `Gemini: Your request has been processed using Google's AI capabilities. Response ID: gemini_response_003`,
    };

    return {
        provider,
        model,
        response: responses[model] || "Unknown provider response.",
    };
};
