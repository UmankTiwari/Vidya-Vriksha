import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function BasicChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(['AI: Hello!']);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, `You: ${input}`, 'AI: Message received']);
      setInput('');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Basic Chat</Typography>
      <Box sx={{ height: '200px', overflow: 'auto', border: '1px solid #ccc', p: 1, mb: 2 }}>
        {messages.map((msg, i) => (
          <Typography key={i}>{msg}</Typography>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="small"
        />
        <Button onClick={handleSend} variant="contained">Send</Button>
      </Box>
    </Box>
  );
}
