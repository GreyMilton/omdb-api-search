import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchYearFilter from '../src/components/SearchYearFilter.vue';

describe('SearchYearFilter.vue', () => {
  const wrapper = mount(SearchYearFilter, {
    props: {
      year: '1999',
      enabled: true,
    },
  });

  const currentYear = new Date().getFullYear();

  it('renders html elements correctly', () => {
    const enableCheckboxLabel = wrapper.find('label[for="enable-year"]');
    expect(enableCheckboxLabel.exists()).toBe(true);
    expect(enableCheckboxLabel.text()).toBe('enable');

    const enableCheckbox = wrapper.find('input[type="checkbox"]');
    expect(enableCheckbox.exists()).toBe(true);
    expect(enableCheckbox.element.value).toBe('on');

    const yearLabel = wrapper.find('label[for="year-input"]');
    expect(yearLabel.exists()).toBe(true);
    expect(yearLabel.text()).toBe('Year');

    const yearInput = wrapper.find('input[type="range"]');
    expect(yearInput.exists()).toBe(true);
    expect(yearInput.attributes('min')).toBe('1900');
    expect(yearInput.attributes('max')).toBe(currentYear.toString());
    expect(yearInput.element.value).toBe('1999');

    const yearDisplay = wrapper.find('p');
    expect(yearDisplay.text()).toBe('1999');
  });

  it('correctly changes the year model value on selection', () => {
    expect(wrapper.vm.year).toBe('1999');

    wrapper
      .find('input[type="range"]')
      .setValue('2000')
      .then(() => {
        expect(wrapper.vm.year).toBe('2000');
      });
  });
});
