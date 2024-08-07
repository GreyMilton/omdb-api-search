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
});
