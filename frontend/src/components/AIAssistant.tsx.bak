import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Collapse,
  Card,
  CardContent,
} from '@mui/material';
import {
  Send,
  SmartToy,
  Person,
  ExpandMore,
  ExpandLess,
  Refresh,
  Psychology,
  School,
  Help,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIAssistantProps {
  subject?: string;
  context?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ subject, context }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

    interface SubjectKnowledge {
    [category: string]: string[];
  }

  interface KnowledgeBase {
    [subject: string]: SubjectKnowledge;
  }

  // Offline knowledge base
  const knowledgeBase: KnowledgeBase = {
    math: {
      patterns: [
        "Number patterns: 2, 4, 6, 8... (even numbers)",
        "Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13...",
        "Multiplication tables help identify patterns"
      ],
      concepts: [
        "Percentages: (part/whole) × 100",
        "Ratios: comparing quantities (2:3 means 2 parts to 3 parts)",
        "Area of rectangle: length × width"
      ]
    },
    science: {
      patterns: [
        "Water cycle: evaporation → condensation → precipitation",
        "Plant growth: seed → seedling → plant → flower",
        "Food chain: producer → consumer → decomposer"
      ],
      concepts: [
        "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
        "Gravity: force that pulls objects toward each other",
        "States of matter: solid, liquid, gas"
      ]
    },
    coding: {
      patterns: [
        "Loop patterns: for i in range(n):",
        "Conditional patterns: if condition:",
        "Function patterns: def function_name():"
      ],
      concepts: [
        "Variables store data",
        "Loops repeat actions",
        "Functions organize code"
      ]
    }
  };

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getOfflineResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Check for subject-specific knowledge
    if (subject && knowledgeBase[subject]) {
      const subjectKnowledge = knowledgeBase[subject];

      for (const [category, items] of Object.entries(subjectKnowledge)) {
        for (const item of items) {
          if (lowerQuery.includes(category) || item.toLowerCase().includes(lowerQuery)) {
            return `Based on your ${subject} studies: ${item}

💡 **Tip:** ${getRandomTip(subject)}`;
          }
        }
      }
    }

    // General responses
    if (lowerQuery.includes('help') || lowerQuery.includes('stuck')) {
      return `I can help you with ${subject || 'your studies'}! Try asking specific questions like:

• "How to calculate percentages?"
• "Explain photosynthesis"
• "What is a loop in coding?"

Or search for topics using the search bar above! 🔍`;
    }

    if (lowerQuery.includes('pattern')) {
      return `Patterns help us understand relationships in ${subject || 'learning'}:

🔢 **Example patterns:**
• Numbers: 1, 3, 5, 7... (odd numbers)
• Shapes: square, circle, triangle
• Colors: red, orange, yellow (rainbow)

Try to find the pattern in: 2, 4, 8, 16, ___`;
    }

    if (lowerQuery.includes('example')) {
      return `Here are some ${subject || 'learning'} examples:

📚 **Study Examples:**
• Math: 2 + 2 = 4 (addition)
• Science: Water freezes at 0°C
• Coding: print("Hello World")

Try practicing with real-world examples from your daily life!`;
    }

    // Default response
    return `I'm here to help you learn! 🤖

I can assist with:
• ${subject || 'Math, Science, and Coding'} concepts
• Problem-solving strategies
• Study tips and techniques
• Practice examples

What specific topic would you like to explore?`;
  };

  const getRandomTip = (subject: string): string => {
    const tips: { [key: string]: string[] } = {
      math: [
        "Draw diagrams to visualize problems",
        "Break complex problems into smaller steps",
        "Practice with real numbers from daily life",
        "Check your work by working backwards"
      ],
      science: [
        "Observe things around you to understand concepts",
        "Ask 'why' and 'how' questions",
        "Connect new ideas to things you already know",
        "Try simple experiments at home"
      ],
      coding: [
        "Start with simple examples",
        "Test your code step by step",
        "Read error messages carefully",
        "Practice regularly, even for 15 minutes"
      ]
    };

    const subjectTips = tips[subject] || tips.math;
    return subjectTips[Math.floor(Math.random() * subjectTips.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      let response: string;

      if (isOnline) {
        // In a real app, this would call an LLM API
        response = getOfflineResponse(input); // Using offline for now
      } else {
        response = getOfflineResponse(input);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        suggestions: generateSuggestions(input)
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateSuggestions = (query: string): string[] => {
    const suggestions = [
      'Show me an example',
      'Explain this concept',
      'Give me a practice problem',
      'What are the steps?',
      'Why is this important?'
    ];

    return suggestions.slice(0, 3);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const getMessageIcon = (type: string) => {
    return type === 'user' ? <Person color="primary" /> : <SmartToy color="secondary" />;
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Psychology />
            </Avatar>
            <Box>
              <Typography variant="h6">
                AI Learning Assistant
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={isOnline ? 'Online' : 'Offline'}
                  color={isOnline ? 'success' : 'warning'}
                  size="small"
                />
                {subject && (
                  <Chip
                    label={subject}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
            </Box>
          </Box>
          <Button
            startIcon={<Refresh />}
            onClick={clearChat}
            size="small"
          >
            Clear Chat
          </Button>
        </Box>
      </Paper>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
        {messages.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <SmartToy sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Hello! I'm your AI Learning Assistant! 🤖
            </Typography>
            <Typography variant="body2" color="text.secondary">
              I'm here to help you with your studies. Ask me questions about math, science, coding, or any topic you're learning!
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip
                label="How to calculate percentages?"
                onClick={() => setInput('How to calculate percentages?')}
                sx={{ cursor: 'pointer' }}
              />
              <Chip
                label="Explain photosynthesis"
                onClick={() => setInput('Explain photosynthesis')}
                sx={{ cursor: 'pointer' }}
              />
              <Chip
                label="What is a loop in coding?"
                onClick={() => setInput('What is a loop in coding?')}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          </Paper>
        ) : (
          <List>
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                <ListItem sx={{ alignItems: 'flex-start' }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: message.type === 'user' ? 'primary.main' : 'secondary.main' }}>
                      {getMessageIcon(message.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {message.type === 'user' ? 'You' : 'AI Assistant'}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body1" sx={{ mt: 1, lineHeight: 1.6 }}>
                          {message.content}
                        </Typography>
                        {message.suggestions && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              💡 Try asking:
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {message.suggestions.map((suggestion, idx) => (
                                <Chip
                                  key={idx}
                                  label={suggestion}
                                  size="small"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  sx={{ cursor: 'pointer' }}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < messages.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Input Form */}
      <Paper sx={{ p: 2 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`Ask me about ${subject || 'your studies'}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            multiline
            maxRows={3}
          />
          <IconButton
            type="submit"
            color="primary"
            disabled={loading || !input.trim()}
            sx={{ alignSelf: 'flex-end' }}
          >
            {loading ? <CircularProgress size={24} /> : <Send />}
          </IconButton>
        </Box>

        {/* Quick Suggestions Toggle */}
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            size="small"
            onClick={() => setShowSuggestions(!showSuggestions)}
            startIcon={showSuggestions ? <ExpandLess /> : <ExpandMore />}
          >
            Quick Suggestions
          </Button>
          {isOnline && (
            <Chip label="Online Mode" color="success" size="small" />
          )}
        </Box>

        {/* Quick Suggestions */}
        <Collapse in={showSuggestions}>
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['Show me an example', 'Explain this concept', 'Give me a practice problem'].map((suggestion) => (
              <Chip
                key={suggestion}
                label={suggestion}
                variant="outlined"
                size="small"
                onClick={() => setInput(suggestion)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
};

export default AIAssistant;
