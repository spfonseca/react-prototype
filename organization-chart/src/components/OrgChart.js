import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import './OrgChart.css';

// CSS class names for external styling
const OrgChartContainer = (props) => <Box className="orgchart-container" {...props} />;
const NodeContainer = (props) => <Box className="orgchart-node-container" {...props} />;
const NodeCard = ({ level, ...props }) => <Card className={`orgchart-node-card level-${level}`} {...props} />;
const CardContentWrapper = (props) => <CardContent className="orgchart-card-content-wrapper" {...props} />;
const AvatarContainer = (props) => <Box className="orgchart-avatar-container" {...props} />;
const TextContainer = (props) => <Box className="orgchart-text-container" {...props} />;
const LevelContainer = (props) => <Box className="orgchart-level-container" {...props} />;

// Sample first names and last names for generating random names
const firstNames = [
  'John', 'Sarah', 'Mike', 'Lisa', 'Tom', 'David', 'Emma', 'Sophie', 'Jennifer', 'Robert',
  'Amanda', 'Kevin', 'Maria', 'Michael', 'Rachel', 'Daniel', 'Jessica', 'Alex', 'Emma', 'James'
];

const lastNames = [
  'Smith', 'Johnson', 'Davis', 'Wilson', 'Anderson', 'Brown', 'Taylor', 'Clark', 'Garcia', 'Martinez',
  'Rodriguez', 'Lee', 'Hernandez', 'Thompson', 'White', 'Lewis', 'Hall', 'Wilson', 'Brown', 'Miller'
];

// Sample profile images from Unsplash for generating random headshots
const profileImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
];

// Function to generate consistent name based on userId
const generateNameFromUserId = (userId) => {
  // Create a hash from userId to generate consistent names
  const hash = userId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const firstNameIndex = Math.abs(hash) % firstNames.length;
  const lastNameIndex = Math.abs(hash * 2) % lastNames.length;
  
  return {
    firstName: firstNames[firstNameIndex],
    lastName: lastNames[lastNameIndex]
  };
};

// Function to generate consistent profile image based on userId
const generateProfileImageFromUserId = (userId) => {
  // Create a hash from userId to generate consistent profile image
  const hash = userId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const imageIndex = Math.abs(hash * 3) % profileImages.length;
  return profileImages[imageIndex];
};

// Function to get initials from generated name
const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

// Function to get avatar color based on userId
const getAvatarColor = (userId) => {
  const colors = [
    '#1976d2', '#dc004e', '#388e3c', '#f57c00', '#7b1fa2',
    '#303f9f', '#c2185b', '#388e3c', '#fbc02d', '#5d4037'
  ];
  const hash = userId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return colors[Math.abs(hash) % colors.length];
};

const OrgChart = ({ data, onNodeClick }) => {
  // Ref for scrollable container for level 2
  const level2ScrollRef = React.useRef(null);
  React.useEffect(() => {
    if (level2ScrollRef.current) {
      level2ScrollRef.current.scrollLeft = 0;
    }
  }, [data]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Build the hierarchy levels properly for OrganizationChart schema
  const buildLevels = (orgChart, levels = []) => {
    // Add leader as level 0
    if (!levels[0]) {
      levels[0] = [];
    }
    levels[0].push(orgChart.leader);
    
    // Add direct reports as level 1
    if (orgChart.directReports && orgChart.directReports.length > 0) {
      if (!levels[1]) {
        levels[1] = [];
      }
      levels[1].push(...orgChart.directReports);
      
      // Recursively add deeper levels
      const addDeeperLevels = (members, level) => {
        if (!levels[level]) {
          levels[level] = [];
        }
        
        members.forEach(member => {
          if (member.directReports && member.directReports.length > 0) {
            if (!levels[level + 1]) {
              levels[level + 1] = [];
            }
            levels[level + 1].push(...member.directReports);
            addDeeperLevels(member.directReports, level + 1);
          }
        });
      };
      
      addDeeperLevels(orgChart.directReports, 1);
    }
    
    return levels;
  };

  const levels = buildLevels(data);

  const renderNode = (node, level, index) => {
    const { firstName, lastName } = generateNameFromUserId(node.userId);
    const fullName = `${firstName} ${lastName}`;
    const initials = getInitials(firstName, lastName);
    const avatarColor = getAvatarColor(node.userId);
    const profileImage = generateProfileImageFromUserId(node.userId);
    
    return (
      <NodeContainer key={`${node.userId}-${level}-${index}`}>
        <NodeCard 
          level={level}
          onClick={() => onNodeClick && onNodeClick(node)}
        >
          <CardContentWrapper>
            <AvatarContainer>
              <Avatar
                sx={{
                  width: level === 0 ? 56 : 48,
                  height: level === 0 ? 56 : 48,
                  backgroundColor: level === 0 ? 'rgba(255, 255, 255, 0.2)' : avatarColor,
                  color: level === 0 ? '#ffffff' : '#ffffff',
                  fontSize: level === 0 ? '1.25rem' : '1rem',
                  fontWeight: 600,
                  border: level === 0 ? '2px solid rgba(255, 255, 255, 0.3)' : 'none'
                }}
                src={profileImage}
                alt={fullName}
              >
                {initials || <PersonIcon />}
              </Avatar>
            </AvatarContainer>
            
            <TextContainer>
              <Typography 
                variant={level === 0 ? "h6" : "subtitle1"}
                component="div"
                sx={{ 
                  fontWeight: level === 0 ? 600 : 500,
                  mb: 0.5,
                  lineHeight: 1.2,
                  fontSize: level === 0 ? '1.1rem' : '1rem'
                }}
              >
                {fullName}
              </Typography>
              <Typography 
                variant="body2" 
                component="div"
                sx={{ 
                  opacity: level === 0 ? 0.9 : 0.7,
                  fontSize: '0.875rem',
                  lineHeight: 1.3,
                  fontWeight: 400
                }}
              >
                {node.title}
              </Typography>
            </TextContainer>
          </CardContentWrapper>
        </NodeCard>
      </NodeContainer>
    );
  };

  const renderLevel = (levelNodes, levelIndex, scrollRef) => {
    const cardWidth = 320;
    const gap = 16;
    
    if (levelIndex === 0) {
      // Level 0: CEO centered
      return (
        <LevelContainer key={`level-${levelIndex}`}>
          <Box sx={{ position: 'relative' }}>
            {renderNode(levelNodes[0], levelIndex, 0)}
          </Box>
        </LevelContainer>
      );
    } else if (levelIndex === 1) {
      // Level 1: CTO and CFO positioned horizontally with less spacing
      return (
        <LevelContainer key={`level-${levelIndex}`}>
          <Box sx={{ 
            position: 'relative',
            marginRight: gap
          }}>
            {renderNode(levelNodes[0], levelIndex, 0)} {/* CTO */}
          </Box>
          <Box sx={{ 
            position: 'relative'
          }}>
            {renderNode(levelNodes[1], levelIndex, 1)} {/* CFO */}
          </Box>
        </LevelContainer>
      );
    }
    if (levelIndex === 2) {
      // Level 2: All 6 reports at the same vertical level (same row)
      const cardWidth = 320;
      const gap = 16;
      const totalWidth = (levelNodes.length * cardWidth) + ((levelNodes.length - 1) * gap);

      return (
        <LevelContainer 
          key={`level-${levelIndex}`}
          ref={scrollRef}
          sx={{
            whiteSpace: 'nowrap',
            minWidth: `${totalWidth}px`,
            overflowX: 'auto',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              height: 8
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c1c1c1',
              borderRadius: 4
            }
          }}
        >
          <Box sx={{
            display: 'inline-flex',
            gap: gap,
            padding: '0'
          }}>
            {levelNodes.map((node, index) => (
              <Box key={`node-${node.userId}-${index}`} sx={{ 
                position: 'relative',
                flexShrink: 0,
                width: `${cardWidth}px`
              }}>
                {renderNode(node, levelIndex, index)}
              </Box>
            ))}
          </Box>
        </LevelContainer>
      );
    }
    
    // Fallback for other levels - position horizontally
    return (
      <LevelContainer key={`level-${levelIndex}`}>
        {levelNodes.map((node, index) => (
          <Box key={`node-${node.userId}-${index}`} sx={{ 
            position: 'relative',
            marginRight: index < levelNodes.length - 1 ? gap : 0
          }}>
            {renderNode(node, levelIndex, index)}
          </Box>
        ))}
      </LevelContainer>
    );
  };

  const renderConnectors = () => {
    const connectors = [];
    
    // Calculate positions for proper hierarchical layout
    const cardWidth = 320;
    const cardHeight = 120;
    const gap = 16;
    const levelSpacing = 24;
    
    // Level 0: CEO (center)
    const ceoX = 0;
    const ceoY = 0;
    
    // Level 1: CTO and CFO (closer together)
    const ctoX = -(cardWidth + gap) / 2;
    const ctoY = cardHeight + levelSpacing;
    const cfoX = (cardWidth + gap) / 2;
    const cfoY = cardHeight + levelSpacing;
    
    // Level 2: All reports at the same vertical level
    const reportY = ctoY + cardHeight + levelSpacing;
    
    // Draw connector from CEO to CTO and CFO
    connectors.push(
      // Vertical line from CEO down to CTO
      <Box
        key="ceo-to-cto"
        sx={{
          position: 'absolute',
          left: ctoX + cardWidth/2,
          top: ceoY + cardHeight,
          width: '2px',
          height: ctoY - (ceoY + cardHeight),
          backgroundColor: '#666666',
          zIndex: 10
        }}
      />,
      // Vertical line from CEO down to CFO
      <Box
        key="ceo-to-cfo"
        sx={{
          position: 'absolute',
          left: cfoX + cardWidth/2,
          top: ceoY + cardHeight,
          width: '2px',
          height: cfoY - (ceoY + cardHeight),
          backgroundColor: '#666666',
          zIndex: 10
        }}
      />
    );
    
    // Draw connector from CTO to its reports (first 3)
    connectors.push(
      // Vertical line from CTO down
      <Box
        key="cto-down"
        sx={{
          position: 'absolute',
          left: ctoX + cardWidth/2,
          top: ctoY + cardHeight,
          width: '2px',
          height: reportY - (ctoY + cardHeight),
          backgroundColor: '#666666',
          zIndex: 10
        }}
      />
    );
    
    // Draw connector from CFO to its reports (last 3)
    connectors.push(
      // Vertical line from CFO down
      <Box
        key="cfo-down"
        sx={{
          position: 'absolute',
          left: cfoX + cardWidth/2,
          top: cfoY + cardHeight,
          width: '2px',
          height: reportY - (cfoY + cardHeight),
          backgroundColor: '#666666',
          zIndex: 10
        }}
      />
    );
    
    return connectors;
  };

  if (!data) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No organization data available
        </Typography>
      </Box>
    );
  }

  return (
    <OrgChartContainer>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 0, 
          borderRadius: 2,
          backgroundColor: 'transparent',
          position: 'relative',
          minWidth: 'fit-content',
          minHeight: 'fit-content',
          width: 'max-content',
          maxWidth: 'none',
          display: 'block'
        }}
      >
        {renderConnectors()}
        {levels.map((levelNodes, levelIndex) => 
          levelIndex === 2
            ? renderLevel(levelNodes, levelIndex, level2ScrollRef)
            : renderLevel(levelNodes, levelIndex)
        )}
      </Paper>
    </OrgChartContainer>
  );
};

export default OrgChart;