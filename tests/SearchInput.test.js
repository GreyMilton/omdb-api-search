import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchInput from '../src/components/SearchInput.vue'; // Adjust the path as necessary
import CrossIcon from '../src/components/icons/CrossIcon.vue';
import MagnifyingGlass from '../src/components/icons/MagnifyingGlass.vue';

describe('SearchInput.vue', () => {
  const wrapper = mount(SearchInput, {
    props: { modelValue: '' },
    global: {
      components: { CrossIcon, MagnifyingGlass },
    },
  });

  const input = wrapper.find('input#search-input');
  const magnifyingGlassIcon = wrapper.findComponent(MagnifyingGlass);
  const clearButton = wrapper.find('button[aria-label="Clear search"]');

  it('renders correctly with all elements', () => {
    expect(input.exists()).toBe(true);
    expect(input.attributes('aria-label')).toBe('Search');
    expect(magnifyingGlassIcon.exists()).toBe(true);
    expect(clearButton.exists()).toBe(true);
    expect(clearButton.classes()).toContain('pointer-events-none');
    expect(clearButton.classes()).toContain('invisible');
  });

  it('displays the clear button when input has text', () => {
    wrapper
      .find('input#search-input')
      .setValue('Star wars')
      .then(() => {
        expect(wrapper.vm.showClear).toBe(true);
        expect(clearButton.classes()).not.toContain('pointer-events-none');
        expect(clearButton.classes()).not.toContain('invisible');
      });
  });

  it('hides the clear button and clears input when clear button is clicked', () => {
    input
      .setValue('Star wars')
      .then(() => {
        expect(wrapper.vm.model).toBe('Star wars');
      })
      .then(() => {
        clearButton.trigger('click');
      })
      .then(() => {
        expect(wrapper.vm.model).toBe('');
        expect(wrapper.vm.showClear).toBe(false);
        expect(clearButton.classes()).toContain('pointer-events-none');
        expect(clearButton.classes()).toContain('invisible');
      });
  });

  it('model correctly binds to input field', () => {
    wrapper.vm.model = 'Star wars';
    wrapper.vm
      .$nextTick()
      .then(() => {
        expect(input.element.value).toBe('Star wars');
      })
      .then(() => {
        input.setValue('Star trek');
      })
      .then(() => {
        expect(wrapper.vm.model).toBe('Star trek');
      });
  });
});
