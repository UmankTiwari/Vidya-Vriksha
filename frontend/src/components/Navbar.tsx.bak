import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  School,
  EmojiEvents,
  Person,
  Logout,
  Settings,
  Translate,
  SmartToy,
} from '@mui/icons-material';
import SearchAI from './SearchAI';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { progress } = useSelector((state: RootState) => state.progress);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleNavigation('/profile')}>
        <Person sx={{ mr: 1 }} />
        Profile
      </MenuItem>
      <MenuItem onClick={() => handleNavigation('/profile')}>
        <Settings sx={{ mr: 1 }} />
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Logout sx={{ mr: 1 }} />
        Logout
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleNavigation('/')}>
        <Home sx={{ mr: 1 }} />
        Dashboard
      </MenuItem>
      <MenuItem onClick={() => handleNavigation('/leaderboard')}>
        <EmojiEvents sx={{ mr: 1 }} />
        Leaderboard
      </MenuItem>
      <MenuItem onClick={() => handleNavigation('/profile')}>
        <Person sx={{ mr: 1 }} />
        Profile
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          🌳 Vidya Vriksha
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => handleNavigation('/')}
            sx={{
              backgroundColor: location.pathname === '/' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            <Home sx={{ mr: 1 }} />
            Dashboard
          </Button>

          <Button
            color="inherit"
            onClick={() => handleNavigation('/ai-assistant')}
            sx={{
              backgroundColor: location.pathname === '/ai-assistant' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            <SmartToy sx={{ mr: 1 }} />
            AI Assistant
          </Button>

          {user?.role === 'teacher' && (
            <Button
              color="inherit"
              onClick={() => handleNavigation('/teacher')}
              sx={{
                backgroundColor: location.pathname === '/teacher' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
              }}
            >
              <School sx={{ mr: 1 }} />
              Teacher
            </Button>
          )}

          {/* Progress indicators */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <Chip
              label={`Level ${progress?.level || 1}`}
              color="secondary"
              size="small"
            />
            <Chip
              label={`${progress?.totalScore || 0} pts`}
              variant="outlined"
              size="small"
              sx={{ color: 'white', borderColor: 'white' }}
            />
          </Box>
        </Box>

        {/* User menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
          </IconButton>

          {/* Mobile menu button */}
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' } }}
            size="large"
            edge="end"
            color="inherit"
            aria-label="mobile menu"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
};

export default Navbar;
