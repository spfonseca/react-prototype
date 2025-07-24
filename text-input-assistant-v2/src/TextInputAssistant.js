import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Slider,
  Typography,
  IconButton,
  Collapse,
  Box,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faChevronDown,
  faChevronUp,
  faFileExport,
  faXmark,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './TextInputAssistant.css';

const toneOptions = ['Professional', 'Personable', 'Playful'];
const formalityOptions = ['Formal', 'Neutral', 'Informal'];

const exampleSlides = [
  "Example Slide 1: Try swiping!\nThis slide demonstrates how multiple lines of text will automatically expand the slide height.\nYou can add as much content as needed.",
  "Example Slide 2: Pagination bullets below.\nNotice how the slide grows to fit this extra line.\nSwiper height is now automatic!",
  "Example Slide 3: Click a bullet to jump."
];

const TextInputAssistant = ({ suggestions = [], onExport }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userText, setUserText] = useState('');
  const [length, setLength] = useState(20);
  const [tone, setTone] = useState(0);
  const [formality, setFormality] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [popoverPos, setPopoverPos] = useState({ top: null, left: null });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef(null);

  // Combine suggestions and example slides for indexing
  const allSlides = [
    ...suggestions,
    ...exampleSlides
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        const { x, y } = mousePos;
        if (Number.isFinite(x) && Number.isFinite(y)) {
          const el = document.elementFromPoint(x, y);
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

  // Copy handlers use allSlides and activeIndex
  const handleCopyLeft = () => {
    setUserText(allSlides[activeIndex] ?? '');
  };
  const handleCopyMiddle = () => {
    setUserText(allSlides[activeIndex + 1] ?? '');
  };
  const handleCopyRight = () => {
    setUserText(allSlides[activeIndex + 2] ?? '');
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

  const popoverWidth = 840;

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
            width: popoverWidth,
            minWidth: popoverWidth,
            maxWidth: 1000,
            maxHeight: '80vh',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Draggable header with X icon */}
          <Box
            className="tia-header"
            onMouseDown={handlePopoverMouseDown}
            sx={{ flexShrink: 0 }}
          >
            <IconButton size="small" onClick={handleClose} className="tia-close-btn">
              <FontAwesomeIcon icon={faXmark} style={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* Dragonfly Assistant Swiper with outlined border and inline title */}
          <Box sx={{ my: 2, width: '100%', flex: 1, minHeight: 0, position: 'relative' }}>
            <Box
              sx={{
                position: 'relative',
                border: '1px solid #ccc',
                borderRadius: '4px',
                bgcolor: '#fff',
                mt: 0,
                mb: 2,
                px: 2,
                pb: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  top: -10,
                  left: 10,
                  px: 0.5,
                  bgcolor: '#fff',
                  fontSize: 13,
                  color: '#555',
                }}
              >
                Dragonfly Assistant
              </Typography>
              <Box sx={{ pt: 2 }}>
                <Swiper
                  spaceBetween={36}
                  slidesPerView={3}
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                  style={{ width: '100%' }}
                  autoHeight={true}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                  {suggestions.map((text, idx) => (
                    <SwiperSlide key={idx}>
                      <Box
                        sx={{
                          p: 2,
                          height: 'auto',
                          bgcolor: '#fafafa',
                          borderRadius: 2,
                          border: '1px solid #eee',
                          width: '97%',
                        }}
                      >
                        <Typography variant="body1">{text}</Typography>
                      </Box>
                    </SwiperSlide>
                  ))}
                  {/* Example slides */}
                  <SwiperSlide>
                    <Box
                      sx={{
                        p: 2,
                        height: 'auto',
                        bgcolor: '#e3f2fd',
                        borderRadius: 2,
                        border: '1px solid #90caf9',
                        width: '97%',
                      }}
                    >
                      <Typography variant="body1">
                        Example Slide 1: Try swiping!<br />
                        This slide demonstrates how multiple lines of text will automatically expand the slide height.<br />
                        You can add as much content as needed.
                      </Typography>
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box
                      sx={{
                        p: 2,
                        height: 'auto',
                        bgcolor: '#fce4ec',
                        borderRadius: 2,
                        border: '1px solid #f06292',
                        width: '97%',
                      }}
                    >
                      <Typography variant="body1">
                        Example Slide 2: Pagination bullets below.<br />
                        Notice how the slide grows to fit this extra line.<br />
                        Swiper height is now automatic!
                      </Typography>
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box
                      sx={{
                        p: 2,
                        height: 'auto',
                        bgcolor: '#e8f5e9',
                        borderRadius: 2,
                        border: '1px solid #66bb6a',
                        width: '97%',
                      }}
                    >
                      <Typography variant="body1">
                        Example Slide 3: Click a bullet to jump.
                      </Typography>
                    </Box>
                  </SwiperSlide>
                </Swiper>
              </Box>
            </Box>
          </Box>

          {/* Arrow buttons centered below each slide, between assistant and user editing area */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 56,
              mb: 2,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: `${(1 / 6) * 100}%`,
                transform: 'translateX(-50%)',
                top: 0,
              }}
            >
              <button
                type="button"
                onClick={handleCopyLeft}
                className="tia-arrow-btn"
                aria-label="Copy left suggestion to user editing area"
                title="Copy left suggestion"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                left: `${(3 / 6) * 100}%`,
                transform: 'translateX(-50%)',
                top: 0,
              }}
            >
              <button
                type="button"
                onClick={handleCopyMiddle}
                className="tia-arrow-btn"
                aria-label="Copy middle suggestion to user editing area"
                title="Copy middle suggestion"
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                left: `${(5 / 6) * 100}%`,
                transform: 'translateX(-50%)',
                top: 0,
              }}
            >
              <button
                type="button"
                onClick={handleCopyRight}
                className="tia-arrow-btn"
                aria-label="Copy right suggestion to user editing area"
                title="Copy right suggestion"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Box>
          </Box>

          {/* User Editing Area text area with inline label */}
          <Box sx={{ my: 2, width: '100%' }}>
            <TextField
              label="User Editing Area"
              multiline
              rows={4}
              fullWidth
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              variant="outlined"
              sx={{ width: '100%' }}
              InputLabelProps={{ shrink: true }}
              inputRef={inputRef}
              inputProps={{
                style: { padding: 8 },
                className: 'assistant-enabled',
              }}
            />
          </Box>

          {/* Advanced toggle and export button */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
            <Box onClick={() => setShowAdvanced((prev) => !prev)} sx={{ cursor: 'pointer' }}>
              <Typography variant="body2">Advanced</Typography>
              <FontAwesomeIcon icon={showAdvanced ? faChevronUp : faChevronDown} />
            </Box>
            <IconButton onClick={handleExport}>
              <FontAwesomeIcon icon={faFileExport} />
            </IconButton>
          </Box>

          {/* Advanced section with sliders */}
          <Collapse in={showAdvanced}>
            <Box mt={1}>
              {/* Length slider */}
              <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ my: 1.5 }}>
                <Typography>Length</Typography>
                <Box sx={{ width: 466, position: 'relative' }}>
                  <Slider
                    value={length}
                    min={1}
                    max={250}
                    step={1}
                    onChange={(e, v) => setLength(v)}
                    sx={{ width: 466 }}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => `${v} words`}
                  />
                </Box>
              </Box>

              {/* Tone slider */}
              <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ my: 1.5 }}>
                <Typography>Tone</Typography>
                <Box sx={{ width: 466, position: 'relative' }}>
                  <Slider
                    value={tone}
                    min={0}
                    max={toneOptions.length - 1}
                    step={1}
                    marks={toneOptions.map((label, idx) => ({ value: idx, label }))}
                    onChange={(e, v) => setTone(v)}
                    sx={{ width: 466 }}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => toneOptions[v]}
                  />
                </Box>
              </Box>

              {/* Formality slider */}
              <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ my: 1.5 }}>
                <Typography>Formality</Typography>
                <Box sx={{ width: 466, position: 'relative' }}>
                  <Slider
                    value={formality}
                    min={0}
                    max={formalityOptions.length - 1}
                    step={1}
                    marks={formalityOptions.map((label, idx) => ({ value: idx, label }))}
                    onChange={(e, v) => setFormality(v)}
                    sx={{ width: 466 }}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => formalityOptions[v]}
                  />
                </Box>
              </Box>
            </Box>
          </Collapse>
        </Box>
      )}
    </>
  );
};

export default TextInputAssistant;