import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  TextField,
  Button,
  Chip,
  Card,
  CardContent,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit, Save, Cancel, School, LocationOn, Language, EmojiEvents, TrendingUp } from '@mui/icons-material';
import { RootState } from '../store';
import { updateUser } from '../store/slices/authSlice';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { progress } = useSelector((state: RootState) => state.progress);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    language: user?.language || 'hindi',
    grade: user?.grade || '',
    school: user?.school || '',
    village: user?.location?.village || '',
    district: user?.location?.district || '',
    state: user?.location?.state || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      language: user?.language || 'hindi',
      grade: user?.grade || '',
      school: user?.school || '',
      village: user?.location?.village || '',
      district: user?.location?.district || '',
      state: user?.location?.state || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleSave = () => {
    // Validate form
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Update user profile
    dispatch(updateUser(formData));
    setIsEditing(false);
  };

  const languages = [
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { value: 'english', label: 'English' },
    { value: 'bengali', label: 'বাংলা (Bengali)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
  ];

  const getLanguageLabel = (value: string) => {
    const lang = languages.find(l => l.value === value);
    return lang ? lang.label : value;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        👤 My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid component="div" item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 3 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 16px',
                bgcolor: 'primary.main',
                fontSize: '3rem'
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>

            <Typography variant="h5" gutterBottom>
              {user?.name}
            </Typography>

            <Chip
              label={user?.role === 'student' ? 'Student' : user?.role === 'teacher' ? 'Teacher' : 'Admin'}
              color={user?.role === 'student' ? 'primary' : user?.role === 'teacher' ? 'secondary' : 'warning'}
              sx={{ mb: 2 }}
            />

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {user?.email}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
              <Chip label={`Level ${progress?.level || 1}`} color="primary" />
              <Chip label={`${progress?.totalScore || 0} pts`} variant="outlined" />
            </Box>

            {!isEditing && (
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={handleEdit}
                fullWidth
              >
                Edit Profile
              </Button>
            )}
          </Card>

          {/* Quick Stats */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Quick Stats
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmojiEvents sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="body2">
                  {progress?.badges?.length || 0} Achievements
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="body2">
                  {progress?.streak || 0} Day Streak
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <School sx={{ mr: 1, color: 'info.main' }} />
                <Typography variant="body2">
                  Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details */}
        <Grid component="div" item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Personal Information
              </Typography>

              {isEditing && (
                <Box>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    size="small"
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid component="div" item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid component="div" item xs={12} sm={6}>
                <FormControl fullWidth disabled={!isEditing}>
                  <InputLabel>Preferred Language</InputLabel>
                  <Select
                    name="language"
                    value={formData.language}
                    label="Preferred Language"
                    onChange={handleSelectChange}
                  >
                    {languages.map((lang) => (
                      <MenuItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid component="div" item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Grade/Class"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid component="div" item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="School Name"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid component="div" item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Village"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid component="div" item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid component="div" item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>

            {/* Location Display */}
            {(formData.village || formData.district || formData.state) && (
              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {[formData.village, formData.district, formData.state]
                    .filter(Boolean)
                    .join(', ')}
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Recent Achievements */}
          {progress?.badges && progress.badges.length > 0 && (
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                🏆 Recent Achievements
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {progress.badges.slice(0, 6).map((badge, index) => (
                  <Chip
                    key={index}
                    label={badge}
                    variant="outlined"
                    sx={{
                      bgcolor: 'warning.light',
                      color: 'warning.contrastText'
                    }}
                  />
                ))}
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
