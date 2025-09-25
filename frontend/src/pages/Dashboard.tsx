import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Paper, Box, Grid, Card, CardContent, Button, Chip } from '@mui/material';
import { School, TrendingUp, EmojiEvents, AccessTime } from '@mui/icons-material';
import { RootState } from '../store';
import KnowledgeTree from '../components/KnowledgeTree';
import { setSubjects } from '../store/slices/subjectSlice';
import { setProgress } from '../store/slices/progressSlice';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { subjects } = useSelector((state: RootState) => state.subject);

  useEffect(() => {
    // Initialize with mock data for now
    const mockSubjects = [
      {
        id: 'math',
        name: 'Mathematics',
        description: 'Numbers, patterns, and problem-solving',
        icon: '🧮',
        color: '#FF6B6B',
        progress: 65,
        totalModules: 25,
        completedModules: 16,
        badges: ['Quick Calculator', 'Pattern Master'],
      },
      {
        id: 'science',
        name: 'Science',
        description: 'Understanding the natural world',
        icon: '🔬',
        color: '#4ECDC4',
        progress: 45,
        totalModules: 30,
        completedModules: 13,
        badges: ['Nature Explorer'],
      },
      {
        id: 'commerce',
        name: 'Commerce',
        description: 'Business and financial literacy',
        icon: '💼',
        color: '#45B7D1',
        progress: 30,
        totalModules: 20,
        completedModules: 6,
        badges: [],
      },
      {
        id: 'coding',
        name: 'Coding',
        description: 'Logic and computational thinking',
        icon: '💻',
        color: '#96CEB4',
        progress: 80,
        totalModules: 15,
        completedModules: 12,
        badges: ['Code Wizard', 'Logic Master'],
      },
      {
        id: 'soft-skills',
        name: 'Soft Skills',
        description: 'Communication and life skills',
        icon: '🗣️',
        color: '#FFEAA7',
        progress: 55,
        totalModules: 18,
        completedModules: 10,
        badges: ['Great Communicator'],
      },
      {
        id: 'ai-literacy',
        name: 'AI Literacy',
        description: 'Understanding artificial intelligence',
        icon: '🤖',
        color: '#DDA0DD',
        progress: 20,
        totalModules: 12,
        completedModules: 2,
        badges: [],
      },
    ];

    const mockProgress = {
      totalScore: 1250,
      level: 8,
      badges: ['Early Bird', 'Math Whiz', 'Science Explorer', 'Code Master'],
      streak: 12,
      lastActive: new Date(),
      dailyProgress: [
        { date: new Date().toISOString().split('T')[0], score: 150, timeSpent: 45 },
      ],
    };

    dispatch(setSubjects(mockSubjects));
    dispatch(setProgress(mockProgress));
  }, [dispatch]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      {/* Welcome Section */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {getGreeting()}, {user?.name}! 🌅
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Ready to grow your knowledge tree today?
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: { xs: 2, sm: 0 } }}>
            <Chip
              label={`Level ${user?.progress?.level || 1}`}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
            <Chip
              label={`${user?.progress?.totalScore || 0} pts`}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid component="div" item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: '#e3f2fd' }}>
            <CardContent>
              <School sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
              <Typography variant="h4">{subjects.length || 6}</Typography>
              <Typography variant="body2" color="text.secondary">Active Subjects</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid component="div" item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: '#f3e5f5' }}>
            <CardContent>
              <TrendingUp sx={{ fontSize: 40, color: '#9c27b0', mb: 1 }} />
              <Typography variant="h4">{user?.progress?.level || 1}</Typography>
              <Typography variant="body2" color="text.secondary">Current Level</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid component="div" item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: '#e8f5e8' }}>
            <CardContent>
              <EmojiEvents sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
              <Typography variant="h4">{user?.progress?.badges?.length || 0}</Typography>
              <Typography variant="body2" color="text.secondary">Achievements</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid component="div" item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: '#fff3e0' }}>
            <CardContent>
              <AccessTime sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
              <Typography variant="h4">{user?.progress?.streak || 0}</Typography>
              <Typography variant="body2" color="text.secondary">Day Streak</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Knowledge Tree */}
      <KnowledgeTree subjects={subjects} />

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          🚀 Quick Start
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" color="primary">
            Continue Learning
          </Button>
          <Button variant="outlined" color="primary">
            Take a Challenge
          </Button>
          <Button variant="outlined" color="secondary">
            View Leaderboard
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
