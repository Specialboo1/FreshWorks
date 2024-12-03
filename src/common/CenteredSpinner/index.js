import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import './styles.scss';

const CenteredSpinner = ({ size, ...rest }) => (
  <div className="spinner-container">
    <Spin size={size} {...rest} />
  </div>
);

export default CenteredSpinner;

CenteredSpinner.propTypes = {
  size: PropTypes.string,
};
