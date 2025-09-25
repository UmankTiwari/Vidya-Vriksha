interface KnowledgeItem {
    question: string;
    answer: string;
    language: string;
    subjects: string[];
}
export declare const offlineKnowledgeBase: {
    query: (question: string, language: string) => Promise<{
        answer: string;
        sources: string[];
    }>;
};
export type { KnowledgeItem };
//# sourceMappingURL=offlineKnowledge.d.ts.map