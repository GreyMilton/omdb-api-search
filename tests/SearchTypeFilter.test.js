import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchTypeFilter from '../src/components/SearchTypeFilter.vue';

describe('SearchTypeFilter.vue', () => {
  const types = [
    {
      value: '',
      label: 'any',
    },
    {
      value: 'movie',
      label: 'movies',
    },
    {
      value: 'series',
      label: 'series',
    },
    {
      value: 'episode',
      label: 'episodes',
    },
  ];

  const wrapper = mount(SearchTypeFilter, {
    props: { types },
    modelValue: '',
  });

  it('renders a radio button for each type', () => {
    const radioButtons = wrapper.findAll('input[type="radio"]');
    expect(radioButtons.length).toBe(types.length);

    types.forEach((type, index) => {
      const radioButton = radioButtons[index];
      const label = wrapper.find(`label[for="type-${index}"]`);

      expect(radioButton.attributes('value')).toBe(type.value);
      expect(label.text()).toBe(type.label);
    });
  });
});
