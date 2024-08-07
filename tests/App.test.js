import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import App from '@/App.vue';
import SearchBar from '@/components/SearchBar.vue';
import StatusBar from '@/components/StatusBar.vue';
import MovieDetails from '@/components/MovieDetails.vue';
import MovieList from '@/components/MovieList.vue';

describe('App.vue', () => {
  function createWrapper() {
    return mount(App, {
      global: {
        components: { SearchBar, StatusBar, MovieDetails, MovieList },
      },
    });
  }

  it('renders the header with the correct app name', () => {
    const appName = import.meta.env.VITE_APP_NAME;
    const header = createWrapper().find('h1');

    expect(header.text()).toBe(appName);
  });

  it('renders child components', () => {
    const wrapper = createWrapper();

    expect(wrapper.findComponent(SearchBar).exists()).toBe(true);
    expect(wrapper.findComponent(StatusBar).exists()).toBe(true);
    expect(wrapper.findComponent(MovieList).exists()).toBe(true);
  });

  it('does not render MovieDetails component when showMovieDetails is false', () => {
    const wrapper = createWrapper();

    expect(wrapper.vm.showMovieDetails).toBe(false);
    expect(wrapper.findComponent(MovieDetails).exists()).toBe(false);
  });

  it('renders MovieDetails component when showMovieDetails is true', () => {
    const wrapper = createWrapper();

    new Promise((resolve) => {
      resolve((wrapper.vm.showMovieDetails = true));
    }).then(() => {
      expect(wrapper.findComponent(MovieDetails).exists()).toBe(true);
    });
  });
});
