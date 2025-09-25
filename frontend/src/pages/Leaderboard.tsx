import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const Leaderboard: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        🏆 Leaderboard
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          Student rankings and achievements will be displayed here.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Leaderboard;
