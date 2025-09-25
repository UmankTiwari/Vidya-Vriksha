import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
} from '@mui/material';
import {
  SmartToy,
  Search,
  Calculate,
  Science,
  Business,
  Code,
  Psychology,
  School,
  Help,
} from '@mui/icons-material';
import AIAssistant from '../components/AIAssistant';
import SearchAI from '../components/SearchAI';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const AIAssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: <Calculate />, color: '#FF6B6B' },
    { id: 'science', name: 'Science', icon: <Science />, color: '#4ECDC4' },
    { id: 'commerce', name: 'Commerce', icon: <Business />, color: '#45B7D1' },
    { id: 'coding', name: 'Coding', icon: <Code />, color: '#96CEB4' },
  ];

  const handleSubjectSelect = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <SmartToy sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" component="h1">
              AI Learning Hub
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Your intelligent learning companion
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          Get instant help with your studies through AI-powered search and personalized assistance
        </Typography>
      </Paper>

      {/* Main Content */}
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="ai assistant tabs">
            <Tab
              icon={<Search />}
              label="Smart Search"
              iconPosition="start"
            />
            <Tab
              icon={<SmartToy />}
              label="AI Assistant"
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <SearchAI
            placeholder="Search for learning topics, ask questions, or find resources..."
            onResultSelect={(result) => {
              console.log('Selected result:', result);
              // Handle navigation based on result type
            }}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid component="div" item xs={12} md={8}>
              <AIAssistant />
            </Grid>
            <Grid component="div" item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Choose Your Subject
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Get personalized help by selecting your subject
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {subjects.map((subject) => (
                      <Button
                        key={subject.id}
                        variant="outlined"
                        startIcon={subject.icon}
                        onClick={() => handleSubjectSelect(subject.id)}
                        sx={{
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                          py: 2,
                          borderColor: subject.color,
                          color: subject.color,
                          '&:hover': {
                            borderColor: subject.color,
                            backgroundColor: `${subject.color}10`,
                          }
                        }}
                      >
                        {subject.name}
                      </Button>
                    ))}
                  </Box>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Features
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Chip
                        icon={<Psychology />}
                        label="Contextual responses"
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        icon={<School />}
                        label="Study tips & guidance"
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        icon={<Help />}
                        label="Problem solving help"
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          🚀 Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={() => setTabValue(0)}
            startIcon={<Search />}
          >
            Search Topics
          </Button>
          <Button
            variant="outlined"
            onClick={() => setTabValue(1)}
            startIcon={<SmartToy />}
          >
            Chat with AI
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            startIcon={<School />}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AIAssistantPage;
