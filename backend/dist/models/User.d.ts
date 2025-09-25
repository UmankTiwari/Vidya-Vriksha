import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher' | 'admin';
    avatar?: string;
    language: string;
    grade?: string;
    school?: string;
    location?: {
        village: string;
        district: string;
        state: string;
    };
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
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map