import React from 'react';
import PropTypes from 'prop-types';
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

function countRisks(risks, likelihood, impact) {
  return risks.filter(r => r.likelihood === likelihood && r.impact === impact).length;
}

const RiskMatrix = ({ data }) => {
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
                    {impactLabels.map((impact, j) => (
                      <td key={impact} className={`risk-cell risk-cell-${likelihood.toLowerCase()}-${impact.toLowerCase()}`}> 
                        {countRisks(data.risks, likelihood, impact)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
