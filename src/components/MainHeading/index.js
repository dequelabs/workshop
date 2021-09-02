import React from 'react';
import PropTypes from 'prop-types';

const MainHeading = ({ children, ...other }) => (
  <div className="App__head">
    <div className="confined">
      <h1 id="main-heading" {...other}>
        {children}
      </h1>
    </div>
  </div>
);

MainHeading.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainHeading;
