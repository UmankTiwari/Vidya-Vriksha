import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Stop,
  VolumeUp,
  Settings,
  RecordVoiceOver,
} from '@mui/icons-material';
import { useVoice } from '../services/voiceService';

interface VoiceControlsProps {
  text?: string;
  autoSpeak?: boolean;
  onAutoSpeakChange?: (enabled: boolean) => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  text,
  autoSpeak = false,
  onAutoSpeakChange
}) => {
  const {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    availableVoices,
    supportedLanguages,
    setVoice,
  } = useVoice();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(0.8);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState('hindi');

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (availableVoices.length > 0 && !selectedVoice) {
      // Set default voice (Hindi if available)
      const hindiVoice = availableVoices.find(voice =>
        voice.lang.startsWith('hi')
      ) || availableVoices[0];
      setSelectedVoice(hindiVoice);
      setVoice(hindiVoice);
    }
  }, [availableVoices, selectedVoice, setVoice]);

  const handlePlay = async () => {
    if (text) {
      await speak(text);
    }
  };

  const handleStop = () => {
    stop();
  };

  const handlePause = () => {
    if (isSpeaking()) {
      pause();
    }
  };

  const handleResume = () => {
    if (!isSpeaking()) {
      resume();
    }
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const handleVoiceChange = (event: SelectChangeEvent<string>) => {
    const voiceName = event.target.value;
    const voice = availableVoices.find(v => v.name === voiceName);
    if (voice) {
      setSelectedVoice(voice);
      setVoice(voice);
    }
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const lang = event.target.value;
    setCurrentLanguage(lang);

    // Find appropriate voice for language
    const langCode = lang === 'hindi' ? 'hi' : 'en';
    const voice = availableVoices.find(v =>
      v.lang.startsWith(langCode)
    ) || availableVoices[0];

    if (voice) {
      setSelectedVoice(voice);
      setVoice(voice);
    }
  };

  const handleRateChange = (_event: Event, newValue: number | number[]) => {
    setRate(newValue as number);
  };

  const handlePitchChange = (_event: Event, newValue: number | number[]) => {
    setPitch(newValue as number);
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
      {/* Auto-speak toggle */}
      {onAutoSpeakChange && (
        <FormControlLabel
          control={
            <Switch
              checked={autoSpeak}
              onChange={(e) => onAutoSpeakChange(e.target.checked)}
              color="primary"
            />
          }
          label="Auto-speak"
          sx={{ mr: 1 }}
        />
      )}

      {/* Main voice controls */}
      <Tooltip title={isSpeaking() ? "Pause" : "Play"}>
        <IconButton
          onClick={isSpeaking() ? handlePause : handlePlay}
          color="primary"
          disabled={!text}
        >
          {isSpeaking() ? <Pause /> : <PlayArrow />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Stop">
        <IconButton
          onClick={handleStop}
          color="secondary"
          disabled={!isSpeaking()}
        >
          <Stop />
        </IconButton>
      </Tooltip>

      <Tooltip title="Resume">
        <IconButton
          onClick={handleResume}
          color="primary"
          disabled={isSpeaking()}
        >
          <RecordVoiceOver />
        </IconButton>
      </Tooltip>

      <Tooltip title="Voice Settings">
        <IconButton onClick={handleSettingsClick}>
          <Settings />
        </IconButton>
      </Tooltip>

      {/* Settings Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleSettingsClose}
        PaperProps={{
          sx: { width: 300, p: 2 }
        }}
      >
        <Typography variant="h6" gutterBottom>
          Voice Settings
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Language Selection */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={currentLanguage}
            label="Language"
            onChange={handleLanguageChange}
          >
            {supportedLanguages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang === 'hi' ? 'हिंदी (Hindi)' :
                 lang === 'en' ? 'English' :
                 lang.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Voice Selection */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Voice</InputLabel>
          <Select
            value={selectedVoice?.name || ''}
            label="Voice"
            onChange={handleVoiceChange}
          >
            {availableVoices.map((voice) => (
              <MenuItem key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rate Control */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Speed: {rate}
          </Typography>
          <Slider
            value={rate}
            onChange={handleRateChange}
            min={0.1}
            max={2}
            step={0.1}
            marks={[
              { value: 0.5, label: 'Slow' },
              { value: 1, label: 'Normal' },
              { value: 1.5, label: 'Fast' }
            ]}
          />
        </Box>

        {/* Pitch Control */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Pitch: {pitch}
          </Typography>
          <Slider
            value={pitch}
            onChange={handlePitchChange}
            min={0}
            max={2}
            step={0.1}
            marks={[
              { value: 0.5, label: 'Low' },
              { value: 1, label: 'Normal' },
              { value: 1.5, label: 'High' }
            ]}
          />
        </Box>

        {/* Volume Control */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Volume: {Math.round(volume * 100)}%
          </Typography>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.1}
            marks={[
              { value: 0.2, label: '20%' },
              { value: 0.5, label: '50%' },
              { value: 0.8, label: '80%' },
              { value: 1, label: '100%' }
            ]}
          />
        </Box>
      </Menu>
    </Box>
  );
};

export default VoiceControls;
