import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Subject {
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

interface SubjectState {
  subjects: Subject[];
  currentSubject: Subject | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubjectState = {
  subjects: [],
  currentSubject: null,
  loading: false,
  error: null,
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setSubjects: (state, action: PayloadAction<Subject[]>) => {
      state.subjects = action.payload;
    },
    setCurrentSubject: (state, action: PayloadAction<Subject>) => {
      state.currentSubject = action.payload;
    },
    updateSubjectProgress: (state, action: PayloadAction<{ subjectId: string; progress: number }>) => {
      const subject = state.subjects.find(s => s.id === action.payload.subjectId);
      if (subject) {
        subject.progress = action.payload.progress;
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

export const { setSubjects, setCurrentSubject, updateSubjectProgress, setLoading, setError } = subjectSlice.actions;
export default subjectSlice.reducer;
