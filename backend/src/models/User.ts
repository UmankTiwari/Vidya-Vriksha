import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

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

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'hindi'
  },
  grade: {
    type: String,
    default: ''
  },
  school: {
    type: String,
    default: ''
  },
  location: {
    village: { type: String, default: '' },
    district: { type: String, default: '' },
    state: { type: String, default: '' }
  },
  progress: {
    totalScore: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [{ type: String }],
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
  },
  preferences: {
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true },
    voiceLanguage: { type: String, default: 'hindi' }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
