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
});
