"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlineLLMService = void 0;
exports.onlineLLMService = {
    query: async (question, language) => {
        return {
            answer: `This would be the ${language} LLM response for: ${question}`,
            sources: ['llm']
        };
    }
};
//# sourceMappingURL=llmService.js.map