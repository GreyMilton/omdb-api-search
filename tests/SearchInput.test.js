import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchInput from '../src/components/SearchInput.vue';
import CrossIcon from '../src/components/icons/CrossIcon.vue';
import MagnifyingGlass from '../src/components/icons/MagnifyingGlass.vue';

describe('SearchInput.vue', () => {
  it('renders correctly with all elements', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
      global: {
        components: { CrossIcon, MagnifyingGlass },
      },
    });

    const input = wrapper.find('input#search-input');
    const magnifyingGlassIcon = wrapper.findComponent(MagnifyingGlass);
    const clearButton = wrapper.find('button[aria-label="Clear search"]');
    const buttonClasses = clearButton.classes();

    expect(input.exists()).toBe(true);
    expect(input.attributes('aria-label')).toBe('Search');
    expect(magnifyingGlassIcon.exists()).toBe(true);
    expect(clearButton.exists()).toBe(true);
    expect(buttonClasses).toContain('pointer-events-none');
    expect(buttonClasses).toContain('invisible');
  });

  it('displays the clear button when input has text', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
      global: {
        components: { CrossIcon, MagnifyingGlass },
      },
    });
    const input = wrapper.find('input#search-input');
    const clearButton = wrapper.find('button[aria-label="Clear search"]');

    const initialClasses = clearButton.classes();
    expect(initialClasses).toContain('pointer-events-none');
    expect(initialClasses).toContain('invisible');

    input.setValue('Star wars').then(() => {
      const newClasses = clearButton.classes();
      expect(newClasses).not.toContain('pointer-events-none');
      expect(newClasses).not.toContain('invisible');
    });
  });

  it('clears input and hides the clear button when the clear button is clicked', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
      global: {
        components: { CrossIcon, MagnifyingGlass },
      },
    });

    const input = wrapper.find('input#search-input');
    const clearButton = wrapper.find('button[aria-label="Clear search"]');

    input
      .setValue('Star wars')
      .then(() => {
        expect(input.element.value).toBe('Star wars');

        const buttonClasses = clearButton.classes();
        expect(buttonClasses).not.toContain('pointer-events-none');
        expect(buttonClasses).not.toContain('invisible');

        clearButton.trigger('click');
      })
      .then(() => {
        expect(input.element.value).toBe('');

        const buttonClasses = clearButton.classes();
        expect(buttonClasses).toContain('pointer-events-none');
        expect(buttonClasses).toContain('invisible');
      });
  });

  it('correctly binds model value to input field', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
      global: {
        components: { CrossIcon, MagnifyingGlass },
      },
    });
    const input = wrapper.find('input#search-input');

    expect(wrapper.vm.model).toBe('');
    expect(input.element.value).toBe('');

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
