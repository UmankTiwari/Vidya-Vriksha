import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const TeacherDashboard: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        👨‍🏫 Teacher Dashboard
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          Teacher tools and student monitoring will be displayed here.
        </Typography>
      </Paper>
    </Container>
  );
};

export default TeacherDashboard;
