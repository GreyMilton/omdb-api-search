import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchBar from '../src/components/SearchBar.vue';
import SearchInput from '../src/components/SearchInput.vue';
import SearchTypeFilter from '../src/components/SearchTypeFilter.vue';
import SearchYearFilter from '../src/components/SearchYearFilter.vue';

describe('SearchBar.vue', () => {
  const expectedTypes = [
    { value: '', label: 'any' },
    { value: 'movie', label: 'movies' },
    { value: 'series', label: 'series' },
    { value: 'episode', label: 'episodes' },
  ];

  const currentYear = new Date().getFullYear() + '';

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

  it('passes the correct types to SearchTypeFilter.vue', () => {
    const typeFilter = createWrapper().findComponent(SearchTypeFilter);

    expect(typeFilter.props('types')).toEqual(expectedTypes);
  });

  it('correctly assigns type ref to v-model on SearchTypeFilter.vue', () => {
    const wrapper = createWrapper();
    const typeFilter = wrapper.findComponent(SearchTypeFilter);

    expect(wrapper.vm.type).toBe('');

    typeFilter.setValue(expectedTypes[1].value).then(() => {
      expect(wrapper.vm.type).toBe(expectedTypes[1].value);
    });
  });

  it('correctly assigns yearEnabled ref to v-model on SearchYearFilter.vue', () => {
    const wrapper = createWrapper();
    const checkbox = wrapper.find('input[type="checkbox"]');

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

  it('correctly assigns year ref to v-model on SearchYearFilter.vue', () => {
    const wrapper = createWrapper();
    const checkbox = wrapper.find('input[type="checkbox"]');
    const yearInput = wrapper.find('input[type="range"]');

    expect(wrapper.vm.year).toBe(currentYear);

    checkbox
      .setValue(true)
      .then(() => {
        yearInput.setValue('1999');
      })
      .then(() => {
        expect(wrapper.vm.year).toBe('1999');
      });
  });

  it('emits correct search event when search input changes', () => {
    const wrapper = createWrapper();
    const searchInput = wrapper.findComponent(SearchInput);

    searchInput.setValue('Star wars').then(() => {
      expect(wrapper.emitted().search[0]).toEqual(['Star wars', '', '']);
    });
  });

  it('emits no search event when type filter changes and search input has no text', () => {
    const wrapper = createWrapper();
    const typeFilter = wrapper.findComponent(SearchTypeFilter);

    typeFilter.setValue(expectedTypes[2].value).then(() => {
      expect(wrapper.emitted()).not.toHaveProperty('search');
    });
  });

  it('emits correct search event when type filter changes and search input has text', () => {
    const wrapper = createWrapper();
    const searchInput = wrapper.findComponent(SearchInput);
    const typeFilter = wrapper.findComponent(SearchTypeFilter);

    searchInput
      .setValue('Star trek')
      .then(() => {
        typeFilter.setValue(expectedTypes[2].value);
      })
      .then(() => {
        expect(wrapper.emitted().search[1]).toEqual([
          'Star trek',
          expectedTypes[2].value,
          '',
        ]);
      });
  });

  it('emits no search event when year filter changes and search input has no text', () => {
    const wrapper = createWrapper();
    const checkbox = wrapper.find('input[type="checkbox"]');
    const yearInput = wrapper.find('input[type="range"]');

    checkbox
      .setValue(true)
      .then(() => {
        yearInput.setValue('1999');
      })
      .then(() => {
        expect(wrapper.emitted()).not.toHaveProperty('search');
      });
  });

  it('emits correct search event when year filter changes and search input has text', () => {
    const wrapper = createWrapper();
    const checkbox = wrapper.find('input[type="checkbox"]');
    const yearInput = wrapper.find('input[type="range"]');
    const searchInput = wrapper.findComponent(SearchInput);

    searchInput
      .setValue('Star trek')
      .then(() => {
        checkbox.setValue(true);
      })
      .then(() => {
        yearInput.setValue('1999');
      })
      .then(() => {
        expect(wrapper.emitted().search[2]).toEqual(['Star trek', '', '1999']);
      });
  });
});
