import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

export default function SimpleAIAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help?', isUser: false }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    
    // Add simple AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Thanks for your message!', isUser: false }]);
    }, 500);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>Simple AI Assistant</Typography>
      
      <Box sx={{ height: '300px', overflow: 'auto', mb: 2, p: 1 }}>
        {messages.map((msg, i) => (
          <Box key={i} sx={{ 
            display: 'flex', 
            justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
            mb: 1
          }}>
            <Paper sx={{ 
              p: 2, 
              bgcolor: msg.isUser ? 'primary.main' : 'grey.100',
              color: msg.isUser ? 'primary.contrastText' : 'text.primary'
            }}>
              {msg.text}
            </Paper>
          </Box>
        ))}
      </Box>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} variant="contained">
          Send
        </Button>
      </Box>
    </Container>
  );
