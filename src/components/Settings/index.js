import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainHeading from '../MainHeading';
import './index.css';

const CHECK_MARK = '\u2713';

const Checkbox = ({ onClick, label, checked }) => {
  const onCheckboxKeydown = e => {
    if (e.key !== ' ') {
      return;
    }

    e.preventDefault(); // don't scroll the page!
    onClick();
  };

  return (
    <div className="Field">
      <div
        className="Checkbox"
        role="checkbox"
        aria-checked={false}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onCheckboxKeydown}
      >
        {checked ? CHECK_MARK : ''}
      </div>
      {/* eslint-disable-next-line */}
      <div className="Label" onClick={onClick}>
        {label}
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired
};

const Settings = () => {
  const [eggsChecked, setEggsChecked] = useState(false);
  const [peanutsChecked, setPeanutsChecked] = useState(false);
  const [artichokesChecked, setArtichokesChecked] = useState(false);
  const [collectChecked, setCollectChecked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const checkboxChangeFactory = food => () => {
    switch (food) {
      case 'eggs':
        return setEggsChecked(!eggsChecked);
      case 'peanuts':
        return setPeanutsChecked(!peanutsChecked);
      case 'artichokes':
        return setArtichokesChecked(!artichokesChecked);
      case 'collect':
        return setCollectChecked(!collectChecked);
    }
  };

  const onAdvancedSettingsClick = () => setExpanded(!expanded);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <MainHeading>Settings</MainHeading>
      <div className="confined">
        <h2>Food allergies</h2>
        <Checkbox
          label="Eggs"
          onClick={checkboxChangeFactory('eggs')}
          checked={eggsChecked}
        />
        <Checkbox
          label="Peanuts"
          onClick={checkboxChangeFactory('peanuts')}
          checked={peanutsChecked}
        />
        <Checkbox
          label="Artichokes"
          onClick={checkboxChangeFactory('artichokes')}
          checked={artichokesChecked}
        />
        <div className="Expandy">
          <button
            aria-controls="advanced-settings"
            className="Expandy__head"
            onClick={onAdvancedSettingsClick}
          >
            Advanced Settings
            <span className="Expandy__arrow">
              {expanded ? <span>&#8673;</span> : <span>&#8675;</span>}
            </span>
          </button>
          {expanded && (
            <div id="advanced-settings">
              <Checkbox
                label="Collect food usage data"
                onClick={checkboxChangeFactory('collect')}
                checked={collectChecked}
              />
            </div>
          )}
        </div>
        <button type="submit" className="SettingsSubmit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Settings;
