export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  language: string;
  progress: {
    totalScore: number;
    level: number;
    badges: string[];
    streak: number;
    lastActive: Date;
  };
  preferences: {
    theme: string;
    notifications: boolean;
    voiceLanguage: string;
  };
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  badges: string[];
}

export interface Module {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  content: string;
  type: 'text' | 'video' | 'interactive' | 'quiz';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  prerequisites: string[];
  learningObjectives: string[];
  examples: Example[];
}

export interface Example {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'text' | 'image' | 'animation' | 'video';
  language: string; // for bilingual support
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'single' | 'integrated';
  subjects: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  timeLimit?: number; // in minutes
  questions: Question[];
  hints: string[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'calculation' | 'pattern';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hints: string[];
  points: number;
}

export interface Progress {
  totalScore: number;
  level: number;
  badges: string[];
  streak: number;
  lastActive: Date;
  dailyProgress: {
    date: string;
    score: number;
    timeSpent: number;
  }[];
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  avatar?: string;
  score: number;
  level: number;
  badges: string[];
  rank: number;
  change: number; // position change from last week
}
