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
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './TextInputAssistant.css';

const toneOptions = ['Professional', 'Personable', 'Playful'];
const formalityOptions = ['Formal', 'Neutral', 'Informal'];

const defaultSlides = [
  {
    type: 'suggestion',
    content: 'This is a suggestion slide.',
    bgColor: '#e3f2fd',
  },
  {
    type: 'example',
    content:
      'Example Slide 1: Try swiping!\nThis slide demonstrates how multiple lines of text will automatically expand the slide height.\nYou can add as much content as needed.',
    bgColor: '#e3f2fd',
  },
  {
    type: 'example',
    content:
      'Example Slide 2: Pagination bullets below.\nNotice how the slide grows to fit this extra line.\nSwiper height is now automatic!',
    bgColor: '#e3f2fd',
  },
  {
    type: 'example',
    content: 'Example Slide 3: Click a bullet to jump.',
    bgColor: '#e3f2fd',
  },
];

const TextInputAssistant = ({
  slides = defaultSlides,
  onExport,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userText, setUserText] = useState('');
  const [length, setLength] = useState(25);
  const [tone, setTone] = useState(0);
  const [formality, setFormality] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [popoverPos, setPopoverPos] = useState({ top: null, left: null });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [aiPrompt, setAiPrompt] = useState('');

  const inputRef = useRef(null);

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
    setUserText("");
    setAiPrompt(""); // Clear AI Prompt when popover closes
  };

  const handleCopyLeft = () => {
    setUserText(slides[activeIndex]?.content ?? '');
  };
  const handleCopyMiddle = () => {
    setUserText(slides[activeIndex + 1]?.content ?? '');
  };
  const handleCopyRight = () => {
    setUserText(slides[activeIndex + 2]?.content ?? '');
  };

  const handleExport = () => {
    onExport && onExport({ userText, length, tone, formality });
    if (anchorEl) {
      if (anchorEl.tagName === 'TEXTAREA' || (anchorEl.tagName === 'INPUT' && anchorEl.type === 'text')) {
        anchorEl.value = userText;
        anchorEl.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
    setAnchorEl(null);
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

  const handleAgentClick = () => {
    const agentData = {
      length,
      tone: toneOptions[tone],
      formality: formalityOptions[formality],
      aiPrompt,
    };
    window.alert(JSON.stringify(agentData, null, 2));
  };

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
            maxHeight: '95vh',
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
                  {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                      <Box
                        sx={{
                          p: 2,
                          height: 'auto',
                          bgcolor: slide.bgColor || '#e3f2fd',
                          borderRadius: 2,
                          border: slide.type === 'example' ? '1px solid #90caf9' : '1px solid #eee',
                          width: '97%',
                          userSelect: 'none',
                        }}
                      >
                        <Typography variant="body1" sx={{ userSelect: 'none', whiteSpace: 'pre-line' }}>
                          {slide.content}
                        </Typography>
                      </Box>
                    </SwiperSlide>
                  ))}
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
                <FontAwesomeIcon icon={faArrowDown} />
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
                <FontAwesomeIcon icon={faArrowDown} />
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

          {/* Export button centered below User Editing Area */}
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <IconButton
              onClick={handleExport}
              color="primary"
              size="large"
              aria-label="Copy to external text area"
              title="Copy to external text area"
            >
              <FontAwesomeIcon icon={faFileExport} />
            </IconButton>
          </Box>

          {/* Additional Configuration toggle above border; border only shows if open */}
          <Box sx={{ position: 'relative', width: '100%', mt: 1, mb: -1, minHeight: 38 }}>
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 16,
                zIndex: 2,
                px: 0.5,
                bgcolor: '#fff',
                fontSize: 13,
                color: '#555',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                height: 24,
              }}
              onClick={() => setShowAdvanced((prev) => !prev)}
            >
              <Typography variant="body2" component="span">
                Additional Configuration
              </Typography>
              <FontAwesomeIcon icon={showAdvanced ? faChevronUp : faChevronDown} style={{ marginLeft: 8 }} />
            </Box>
          </Box>

          {/* Advanced section with sliders and border only when open */}
          <Collapse in={showAdvanced}>
            <Box
              mt={1}
              sx={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                bgcolor: '#fff',
                px: 2,
                pb: 2,
                pt: 2,
                width: '100%',
              }}
            >
              <Box display="flex" alignItems="flex-start" sx={{ my: 1.5 }}>
                <Box sx={{ flex: 1 }}>
                  {/* Length slider */}
                  <Box display="flex" alignItems="center" sx={{ my: 1.5 }}>
                    <Typography sx={{ minWidth: 80 }}>Length</Typography>
                    <Slider
                      value={length}
                      min={1}
                      max={75}
                      step={1}
                      onChange={(e, v) => setLength(v)}
                      sx={{ width: 240, ml: 12.5 }}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(v) => `${v} words`}
                    />
                  </Box>

                  {/* Tone slider */}
                  <Box display="flex" alignItems="center" sx={{ my: 1.5 }}>
                    <Typography sx={{ minWidth: 80 }}>Tone</Typography>
                    <Slider
                      value={tone}
                      min={0}
                      max={toneOptions.length - 1}
                      step={1}
                      marks={toneOptions.length > 1 ? toneOptions.map((_, idx) => ({ value: idx })) : false}
                      onChange={(e, v) => setTone(v)}
                      sx={{ width: 240, ml: 12.5 }}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(v) => toneOptions[v]}
                    />
                  </Box>

                  {/* Formality slider */}
                  <Box display="flex" alignItems="center" sx={{ my: 1.5 }}>
                    <Typography sx={{ minWidth: 80 }}>Formality</Typography>
                    <Slider
                      value={formality}
                      min={0}
                      max={formalityOptions.length - 1}
                      step={1}
                      marks={formalityOptions.length > 1 ? formalityOptions.map((_, idx) => ({ value: idx })) : false}
                      onChange={(e, v) => setFormality(v)}
                      sx={{ width: 240, ml: 12.5 }}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(v) => formalityOptions[v]}
                    />
                  </Box>
                </Box>
                {/* Text area to the right of sliders */}
                <Box sx={{ minWidth: 220, ml: 4, width:300 }}>
                  <TextField
                    label="AI Prompt"
                    multiline
                    rows={5}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                  />
                </Box>
              </Box>
              {/* Agent button centered at the bottom of additional configuration */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <IconButton
                  color="secondary"
                  size="large"
                  aria-label="Agent"
                  title="Have Dragonfly generate new responses"
                  onClick={handleAgentClick}
                >
                  <FontAwesomeIcon icon={faUserAstronaut} />
                </IconButton>
              </Box>
            </Box>
          </Collapse>

        </Box>
      )}
    </>
  );
};

export default TextInputAssistant;