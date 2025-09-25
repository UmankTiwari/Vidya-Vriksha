interface LLMResponse {
    answer: string;
    sources: string[];
}
export declare const onlineLLMService: {
    query: (question: string, language: string) => Promise<LLMResponse>;
};
export type { LLMResponse };
//# sourceMappingURL=llmService.d.ts.map