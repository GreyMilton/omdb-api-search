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

  it('computes watchlistIds correctly', () => {
    const wrapper = createWrapper();

    const movies = [
      {
        Title: 'Star Wars: Episode IV - A New Hope',
        Year: '1977',
        imdbID: 'tt0076759',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg',
      },
      {
        Title: 'Star Wars: Episode V - The Empire Strikes Back',
        Year: '1980',
        imdbID: 'tt0080684',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
      },
      {
        Title: 'Star Wars: Episode VI - Return of the Jedi',
        Year: '1983',
        imdbID: 'tt0086190',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
      },
    ];

    wrapper.vm.watchlist = movies;

    expect(wrapper.vm.watchlistIds).toEqual([
      movies[0].imdbID,
      movies[1].imdbID,
      movies[2].imdbID,
    ]);
  });

  it('computes resultsRemaining correctly', () => {
    const wrapper = createWrapper();
    wrapper.vm.totalResults = 13;
    wrapper.vm.searchResults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    expect(wrapper.vm.resultsRemaining).toBe(3);
  });

  it('correctly shows load more button', () => {
    const wrapper = createWrapper();

    new Promise((resolve) => {
      wrapper.vm.totalResults = 13;
      wrapper.vm.showWatchlist = false;
      wrapper.vm.searchResults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      resolve();
    }).then(() => {
      const loadMoreButton = wrapper
        .findAll('button[type="button"]')
        .filter((button) => button.text() === 'Load more...')[0];

      expect(loadMoreButton.text()).toBe('Load more...');
    });
  });
});
