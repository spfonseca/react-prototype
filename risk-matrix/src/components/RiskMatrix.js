import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText as MuiListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './RiskMatrix.css';

const likelihoodLabels = [
  'VERY_LIKELY',
  'LIKELY',
  'POSSIBLE',
  'UNLIKELY',
  'VERY_UNLIKELY'
];
const likelihoodDisplay = [
  'Very Likely',
  'Likely',
  'Possible',
  'Unlikely',
  'Very Unlikely'
];
const impactLabels = [
  'NEGLIGIBLE',
  'MINOR',
  'MODERATE',
  'SIGNIFICANT',
  'SEVERE'
];
const impactDisplay = [
  'Negligible',
  'Minor',
  'Moderate',
  'Significant',
  'Severe'
];

// User-friendly display mappings
const stateDisplay = {
  'DRAFT': 'Draft',
  'OPEN': 'Open',
  'CLOSED': 'Closed'
};

const resolutionDisplay = {
  'ACCEPTED': 'Accepted',
  'PARTIALLY_MITIGATED': 'Partially Mitigated',
  'FULLY_MITIGATED': 'Fully Mitigated',
  'NON_ISSUE': 'Non-Issue'
};

// Fake owner name lookup - will be replaced with API call
const getOwnerName = (ownerId) => {
  const fakeNames = {
    'user-1': 'Sarah Johnson',
    'user-2': 'Michael Chen',
    'user-3': 'Emily Rodriguez',
    'user-4': 'David Thompson',
    'user-5': 'Lisa Wang',
    'user-6': 'James Wilson'
  };
  return fakeNames[ownerId] || `Unknown User (${ownerId})`;
};

function countRisks(risks, likelihood, impact) {
  return risks.filter(r => r.likelihood === likelihood && r.impact === impact).length;
}

const RiskMatrix = ({ data }) => {
  const [impactFilter, setImpactFilter] = useState(['All']);
  const [likelihoodFilter, setLikelihoodFilter] = useState(['All']);
  const [selectedRisk, setSelectedRisk] = useState('');

  const filteredRisks = useMemo(() => {
    return data.risks.filter(risk => {
      const impactMatch = impactFilter.includes('All') || impactFilter.includes(risk.impact);
      const likelihoodMatch = likelihoodFilter.includes('All') || likelihoodFilter.includes(risk.likelihood);
      return impactMatch && likelihoodMatch;
    });
  }, [data.risks, impactFilter, likelihoodFilter]);

  const selectedRiskData = useMemo(() => {
    return data.risks.find(risk => `${risk.number} - ${risk.name}` === selectedRisk);
  }, [data.risks, selectedRisk]);

  const handleImpactChange = (event) => {
    const value = event.target.value;
    if (value.includes('All')) {
      setImpactFilter(['All']);
    } else {
      setImpactFilter(value);
    }
    setSelectedRisk(''); // Reset selection when filters change
  };

  const handleLikelihoodChange = (event) => {
    const value = event.target.value;
    if (value.includes('All')) {
      setLikelihoodFilter(['All']);
    } else {
      setLikelihoodFilter(value);
    }
    setSelectedRisk(''); // Reset selection when filters change
  };

  const handleRiskChange = (event) => {
    setSelectedRisk(event.target.value);
  };

  const handleCellClick = (likelihood, impact) => {
    // Set filters to show only risks in this cell
    setImpactFilter([impact]);
    setLikelihoodFilter([likelihood]);
    
    // Find the first risk in this cell and select it
    const risksInCell = data.risks.filter(risk => 
      risk.likelihood === likelihood && risk.impact === impact
    );
    
    if (risksInCell.length > 0) {
      const firstRisk = risksInCell[0];
      setSelectedRisk(`${firstRisk.number} - ${firstRisk.name}`);
    }
  };

  return (
    <div className="risk-matrix-root">
      <h2 className="risk-matrix-title">{data.title}</h2>
      <p className="risk-matrix-description">{data.description}</p>
      
      <div className="risk-matrix-container">
        <div className="likelihood-label">Likelihood</div>
        <div className="matrix-content">
          <div className="impact-label">Impact</div>
          <div className="risk-matrix-table-wrapper">
            <table className="risk-matrix-table">
              <thead>
                <tr>
                  <th className="corner-cell"></th>
                  {impactDisplay.map((label, i) => (
                    <th key={label} className="impact-header">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {likelihoodLabels.map((likelihood, i) => (
                  <tr key={likelihood}>
                    <th className="likelihood-header">{likelihoodDisplay[i]}</th>
                    {impactLabels.map((impact, j) => {
                      const riskCount = countRisks(data.risks, likelihood, impact);
                      return (
                        <td 
                          key={impact} 
                          className={`risk-cell risk-cell-${likelihood.toLowerCase()}-${impact.toLowerCase()}`}
                          onClick={() => riskCount > 0 && handleCellClick(likelihood, impact)}
                          style={{ 
                            cursor: riskCount > 0 ? 'pointer' : 'default',
                            transition: 'all 0.2s ease'
                          }}
                          title={riskCount > 0 ? `Click to view ${riskCount} risk(s) in this cell` : 'No risks in this cell'}
                        > 
                          {riskCount}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Accordion defaultExpanded={false} style={{ marginTop: '2rem' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h3 style={{ margin: 0 }}>Risk Details</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" color="textSecondary" style={{ marginBottom: '0.5rem' }}>
                  Impact
                </Typography>
                <FormControl style={{ minWidth: 200 }}>
                  <Select
                    multiple
                    value={impactFilter}
                    onChange={handleImpactChange}
                    renderValue={(selected) => {
                      if (selected.includes('All')) return 'All';
                      return selected.map(item => impactDisplay[impactLabels.indexOf(item)]).join(', ');
                    }}
                    displayEmpty
                  >
                    <MenuItem value="All">
                      <Checkbox checked={impactFilter.includes('All')} />
                      <ListItemText primary="All" />
                    </MenuItem>
                    {impactLabels.map((impact, index) => (
                      <MenuItem key={impact} value={impact}>
                        <Checkbox checked={impactFilter.includes(impact)} />
                        <ListItemText primary={impactDisplay[index]} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" color="textSecondary" style={{ marginBottom: '0.5rem' }}>
                  Likelihood
                </Typography>
                <FormControl style={{ minWidth: 200 }}>
                  <Select
                    multiple
                    value={likelihoodFilter}
                    onChange={handleLikelihoodChange}
                    renderValue={(selected) => {
                      if (selected.includes('All')) return 'All';
                      return selected.map(item => likelihoodDisplay[likelihoodLabels.indexOf(item)]).join(', ');
                    }}
                    displayEmpty
                  >
                    <MenuItem value="All">
                      <Checkbox checked={likelihoodFilter.includes('All')} />
                      <ListItemText primary="All" />
                    </MenuItem>
                    {likelihoodLabels.map((likelihood, index) => (
                      <MenuItem key={likelihood} value={likelihood}>
                        <Checkbox checked={likelihoodFilter.includes(likelihood)} />
                        <ListItemText primary={likelihoodDisplay[index]} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

                             <div style={{ display: 'flex', flexDirection: 'column' }}>
                 <Typography variant="subtitle2" color="textSecondary" style={{ marginBottom: '0.5rem' }}>
                   Risk
                 </Typography>
                <FormControl style={{ minWidth: 300 }}>
                  <Select
                    value={selectedRisk}
                    onChange={handleRiskChange}
                    disabled={filteredRisks.length === 0}
                    displayEmpty
                  >
                    {filteredRisks.map((risk) => (
                      <MenuItem key={risk.number} value={`${risk.number} - ${risk.name}`}>
                        {risk.number} - {risk.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            {selectedRiskData && (
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Risk #{selectedRiskData.number}: {selectedRiskData.name}
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Description
                      </Typography>
                      <Typography variant="body1" color="textPrimary" style={{ lineHeight: 1.6 }}>
                        {selectedRiskData.description}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Divider style={{ margin: '1rem 0' }} />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Basic Information
                      </Typography>
                      <Box mb={2}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Owner Name
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                          {getOwnerName(selectedRiskData.ownerId)}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Risk Assessment
                      </Typography>
                      <Box mb={2}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Likelihood
                        </Typography>
                        <Chip 
                          label={likelihoodDisplay[likelihoodLabels.indexOf(selectedRiskData.likelihood)]}
                          variant="outlined"
                          style={{ backgroundColor: '#f3f4f6', borderColor: '#9ca3af' }}
                        />
                      </Box>
                      <Box mb={2}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Impact
                        </Typography>
                        <Chip 
                          label={impactDisplay[impactLabels.indexOf(selectedRiskData.impact)]}
                          variant="outlined"
                          style={{ backgroundColor: '#f3f4f6', borderColor: '#9ca3af' }}
                        />
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Divider style={{ margin: '1rem 0' }} />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Status
                      </Typography>
                      <Box mb={2}>
                        <Typography variant="subtitle2" color="textSecondary">
                          State
                        </Typography>
                        <Chip 
                          label={stateDisplay[selectedRiskData.state]}
                          variant="outlined"
                          style={{ backgroundColor: '#f3f4f6', borderColor: '#9ca3af' }}
                        />
                      </Box>
                      <Box mb={2}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Resolution
                        </Typography>
                        <Chip 
                          label={resolutionDisplay[selectedRiskData.resolution]}
                          variant="outlined"
                          style={{ backgroundColor: '#f3f4f6', borderColor: '#9ca3af' }}
                        />
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Mitigations
                      </Typography>
                      {selectedRiskData.mitigations.length > 0 ? (
                        <List dense>
                          {selectedRiskData.mitigations.map((mitigation, index) => (
                            <ListItem key={index} style={{ padding: '0.25rem 0' }}>
                              <ListItemIcon style={{ minWidth: '1.5rem' }}>
                                <FiberManualRecordIcon style={{ fontSize: '0.5rem', color: '#6b7280' }} />
                              </ListItemIcon>
                              <MuiListItemText 
                                primary={mitigation}
                                primaryTypographyProps={{ 
                                  variant: 'body2',
                                  color: 'textPrimary'
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No mitigations defined
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

RiskMatrix.propTypes = {
  data: PropTypes.shape({
    riskMatrixId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    risks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        ownerId: PropTypes.string.isRequired,
        likelihood: PropTypes.oneOf(likelihoodLabels).isRequired,
        impact: PropTypes.oneOf(impactLabels).isRequired,
        state: PropTypes.oneOf(['DRAFT', 'OPEN', 'CLOSED']).isRequired,
        resolution: PropTypes.oneOf(['ACCEPTED', 'PARTIALLY_MITIGATED', 'FULLY_MITIGATED', 'NON_ISSUE']).isRequired,
        mitigations: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default RiskMatrix;
