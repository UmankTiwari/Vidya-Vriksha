interface KnowledgeItem {
  question: string;
  answer: string;
  language: string;
  subjects: string[];
}

const knowledgeBase: KnowledgeItem[] = [
  {
    question: 'What is photosynthesis?',
    answer: 'Photosynthesis is the process by which plants use sunlight to synthesize foods from carbon dioxide and water.',
    language: 'english',
    subjects: ['science', 'biology']
  },
  {
    question: 'प्रकाश संश्लेषण क्या है?',
    answer: 'प्रकाश संश्लेषण वह प्रक्रिया है जिसमें पौधे सूर्य के प्रकाश का उपयोग कर कार्बन डाइऑक्साइड और पानी से भोजन संश्लेषित करते हैं।',
    language: 'hindi',
    subjects: ['science', 'biology']
  }
  // Add more knowledge items here
];

export const offlineKnowledgeBase = {
  query: async (question: string, language: string) => {
    const matched = knowledgeBase.find(
      item => item.question.toLowerCase().includes(question.toLowerCase()) && 
              item.language === language
    );
    
    return {
      answer: matched?.answer || 'I could not find an answer to that question in my offline knowledge base.',
      sources: matched?.subjects || []
    };
  }
};

export type { KnowledgeItem };
