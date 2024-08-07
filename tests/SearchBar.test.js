import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchBar from '../src/components/SearchBar.vue';
import SearchInput from '../src/components/SearchInput.vue';
import SearchTypeFilter from '../src/components/SearchTypeFilter.vue';
import SearchYearFilter from '../src/components/SearchYearFilter.vue';

describe('SearchBar.vue', () => {
  function createWrapper() {
    return mount(SearchBar, {
      global: {
        components: { SearchInput, SearchTypeFilter, SearchYearFilter },
      },
    });
  }

  it('renders child components', () => {
    const wrapper = createWrapper();

    expect(wrapper.findComponent(SearchInput).exists()).toBe(true);
    expect(wrapper.findComponent(SearchTypeFilter).exists()).toBe(true);
    expect(wrapper.findComponent(SearchYearFilter).exists()).toBe(true);
  });

  it('correctly assigns search ref to v-model on SearchInput.vue', () => {
    const wrapper = createWrapper();
    wrapper
      .findComponent(SearchInput)
      .setValue('Star wars')
      .then(() => {
        expect(wrapper.vm.search).toBe('Star wars');
      });
  });

  it('passes the correct types and correctly assigns type ref to v-model on SearchTypeFilter.vue', () => {
    const wrapper = createWrapper();
    const typeFilter = wrapper.findComponent(SearchTypeFilter);
    const expectedTypes = [
      { value: '', label: 'any' },
      { value: 'movie', label: 'movies' },
      { value: 'series', label: 'series' },
      { value: 'episode', label: 'episodes' },
    ];

    expect(typeFilter.props('types')).toEqual(expectedTypes);

    expect(wrapper.vm.type).toBe('');

    typeFilter.setValue(expectedTypes[1].value).then(() => {
      expect(wrapper.vm.type).toBe(expectedTypes[1].value);
    });
  });

  it('correctly assigns yearEnabled ref to v-model on SearchYearFilter.vue', () => {
    const wrapper = createWrapper();
    const checkbox = wrapper
      .findComponent(SearchYearFilter)
      .find('input[type="checkbox"]');

    expect(wrapper.vm.yearEnabled).toBe(false);

    checkbox
      .setValue(true)
      .then(() => {
        expect(wrapper.vm.yearEnabled).toBe(true);

        checkbox.setValue(false);
      })
      .then(() => {
        expect(wrapper.vm.yearEnabled).toBe(false);
      });
  });
});
