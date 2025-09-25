import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const Challenge: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        🎯 Challenge
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          Interactive challenges will be displayed here.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Challenge;
