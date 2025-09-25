import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Link,
} from '@mui/material';
import {
  Search,
  Clear,
  SmartToy,
  School,
  Calculate,
  Science,
  Business,
  Code,
  Psychology,
  Help,
  Launch,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface SearchResult {
  id: string;
  type: 'subject' | 'module' | 'concept' | 'external';
  title: string;
  description: string;
  subject?: string;
  url?: string;
  relevance: number;
}

interface SearchAIProps {
  onResultSelect?: (result: SearchResult) => void;
  placeholder?: string;
}

const SearchAI: React.FC<SearchAIProps> = ({
  onResultSelect,
  placeholder = "Ask me anything about math, science, or coding..."
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock AI search functionality
  const searchKnowledgeBase = async (searchQuery: string): Promise<SearchResult[]> => {
    const mockResults: SearchResult[] = [
      {
        id: 'math-percentages',
        type: 'subject',
        title: 'Percentages in Daily Life',
        description: 'Understanding percentages through crop yields and market prices',
        subject: 'Mathematics',
        relevance: 0.95
      },
      {
        id: 'science-photosynthesis',
        type: 'subject',
        title: 'Photosynthesis in Paddy Fields',
        description: 'How plants make food using sunlight',
        subject: 'Science',
        relevance: 0.88
      },
      {
        id: 'coding-patterns',
        type: 'subject',
        title: 'Pattern Recognition in Weaving',
        description: 'Understanding loops and patterns like textile designs',
        subject: 'Coding',
        relevance: 0.82
      },
      {
        id: 'commerce-savings',
        type: 'subject',
        title: 'Savings and Budgeting',
        description: 'Managing money in village cooperative',
        subject: 'Commerce',
        relevance: 0.78
      },
      {
        id: 'external-scribble',
        type: 'external',
        title: 'Scribble Coding - Visual Programming',
        description: 'Learn coding with visual blocks - perfect for beginners',
        url: 'https://scribblecoding.com',
        relevance: 0.85
      },
      {
        id: 'external-khan-academy',
        type: 'external',
        title: 'Khan Academy - Free Learning Resources',
        description: 'Comprehensive learning platform with interactive exercises',
        url: 'https://khanacademy.org',
        relevance: 0.90
      },
      {
        id: 'external-code-org',
        type: 'external',
        title: 'Code.org - Computer Science Education',
        description: 'Free coding lessons for all ages',
        url: 'https://code.org',
        relevance: 0.87
      }
    ];

    // Filter and sort by relevance
    return mockResults
      .filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (result.subject && result.subject.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => b.relevance - a.relevance);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchKnowledgeBase(query);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to search. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    }

    // Handle navigation for different result types
    if (result.type === 'subject' && result.id) {
      const subjectMap: { [key: string]: string } = {
        'math-percentages': 'math',
        'science-photosynthesis': 'science',
        'coding-patterns': 'coding',
        'commerce-savings': 'commerce'
      };

      const subjectId = subjectMap[result.id];
      if (subjectId) {
        window.location.href = `/subject/${subjectId}`;
      }
    } else if (result.url) {
      window.open(result.url, '_blank');
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setError(null);
  };

  const getResultIcon = (result: SearchResult) => {
    switch (result.type) {
      case 'subject':
        return result.subject === 'Mathematics' ? <Calculate color="primary" /> :
               result.subject === 'Science' ? <Science color="success" /> :
               result.subject === 'Coding' ? <Code color="info" /> :
               result.subject === 'Commerce' ? <Business color="warning" /> :
               <School color="primary" />;
      case 'external':
        return <Launch color="secondary" />;
      default:
        return <Help color="action" />;
    }
  };

  const getSubjectColor = (subject?: string) => {
    switch (subject) {
      case 'Mathematics': return '#FF6B6B';
      case 'Science': return '#4ECDC4';
      case 'Coding': return '#96CEB4';
      case 'Commerce': return '#45B7D1';
      default: return '#666';
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      {/* Search Input */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SmartToy color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {query && (
                  <IconButton onClick={clearSearch} size="small">
                    <Clear />
                  </IconButton>
                )}
                <IconButton onClick={handleSearch} disabled={loading}>
                  {loading ? <CircularProgress size={20} /> : <Search />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Quick suggestions */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['Math problems', 'Science concepts', 'Coding help', 'Study tips'].map((suggestion) => (
            <Chip
              key={suggestion}
              label={suggestion}
              variant="outlined"
              size="small"
              onClick={() => setQuery(suggestion)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Paper>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Search Results ({results.length})
          </Typography>
          <List>
            {results.map((result, index) => (
              <React.Fragment key={result.id}>
                <ListItem
                  button
                  onClick={() => handleResultClick(result)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getSubjectColor(result.subject) }}>
                      {getResultIcon(result)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {result.title}
                        </Typography>
                        {result.type === 'external' && (
                          <Launch fontSize="small" color="action" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {result.description}
                        </Typography>
                        {result.subject && (
                          <Chip
                            label={result.subject}
                            size="small"
                            sx={{
                              mt: 1,
                              bgcolor: `${getSubjectColor(result.subject)}20`,
                              color: getSubjectColor(result.subject)
                            }}
                          />
                        )}
                        {result.url && (
                          <Typography variant="caption" color="primary" sx={{ ml: 1 }}>
                            {result.url}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < results.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* No results message */}
      {query && !loading && results.length === 0 && !error && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <SmartToy sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No results found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try searching for specific topics like "percentages", "photosynthesis", or "coding patterns"
          </Typography>
        </Paper>
      )}

      {/* Helpful Links */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          🌐 Helpful Learning Resources
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<Code />}
            endIcon={<Launch />}
            onClick={() => window.open('https://scribblecoding.com', '_blank')}
            sx={{ textTransform: 'none' }}
          >
            Scribble Coding
          </Button>
          <Button
            variant="outlined"
            startIcon={<School />}
            endIcon={<Launch />}
            onClick={() => window.open('https://khanacademy.org', '_blank')}
            sx={{ textTransform: 'none' }}
          >
            Khan Academy
          </Button>
          <Button
            variant="outlined"
            startIcon={<Psychology />}
            endIcon={<Launch />}
            onClick={() => window.open('https://code.org', '_blank')}
            sx={{ textTransform: 'none' }}
          >
            Code.org
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SearchAI;
