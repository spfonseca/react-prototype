import React, { useState, useEffect } from 'react';
import {
  TextField,
  Slider,
  Typography,
  IconButton,
  Collapse,
  Box,
  Stack,
  Tooltip,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardStep,
  faBackward,
  faForward,
  faForwardStep,
  faArrowDown,
  faChevronDown,
  faChevronUp,
  faFileExport,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import './TextInputAssistant.css';

const toneOptions = ['Serious', 'Professional', 'Friendly', 'Witty', 'Enthusiastic'];

const TextInputAssistant = ({ suggestions = [], onExport }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userText, setUserText] = useState('');
  const [length, setLength] = useState(50);
  const [tone, setTone] = useState(2); // Default to 'Friendly'
  const [formality, setFormality] = useState(50);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [popoverPos, setPopoverPos] = useState({ top: null, left: null });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [toneTooltipOpen, setToneTooltipOpen] = useState(false);
  const [toneSliderHover, setToneSliderHover] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        const { x, y } = mousePos;
        if (Number.isFinite(x) && Number.isFinite(y)) {
          const el = document.elementFromPoint(x, y);
          // Only activate for elements with class 'assistant-enabled'
          if (
            el &&
            (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.type === 'text')) &&
            el.classList.contains('assistant-enabled')
          ) {
            setAnchorEl(el);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mousePos]);

  useEffect(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setPopoverPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
  }, [anchorEl]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    if (suggestions.length > 0) {
      setUserText(suggestions[activeIndex]);
    }
  };

  const handleExport = () => {
    onExport({ userText, length, tone, formality });
    if (anchorEl) {
      if (anchorEl.tagName === 'TEXTAREA' || (anchorEl.tagName === 'INPUT' && anchorEl.type === 'text')) {
        anchorEl.value = userText;
        anchorEl.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  const handleNavigation = (type) => {
    const total = suggestions.length;
    if (total === 0) return;
    if (type === 'first') setActiveIndex(0);
    if (type === 'last') setActiveIndex(total - 1);
    if (type === 'next') setActiveIndex((prev) => (prev + 1) % total);
    if (type === 'prev') setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handlePopoverMouseDown = (e) => {
    if (e.button !== 0) return;
    setDragging(true);
    const popoverRect = e.currentTarget.parentElement.getBoundingClientRect();
    setDragOffset({ x: e.clientX - popoverRect.left, y: e.clientY - popoverRect.top });
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = (e) => {
      setPopoverPos({ top: e.clientY - dragOffset.y, left: e.clientX - dragOffset.x });
    };
    const handleMouseUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragOffset]);

  // Tooltip for Tone slider
  const handleToneChange = (e, v) => {
    setTone(v);
    setToneTooltipOpen(true);
  };
  const handleToneChangeCommitted = () => {
    setToneTooltipOpen(false);
  };

  return (
    <>
      {anchorEl && popoverPos.top !== null && popoverPos.left !== null && (
        <Box
          className="tia-popover"
          style={{
            top: popoverPos.top,
            left: popoverPos.left,
            position: 'absolute',
            zIndex: 1300,
          }}
        >
          {/* Draggable header with X icon */}
          <Box
            className="tia-header"
            onMouseDown={handlePopoverMouseDown}
          >
            <IconButton size="small" onClick={handleClose} className="tia-close-btn">
              <FontAwesomeIcon icon={faXmark} style={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          <Stack direction="row" justifyContent="center" spacing={1}>
            <IconButton onClick={() => handleNavigation('first')} disabled={suggestions.length === 0}>
              <FontAwesomeIcon icon={faBackwardStep} />
            </IconButton>
            <IconButton onClick={() => handleNavigation('prev')} disabled={suggestions.length === 0}>
              <FontAwesomeIcon icon={faBackward} />
            </IconButton>
            <IconButton onClick={() => handleNavigation('next')} disabled={suggestions.length === 0}>
              <FontAwesomeIcon icon={faForward} />
            </IconButton>
            <IconButton onClick={() => handleNavigation('last')} disabled={suggestions.length === 0}>
              <FontAwesomeIcon icon={faForwardStep} />
            </IconButton>
          </Stack>

          {/* Dragonfly Assistant text area with inline label */}
          <TextField
            label="Dragonfly Assistant"
            multiline
            rows={4}
            fullWidth
            value={suggestions.length > 0 ? suggestions[activeIndex] : ''}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            sx={{ my: 2 }}
          />

          {/* Arrow button for copying suggestion to user editing area */}
          <Box display="flex" justifyContent="center" alignItems="center" my={1}>
            <button
              type="button"
              onClick={handleCopy}
              disabled={suggestions.length === 0}
              className="tia-arrow-btn"
              aria-label="Copy suggestion to user editing area"
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </Box>

          {/* User Editing Area text area with inline label */}
          <TextField
            label="User Editing Area"
            multiline
            rows={4}
            fullWidth
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            variant="outlined"
            sx={{ my: 2 }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ style: { padding: 8 } }}
          />

          {/* Length slider */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>Length</Typography>
            <Slider value={length} onChange={(e, v) => setLength(v)} sx={{ width: 180 }} />
          </Box>

          {/* Tone slider (discrete, tooltip only on change or hover, tooltip over thumb) */}
          <Box display="flex" alignItems="center"   valueLabelDisplay="auto" justifyContent="space-between">
            <Typography>
              Tone
            </Typography>
            <Box sx={{ width: 180, position: 'relative' }}>
              <Tooltip
                open={toneTooltipOpen || toneSliderHover}
                title={toneOptions[tone]}
                placement="top"
                arrow
                disableFocusListener
                disableHoverListener
                disableTouchListener
              >
                <Slider
                  value={tone}
                  min={0}
                  max={toneOptions.length - 1}
                  step={1}
                  marks
                  onChange={handleToneChange}
                  onChangeCommitted={handleToneChangeCommitted}
                  sx={{ width: 180 }}
                  onMouseEnter={() => setToneSliderHover(true)}
                  onMouseLeave={() => setToneSliderHover(false)}
                />
              </Tooltip>
            </Box>
          </Box>

          {/* Formality slider */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>Formality</Typography>
            <Slider value={formality} onChange={(e, v) => setFormality(v)} sx={{ width: 180 }} />
          </Box>

          <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
            <Box onClick={() => setShowAdvanced((prev) => !prev)} sx={{ cursor: 'pointer' }}>
              <Typography variant="body2">Advanced</Typography>
              <FontAwesomeIcon icon={showAdvanced ? faChevronUp : faChevronDown} />
            </Box>
            <IconButton onClick={handleExport}>
              <FontAwesomeIcon icon={faFileExport} />
            </IconButton>
          </Box>

          <Collapse in={showAdvanced}>
            <Box mt={1}>{/* Advanced content goes here */}</Box>
          </Collapse>
        </Box>
      )}
    </>
  );
};

export default TextInputAssistant;