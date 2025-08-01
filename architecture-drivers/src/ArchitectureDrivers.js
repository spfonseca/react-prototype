import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FlagIcon from '@mui/icons-material/Flag';
import PolicyIcon from '@mui/icons-material/Policy';
import './ArchitectureDrivers.css';

const ArchitectureDrivers = ({
  architectureDriverId,
  organizationVisionStatement = '',
  organizationMissionStatement = '',
  productPortfolioName = '',
  productPortfolioScope = '',
  businessContext = [],
  technicalImperatives = [],
  businessImperatives = [],
  qualityAttributes = [],
  importantFunctions = [],
}) => {
  return (
    <Box className="ammos-container">
      {/* Header Section */}
      <Paper elevation={4} className="ammos-header">
        <Typography variant="h4" component="h1" className="ammos-title">
          {productPortfolioName} - Architecture Drivers
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" className="ammos-subtitle">
          {productPortfolioScope}
        </Typography>
      </Paper>

      <Grid container spacing={3} className="ammos-content">
        {/* Vision & Mission Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="ammos-card vision-mission-card">
            <CardHeader
              title="Strategic Foundation"
              subheader="Vision & Mission Statements"
              avatar={<FlagIcon color="primary" />}
              className="ammos-card-header"
            />
            <CardContent>
              <Box className="vision-section">
                <Typography variant="h6" sx={{ color: '#1976d2' }} gutterBottom>
                  Vision Statement
                </Typography>
                <Typography variant="body1" paragraph className="vision-text">
                  {organizationVisionStatement}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box className="mission-section">
                <Typography variant="h6" sx={{ color: '#1976d2' }} gutterBottom>
                  Mission Statement
                </Typography>
                <Typography variant="body1" className="mission-text">
                  {organizationMissionStatement}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Business Context Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="ammos-card business-context-card">
            <CardHeader
              title="Business Context"
              subheader="Operational Environment"
              avatar={<AssignmentIcon color="primary" />}
              className="ammos-card-header"
            />
            <CardContent>
              <List dense>
                {businessContext.map((context, idx) => (
                  <ListItem key={idx} className="ammos-list-item">
                    <ListItemIcon>
                      <StarIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={context}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Business Imperatives Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="ammos-card business-imperatives-card">
            <CardHeader
              title="Business Imperatives"
              subheader="Strategic Objectives"
              avatar={<BusinessIcon color="success" />}
              className="ammos-card-header"
            />
            <CardContent>
              <List dense>
                {businessImperatives.map((imperative, idx) => (
                  <ListItem key={idx} className="ammos-list-item">
                    <ListItemIcon>
                      <ArrowRightIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={imperative}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Technical Imperatives Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="ammos-card technical-imperatives-card">
            <CardHeader
              title="Technical Imperatives"
              subheader="Implementation Requirements"
              avatar={<EngineeringIcon color="info" />}
              className="ammos-card-header"
            />
            <CardContent>
              <List dense>
                {technicalImperatives.map((imperative, idx) => (
                  <ListItem key={idx} className="ammos-list-item">
                    <ListItemIcon>
                      <ArrowRightIcon color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={imperative}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quality Attributes Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="ammos-card quality-attributes-card">
            <CardHeader
              title="Quality Attributes"
              subheader="System Characteristics"
              avatar={<SecurityIcon color="warning" />}
              className="ammos-card-header"
            />
            <CardContent>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {qualityAttributes.map((attr, idx) => (
                  <Chip
                    key={idx}
                    label={attr}
                    color="primary"
                    variant="outlined"
                    size="small"
                    className="quality-chip"
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Important Functions Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="ammos-card important-functions-card">
            <CardHeader
              title="Critical Functions"
              subheader="Essential Capabilities"
              avatar={<PolicyIcon color="success" />}
              className="ammos-card-header"
            />
            <CardContent>
              <List dense>
                {importantFunctions.map((func, idx) => (
                  <ListItem key={idx} className="ammos-list-item">
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={func}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArchitectureDrivers;