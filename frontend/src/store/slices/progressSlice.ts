import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Progress {
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

interface ProgressState {
  progress: Progress | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  progress: null,
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<Progress>) => {
      state.progress = action.payload;
    },
    updateScore: (state, action: PayloadAction<number>) => {
      if (state.progress) {
        state.progress.totalScore += action.payload;
      }
    },
    updateStreak: (state, action: PayloadAction<number>) => {
      if (state.progress) {
        state.progress.streak = action.payload;
      }
    },
    addBadge: (state, action: PayloadAction<string>) => {
      if (state.progress && !state.progress.badges.includes(action.payload)) {
        state.progress.badges.push(action.payload);
      }
    },
    incrementLevel: (state) => {
      if (state.progress) {
        state.progress.level += 1;
      }
    },
    addDailyProgress: (state, action: PayloadAction<{ score: number; timeSpent: number }>) => {
      if (state.progress) {
        const today = new Date().toISOString().split('T')[0];
        const existingEntry = state.progress.dailyProgress.find(dp => dp.date === today);

        if (existingEntry) {
          existingEntry.score += action.payload.score;
          existingEntry.timeSpent += action.payload.timeSpent;
        } else {
          state.progress.dailyProgress.push({
            date: today,
            score: action.payload.score,
            timeSpent: action.payload.timeSpent,
          });
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProgress,
  updateScore,
  updateStreak,
  addBadge,
  incrementLevel,
  addDailyProgress,
  setLoading,
  setError,
} = progressSlice.actions;
export default progressSlice.reducer;
