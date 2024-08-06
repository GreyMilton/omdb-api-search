import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchYearFilter from '../src/components/SearchYearFilter.vue';

describe('SearchYearFilter.vue', () => {
  describe('enabled', () => {
    const wrapper = mount(SearchYearFilter, {
      props: {
        year: '1999',
        enabled: true,
      },
    });
    const currentYear = new Date().getFullYear();
    const checkboxLabel = wrapper.find('label[for="enable-year"]');
    const checkbox = wrapper.find('input[type="checkbox"]');
    const yearLabel = wrapper.find('label[for="year-input"]');
    const yearInput = wrapper.find('input[type="range"]');
    const yearDisplay = wrapper.find('p');

    it('renders html elements correctly', () => {
      expect(checkboxLabel.exists()).toBe(true);
      expect(checkboxLabel.text()).toBe('enable');

      expect(checkbox.exists()).toBe(true);
      expect(checkbox.element.checked).toBe(true);

      expect(yearLabel.exists()).toBe(true);
      expect(yearLabel.text()).toBe('Year');

      expect(yearInput.exists()).toBe(true);
      expect(yearInput.attributes('min')).toBe('1900');
      expect(yearInput.attributes('max')).toBe(currentYear.toString());
      expect(yearInput.element.value).toBe('1999');

      expect(yearDisplay.text()).toBe('1999');
    });

    it('correctly changes the year model value on selection', () => {
      expect(wrapper.vm.year).toBe('1999');

      yearInput.setValue('2000').then(() => {
        expect(wrapper.vm.year).toBe('2000');
      });
    });
  });

  describe('disabled', () => {
    const wrapper = mount(SearchYearFilter, {
      props: {
        year: '1999',
        enabled: false,
      },
    });
    const currentYear = new Date().getFullYear();
    const checkboxLabel = wrapper.find('label[for="enable-year"]');
    const checkbox = wrapper.find('input[type="checkbox"]');
    const yearLabel = wrapper.find('label[for="year-input"]');
    const yearInput = wrapper.find('input[type="range"]');
    const yearDisplay = wrapper.find('p');

    it('renders html elements correctly', () => {
      expect(checkboxLabel.exists()).toBe(true);
      expect(checkboxLabel.text()).toBe('enable');

      expect(checkbox.exists()).toBe(true);
      expect(checkbox.element.checked).toBe(false);

      expect(yearLabel.exists()).toBe(true);
      expect(yearLabel.text()).toBe('Year');

      expect(yearInput.exists()).toBe(true);
      expect(yearInput.attributes('min')).toBe('1900');
      expect(yearInput.attributes('max')).toBe(currentYear.toString());
      expect(yearInput.element.value).toBe('1999');

      expect(yearDisplay.text()).toBe('1999');
    });

    it('cannot change the year model value on selection', () => {
      expect(wrapper.vm.year).toBe('1999');

      yearInput.setValue('2000').then(() => {
        expect(wrapper.vm.year).toBe('1999');
      });
    });
  });

  it('correctly toggles the enabled model value when checkbox value changes', () => {
    const wrapper = mount(SearchYearFilter, {
      props: {
        year: '1999',
        enabled: true,
      },
    });
    const checkbox = wrapper.find('input[type="checkbox"]');

    expect(wrapper.vm.enabled).toBe(true);
    expect(checkbox.element.checked).toBe(true);

    checkbox
      .setValue(false)
      .then(() => {
        expect(wrapper.vm.enabled).toBe(false);
        expect(checkbox.element.checked).toBe(false);

        checkbox.setValue(true);
      })
      .then(() => {
        expect(wrapper.vm.enabled).toBe(true);
        expect(checkbox.element.checked).toBe(true);
      });
  });
});
