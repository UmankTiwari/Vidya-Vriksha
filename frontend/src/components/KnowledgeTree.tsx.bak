import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Avatar,
  Grid,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Science,
  Calculate,
  Business,
  Psychology,
  Code,
  TrendingUp,
  Star,
  EmojiEvents,
  Lock,
} from '@mui/icons-material';
import { RootState } from '../store';
import { Subject } from '../types';

interface KnowledgeTreeProps {
  subjects?: Subject[];
}

const KnowledgeTree: React.FC<KnowledgeTreeProps> = ({ subjects }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { progress } = useSelector((state: RootState) => state.progress);

  // Default subjects if none provided
  const defaultSubjects: Subject[] = [
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

  const displaySubjects = subjects || defaultSubjects;

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  const getSubjectIcon = (icon: string) => {
    switch (icon) {
      case '🧮':
        return <Calculate sx={{ fontSize: 40 }} />;
      case '🔬':
        return <Science sx={{ fontSize: 40 }} />;
      case '💼':
        return <Business sx={{ fontSize: 40 }} />;
      case '💻':
        return <Code sx={{ fontSize: 40 }} />;
      case '🗣️':
        return <Psychology sx={{ fontSize: 40 }} />;
      case '🤖':
        return <Star sx={{ fontSize: 40 }} />;
      default:
        return <Calculate sx={{ fontSize: 40 }} />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'primary';
    if (progress >= 40) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        🌳 Your Knowledge Tree
      </Typography>

      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: 'text.secondary' }}>
        Each branch represents a subject. Watch your progress grow as leaves and earn fruits as achievements!
      </Typography>

      <Grid container spacing={3}>
        {displaySubjects.map((subject, index) => (
          <Grid component="div" item xs={12} sm={6} md={4} key={subject.id}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
                border: `2px solid ${subject.color}`,
                background: `linear-gradient(135deg, ${subject.color}15 0%, ${subject.color}08 100%)`,
              }}
              onClick={() => handleSubjectClick(subject.id)}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                {/* Subject Icon */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: subject.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: 'white',
                  }}
                >
                  {getSubjectIcon(subject.icon)}
                </Box>

                {/* Subject Name */}
                <Typography variant="h6" component="h3" gutterBottom>
                  {subject.name}
                </Typography>

                {/* Progress Bar */}
                <Box sx={{ mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={subject.progress}
                    color={getProgressColor(subject.progress)}
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {subject.completedModules}/{subject.totalModules} modules completed
                  </Typography>
                </Box>

                {/* Progress Stats */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip
                    label={`${subject.progress}%`}
                    size="small"
                    color={getProgressColor(subject.progress)}
                    variant="outlined"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Level {Math.floor(subject.progress / 20) + 1}
                  </Typography>
                </Box>

                {/* Badges/Achievements */}
                {subject.badges.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Achievements:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                      {subject.badges.slice(0, 2).map((badge, badgeIndex) => (
                        <Tooltip key={badgeIndex} title={badge}>
                          <Chip
                            label={badge}
                            size="small"
                            sx={{
                              backgroundColor: '#FFD700',
                              color: '#000',
                              fontSize: '0.7rem',
                            }}
                          />
                        </Tooltip>
                      ))}
                      {subject.badges.length > 2 && (
                        <Chip
                          label={`+${subject.badges.length - 2}`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>
                )}

                {/* Leaves and Fruits visualization */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                  {/* Leaves based on progress */}
                  {Array.from({ length: Math.floor(subject.progress / 10) }).map((_, i) => (
                    <Box
                      key={`leaf-${i}`}
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50% 0',
                        backgroundColor: '#4CAF50',
                        transform: `rotate(${i * 45}deg)`,
                      }}
                    />
                  ))}

                  {/* Fruits based on badges */}
                  {subject.badges.map((_, i) => (
                    <Box
                      key={`fruit-${i}`}
                      sx={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: '#FF9800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                      }}
                    >
                      🍎
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tree trunk and roots visualization */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Box sx={{ position: 'relative' }}>
          {/* Tree trunk */}
          <Box
            sx={{
              width: 20,
              height: 100,
              backgroundColor: '#8D6E63',
              borderRadius: '0 0 10px 10px',
              mx: 'auto',
            }}
          />

          {/* Tree roots */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Box
                key={`root-${i}`}
                sx={{
                  width: 15,
                  height: 30,
                  backgroundColor: '#6D4C41',
                  borderRadius: '0 0 50% 50%',
                  transform: `rotate(${i * 15 - 30}deg)`,
                  position: 'absolute',
                  bottom: -25,
                  left: '50%',
                  transformOrigin: 'top center',
                  ml: -7.5,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Overall Progress Summary */}
      <Paper sx={{ p: 3, mt: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>
          🌟 Your Learning Journey
        </Typography>
        <Grid container spacing={2}>
          <Grid component="div" item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {progress?.level || 1}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Level
              </Typography>
            </Box>
          </Grid>
          <Grid component="div" item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="secondary">
                {progress?.totalScore || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Points
              </Typography>
            </Box>
          </Grid>
          <Grid component="div" item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#4CAF50' }}>
                {progress?.streak || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Day Streak
              </Typography>
            </Box>
          </Grid>
          <Grid component="div" item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#FF9800' }}>
                {progress?.badges?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Achievements
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default KnowledgeTree;
