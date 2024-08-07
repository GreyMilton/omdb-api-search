import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchTypeFilter from '@/components/SearchTypeFilter.vue';

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

  function createWrapper(types, modelValue) {
    return mount(SearchTypeFilter, {
      props: { types, modelValue },
    });
  }

  it('renders a radio button for each type', () => {
    const wrapper = createWrapper(types, types[0].value);
    const radioButtons = wrapper.findAll('input[type="radio"]');

    expect(radioButtons.length).toBe(types.length);

    types.forEach((type, index) => {
      const radioButton = radioButtons[index];
      const label = wrapper.find(`label[for="type-${index}"]`);

      expect(radioButton.attributes('value')).toBe(type.value);
      expect(label.text()).toBe(type.label);
    });
  });

  it('correctly changes the model value on type selection', () => {
    const wrapper = createWrapper(types, types[0].value);

    expect(wrapper.vm.model).toBe(types[0].value);

    wrapper
      .find(`input[type="radio"][value="${types[1].value}"]`)
      .setValue(types[1].value)
      .then(() => {
        expect(wrapper.vm.model).toBe(types[1].value);
      });
  });

  it('has the correct label for each radio button', () => {
    const wrapper = createWrapper(types, types[0].value);

    types.forEach((type, index) => {
      const label = wrapper.find(`label[for="type-${index}"]`);
      const radioButton = wrapper.find(`input[type="radio"]#type-${index}`);

      expect(label.exists()).toBe(true);
      expect(label.text()).toBe(type.label);
      expect(radioButton.exists()).toBe(true);
      expect(radioButton.attributes('id')).toBe(label.attributes('for'));
    });
  });
});
