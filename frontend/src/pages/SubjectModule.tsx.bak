import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Chip,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  ExpandMore,
  PlayArrow,
  CheckCircle,
  Lock,
  Star,
  Lightbulb,
  Calculate,
  Science,
  Business,
  Psychology,
  Code,
  TrendingUp,
} from '@mui/icons-material';
import VoiceControls from '../components/VoiceControls';

interface SubjectModuleProps {}

const SubjectModule: React.FC<SubjectModuleProps> = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { subjects, currentSubject } = useSelector((state: RootState) => state.subject);

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  // Mock data for different subjects with rural Indian examples
  const getSubjectData = (subjectId: string) => {
    const subjectData: { [key: string]: any } = {
      math: {
        name: 'Mathematics',
        icon: '🧮',
        color: '#FF6B6B',
        description: 'Numbers, patterns, and problem-solving with rural applications',
        modules: [
          {
            id: 'percentages',
            title: 'Percentages in Daily Life',
            description: 'Understanding percentages through crop yields and market prices',
            content: `In rural Punjab, farmer Rajesh has 50 acres of wheat field. This year, due to good rainfall, his crop yield increased by 25%.

If he harvested 2000 kg of wheat last year, how much will he harvest this year?

**Solution:** 25% of 2000 kg = 500 kg
Total harvest = 2000 + 500 = 2500 kg

**Real-world application:** At the mandi (market), if wheat price is ₹25 per kg, Rajesh will earn 25,000 more this year!`,
            type: 'text' as const,
            difficulty: 'beginner' as const,
            estimatedTime: 15,
            examples: [
              {
                id: 'crop-yield',
                title: 'Crop Yield Calculation',
                description: 'Calculate percentage increase in crop yield',
                content: 'Farmer Suresh grew 1200 tomatoes last season. This season he grew 1560 tomatoes. What is the percentage increase?',
                type: 'text' as const,
                language: 'hindi'
              },
              {
                id: 'market-discount',
                title: 'Market Discount',
                description: 'Calculate discount during village fair',
                content: 'At the village fair, a shopkeeper offers 15% discount on a ₹500 blanket. How much will Priya pay?',
                type: 'text' as const,
                language: 'hindi'
              }
            ]
          },
          {
            id: 'ratios',
            title: 'Ratios and Proportions',
            description: 'Understanding ratios in farming and cooking',
            content: `In village kitchen, to make perfect lassi, mix 3 parts yogurt with 1 part water.

**Ratio 3:1** means for every 3 cups of yogurt, add 1 cup of water.

**Real-world application:** For 30 people at a village gathering, how much yogurt and water do you need?

Total parts = 3 + 1 = 4 parts
Each part = 30 ÷ 4 = 7.5 people
Yogurt = 3 × 7.5 = 22.5 cups
Water = 1 × 7.5 = 7.5 cups`,
            type: 'text' as const,
            difficulty: 'beginner' as const,
            estimatedTime: 20,
            examples: [
              {
                id: 'fertilizer-mix',
                title: 'Fertilizer Mixing',
                description: 'Mixing fertilizers in correct ratio',
                content: 'To fertilize wheat field, mix NPK fertilizer in ratio 2:1:1. If you have 6kg of Nitrogen, how much Phosphorus and Potassium?',
                type: 'text' as const,
                language: 'hindi'
              }
            ]
          },
          {
            id: 'geometry',
            title: 'Geometry in Farming',
            description: 'Understanding shapes and measurements in agriculture',
            content: `Farmer measuring rectangular field: Length = 200m, Width = 150m

**Area = Length × Width = 200 × 150 = 30,000 square meters**

**Real-world application:** For irrigation, if water flows at 10 liters per minute, how long to water entire field?

Field area = 30,000 m²
Water needed = 30,000 × 0.02m = 600 cubic meters
600 m³ = 600,000 liters
Time = 600,000 ÷ 10 = 60,000 minutes = 1000 hours = 41.67 days!`,
            type: 'text' as const,
            difficulty: 'intermediate' as const,
            estimatedTime: 25,
            examples: [
              {
                id: 'field-measurement',
                title: 'Field Area Calculation',
                description: 'Calculate area of irregular shaped field',
                content: 'Village field is triangular with sides 100m, 120m, 140m. What is the area?',
                type: 'text' as const,
                language: 'hindi'
              }
            ]
          }
        ]
      },
      science: {
        name: 'Science',
        icon: '🔬',
        color: '#4ECDC4',
        description: 'Understanding the natural world through rural examples',
        modules: [
          {
            id: 'photosynthesis',
            title: 'Photosynthesis in Paddy Fields',
            description: 'How plants make food using sunlight',
            content: `In Punjab's paddy fields, rice plants convert sunlight into food through photosynthesis.

**Process:** 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

**Real-world application:** During monsoon season, cloudy weather reduces photosynthesis by 40%. How does this affect crop yield?

If normal yield is 1000 kg per acre, reduced yield = 1000 × 0.6 = 600 kg per acre.

Farmers use this knowledge to plan irrigation and fertilizer timing.`,
            type: 'text' as const,
            difficulty: 'beginner' as const,
            estimatedTime: 18,
            examples: [
              {
                id: 'water-cycle',
                title: 'Water Cycle in Village Well',
                description: 'Understanding evaporation and condensation',
                content: 'Village well water evaporates in summer heat, forms clouds, and returns as rain. Explain this cycle.',
                type: 'text' as const,
                language: 'hindi'
              }
            ]
          },
          {
            id: 'levers',
            title: 'Levers and Pulleys in Wells',
            description: 'Simple machines in traditional water systems',
            content: `Traditional Indian well uses lever principle. Long wooden beam (lever) with bucket at one end, heavy stone counterweight at other end.

**Mechanical advantage = Length of effort arm ÷ Length of load arm**

**Real-world application:** If effort arm is 4m and load arm is 1m, mechanical advantage = 4. A 10kg person can lift 40kg of water!

This is why traditional systems are efficient for rural water management.`,
            type: 'text' as const,
            difficulty: 'intermediate' as const,
            estimatedTime: 22,
            examples: [
              {
                id: 'pulley-system',
                title: 'Pulley System in Irrigation',
                description: 'How pulleys reduce effort in farming',
                content: 'A farmer uses a pulley system to lift 50kg of fertilizer. If mechanical advantage is 5, how much effort is needed?',
                type: 'text' as const,
                language: 'hindi'
              }
            ]
          }
        ]
      },
      commerce: {
        name: 'Commerce',
        icon: '💼',
        color: '#45B7D1',
        description: 'Business and financial literacy for rural entrepreneurs',
        modules: [
          {
            id: 'savings',
            title: 'Savings and Budgeting',
            description: 'Managing money in village cooperative',
            content: `Self-Help Group (SHG) in rural area teaches savings discipline.

**Monthly savings plan:** Income ₹5000, Expenses ₹3500, Savings = ₹1500

**Real-world application:** After 12 months, total savings = ₹18,000

With 10% annual interest from bank, additional earning = ₹1,800

Total amount after 1 year = ₹19,800

This teaches financial planning for agricultural cycles.`,
            type: 'text' as const,
            difficulty: 'beginner' as const,
            estimatedTime: 16,
            examples: [
              {
                id: 'loan-calculation',
                title: 'SHG Loan Calculation',
                description: 'Understanding interest on cooperative loans',
                content: 'Priya took ₹10,000 loan from SHG at 12% annual interest. How much will she pay after 1 year?',
                type: 'text' as const,
                language: 'hindi'
              }
            ]
          },
          {
            id: 'profit-loss',
            title: 'Profit and Loss in Village Market',
            description: 'Understanding business economics',
            content: `Farmer sells vegetables at village market.

**Cost Price (CP):** Seeds ₹500, Fertilizer ₹300, Labor ₹200 = Total CP ₹1000

**Selling Price (SP):** Sold for ₹1800

**Profit = SP - CP = ₹800**

**Profit Percentage = (Profit ÷ CP) × 100 = 80%**

**Real-world application:** If market price drops by 20%, new SP = ₹1440, Profit = ₹440, still profitable!`,
            type: 'text' as const,
            difficulty: 'intermediate' as const,
            estimatedTime: 20,
            examples: [
              {
                id: 'market-pricing',
                title: 'Market Price Strategy',
                description: 'Setting competitive prices in village market',
                content: 'If production cost is ₹20 per kg and competitor sells at ₹35, what should be your selling price?',
                type: 'text' as const,
                language: 'hindi'
              }
            ]
          }
        ]
      },
      coding: {
        name: 'Coding',
        icon: '💻',
        color: '#96CEB4',
        description: 'Logic and computational thinking with rural applications',
        modules: [
          {
            id: 'patterns',
            title: 'Pattern Recognition in Weaving',
            description: 'Understanding loops and patterns like textile designs',
            content: `Punjabi textile patterns follow repeating sequences, just like programming loops.

**Pattern:** * * * *
* * * *
* * *
* *

**Code equivalent:**
for i in range(4, 0, -1):
    for j in range(i):
        print("* ", end="")
    print()

**Real-world application:** Modern weaving machines use similar programming to create complex designs automatically.`,
            type: 'text' as const,
            difficulty: 'beginner' as const,
            estimatedTime: 25,
            examples: [
              {
                id: 'farming-cycles',
                title: 'Crop Rotation Patterns',
                description: 'Understanding cycles in agricultural planning',
                content: 'Create a pattern for 4-year crop rotation: Wheat → Rice → Sugarcane → Vegetables. Write the logic.',
                type: 'text' as const,
                language: 'hindi'
              }
            ]
          }
        ]
      }
    };

    return subjectData[subjectId] || subjectData.math;
  };

  const subjectData = getSubjectData(subjectId || 'math');

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'primary';
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayArrow />;
      case 'interactive': return <Code />;
      case 'quiz': return <Star />;
      default: return <Lightbulb />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, background: `linear-gradient(135deg, ${subjectData.color}20 0%, ${subjectData.color}10 100%)` }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            Dashboard
          </Link>
          <Typography color="text.primary">{subjectData.name}</Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: subjectData.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              color: 'white',
              fontSize: '24px'
            }}
          >
            {subjectData.icon}
          </Box>
          <Box>
            <Typography variant="h4" component="h1">
              {subjectData.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {subjectData.description}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={`${subjectData.modules.length} Modules`} color="primary" />
          <Chip label="Real-world Examples" color="secondary" />
          <Chip label="Bilingual Content" variant="outlined" />
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Module List */}
        <Grid component="div" item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              📚 Learning Modules
            </Typography>
            <List>
              {subjectData.modules.map((module: Module, index: number) => (
                <React.Fragment key={module.id}>
                  <ListItem
                    button
                    onClick={() => setSelectedModule(module)}
                    sx={{
                      backgroundColor: selectedModule?.id === module.id ? `${subjectData.color}20` : 'transparent',
                      borderRadius: 1,
                      mb: 1
                    }}
                  >
                    <ListItemIcon>
                      {completedModules.includes(module.id) ? (
                        <CheckCircle color="success" />
                      ) : (
                        getModuleIcon(module.type)
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={module.title}
                      secondary={`${module.estimatedTime} min • ${module.difficulty}`}
                    />
                    {completedModules.includes(module.id) && (
                      <CheckCircle color="success" sx={{ ml: 1 }} />
                    )}
                  </ListItem>
                  {index < subjectData.modules.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Module Content */}
        <Grid component="div" item xs={12} md={8}>
          {selectedModule ? (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {selectedModule.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={selectedModule.difficulty}
                        color={getDifficultyColor(selectedModule.difficulty)}
                        size="small"
                      />
                      <Chip
                        label={`${selectedModule.estimatedTime} minutes`}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  </Box>
                  <Button
                    variant={completedModules.includes(selectedModule.id) ? "outlined" : "contained"}
                    color={completedModules.includes(selectedModule.id) ? "success" : "primary"}
                    startIcon={completedModules.includes(selectedModule.id) ? <CheckCircle /> : undefined}
                    onClick={() => handleModuleComplete(selectedModule.id)}
                  >
                    {completedModules.includes(selectedModule.id) ? "Completed" : "Mark Complete"}
                  </Button>
                </Box>

                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                  {selectedModule.content}
                </Typography>

                {/* Voice Controls */}
                <Box sx={{ mb: 3 }}>
                  <VoiceControls
                    text={selectedModule.content}
                    autoSpeak={false}
                  />
                </Box>

                {/* Examples */}
                {selectedModule.examples && selectedModule.examples.length > 0 && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      🌾 Practice Examples
                    </Typography>
                    {selectedModule.examples.map((example: Example, index: number) => (
                      <Accordion key={index} sx={{ mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="subtitle1">
                            {example.title}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2">
                            {example.content}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Select a module to start learning
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Choose from the modules on the left to begin your learning journey
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SubjectModule;
