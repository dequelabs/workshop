import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const monthMap = {
  11: 'nov',
  12: 'dec',
  1: 'jan',
  2: 'feb',
  3: 'mar',
  4: 'apr'
};
const Histogram = ({ data }) => (
  <ul
    className="Stat__value-histogram"
    aria-label="6 month average yumminess breakdown"
  >
    {data.map(breakdown => (
      <li
        key={breakdown.month}
        aria-label={`${breakdown.average} average in ${
          monthMap[breakdown.month]
        }`}
      >
        <div
          style={{
            height: `${breakdown.average}px`
          }}
          aria-hidden="true"
        >
          <span>{breakdown.average}</span>
        </div>
        <div className="Stat__value-histogram-month" aria-hidden="true">
          {monthMap[breakdown.month]}
        </div>
      </li>
    ))}
  </ul>
);

Histogram.propTypes = {
  data: PropTypes.array.isRequired
};
export default Histogram;
