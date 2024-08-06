import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchYearFilter from '../src/components/SearchYearFilter.vue';

describe('SearchYearFilter.vue', () => {
  function createWrapper(year, enabled) {
    return mount(SearchYearFilter, {
      props: { year, enabled },
    });
  }
  const currentYear = new Date().getFullYear();

  describe('enabled', () => {
    it('renders html elements correctly', () => {
      const wrapper = createWrapper('1999', true);
      const checkboxLabel = wrapper.find('label[for="enable-year"]');
      const checkbox = wrapper.find('input[type="checkbox"]');
      const yearLabel = wrapper.find('label[for="year-input"]');
      const yearInput = wrapper.find('input[type="range"]');
      const yearDisplay = wrapper.find('p');

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
      const wrapper = createWrapper('1999', true);
      const yearInput = wrapper.find('input[type="range"]');

      expect(wrapper.vm.year).toBe('1999');

      yearInput.setValue('2000').then(() => {
        expect(wrapper.vm.year).toBe('2000');
      });
    });

    it('cannot select a year after the current year', () => {
      const wrapper = createWrapper('1999', true);
      const yearInput = wrapper.find('input[type="range"]');
      const nextYear = currentYear + 1;

      expect(wrapper.vm.year).toBe('1999');

      yearInput.setValue(nextYear + '').then(() => {
        expect(wrapper.vm.year).toBe(currentYear + '');
      });
    });

    it('cannot select a year before 1900', () => {
      const wrapper = createWrapper('1999', true);
      const yearInput = wrapper.find('input[type="range"]');

      expect(wrapper.vm.year).toBe('1999');

      yearInput.setValue('1899').then(() => {
        expect(wrapper.vm.year).toBe('1900');
      });
    });
  });

  describe('disabled', () => {
    it('renders html elements correctly', () => {
      const wrapper = createWrapper('1999', false);
      const checkboxLabel = wrapper.find('label[for="enable-year"]');
      const checkbox = wrapper.find('input[type="checkbox"]');
      const yearLabel = wrapper.find('label[for="year-input"]');
      const yearInput = wrapper.find('input[type="range"]');
      const yearDisplay = wrapper.find('p');

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
      const wrapper = createWrapper('1999', false);
      const yearInput = wrapper.find('input[type="range"]');

      expect(wrapper.vm.year).toBe('1999');

      yearInput.setValue('2000').then(() => {
        expect(wrapper.vm.year).toBe('1999');
      });
    });
  });

  it('correctly toggles the enabled model value when checkbox value changes', () => {
    const wrapper = createWrapper('1999', true);
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
