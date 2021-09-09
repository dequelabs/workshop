import React from 'react';
import { mount } from 'enzyme';
import axe from '../../../test-utils/axe';
import Settings from './';

describe('Settings component', () => {
  let wrapper;

  afterEach(async () => {
    if (!wrapper) {
      return;
    }

    const results = await axe(wrapper.getDOMNode());
    expect(results).toHaveNoViolations();
  });

  test('renders the expected settings UI', () => {
    wrapper = mount(<Settings />);

    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    expect(wrapper.find('Checkbox').length).toBe(3);
    expect(wrapper.find('Checkbox[label="Eggs"]').exists()).toBe(true);
    expect(wrapper.find('Checkbox[label="Peanuts"]').exists()).toBe(true);
    expect(wrapper.find('Checkbox[label="Artichokes"]').exists()).toBe(true);
    expect(
      wrapper.find('button[aria-controls="advanced-settings"]').exists()
    ).toBe(true);
  });

  describe('advanced settings', () => {
    test('clicking trigger expands the advanced settings', () => {
      wrapper = mount(<Settings />);

      expect(wrapper.find('#advanced-settings Checkbox').exists()).toBe(false);

      wrapper
        .find('button[aria-controls="advanced-settings"]')
        .simulate('click');
      wrapper.update();

      expect(wrapper.find('#advanced-settings Checkbox').exists()).toBe(true);
      expect(
        wrapper.find('Checkbox[label="Collect food usage data"]').exists()
      ).toBe(true);
    });
  });

  describe('Custom checkboxes', () => {
    test('are focusable with expected role of "checkbox"', () => {
      wrapper = mount(<Settings />);
      // expand the advanced settings...
      wrapper
        .find('button[aria-controls="advanced-settings"]')
        .simulate('click');

      const checkboxes = wrapper.find('Checkbox');
      expect(checkboxes.length).toBe(4);
      expect(
        checkboxes.filterWhere(checkbox => {
          return checkbox.find('[role="checkbox"]').getDOMNode().tabIndex === 0;
        }).length
      ).toBe(4);
    });

    test('set aria-checked attribute', () => {
      wrapper = mount(<Settings />);

      expect(
        wrapper
          .find('[role="checkbox"]')
          .at(0)
          .prop('aria-checked')
      ).toBe(false);
    });

    test('properly toggle checked state when clicked', () => {
      wrapper = mount(<Settings />);
      const checkbox = wrapper.find('[role="checkbox"]').at(0);

      expect(checkbox.text()).toBe('');

      checkbox.simulate('click');
      wrapper.update();

      expect(checkbox.text()).toBe('✓');
    });

    test('properly toggle checked state with space bar keydown', () => {
      wrapper = mount(<Settings />);
      const checkbox = wrapper.find('[role="checkbox"]').at(0);

      expect(checkbox.text()).toBe('');

      checkbox.simulate('keydown', {
        key: ' '
      });
      wrapper.update();

      expect(checkbox.text()).toBe('✓');
    });

    test('properly toggle checked state when label is clicked', () => {
      wrapper = mount(<Settings />);
      const checkbox = wrapper.find('[role="checkbox"]').at(0);
      const label = wrapper.find('.Label').at(0);

      expect(checkbox.text()).toBe('');

      label.simulate('click');
      wrapper.update();

      expect(checkbox.text()).toBe('✓');
    });
  });
});
