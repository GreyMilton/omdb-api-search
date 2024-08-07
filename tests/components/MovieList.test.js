import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import MovieList from '@/components/MovieList.vue';
import BookmarkIcon from '@/components/icons/BookmarkIcon.vue';

describe('MovieList.vue', () => {
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

  const selectedMovie = movies[0];
  const movieOnWatchlist = movies[1];
  const otherMovie = movies[2];

  const watchlistIds = [movieOnWatchlist.imdbID];

  function createWrapper(movies, selectedMovieId, watchlistIds) {
    return mount(MovieList, {
      props: { movies, selectedMovieId, watchlistIds },
      global: {
        components: { BookmarkIcon },
      },
    });
  }

  it('renders the list correctly when it has movies', () => {
    const wrapper = createWrapper(movies, selectedMovie.imdbID, watchlistIds);
    const imgs = wrapper.findAll('img');
    const h1s = wrapper.findAll('h1');
    const ps = wrapper.findAll('p');

    expect(wrapper.findAll('li')).toHaveLength(movies.length);

    movies.forEach((movie, index) => {
      expect(imgs[index].attributes('src')).toBe(movie.Poster);
      expect(h1s[index].text()).toBe(movie.Title);
      expect(ps[index].text()).toBe(movie.Year);
    });

    const svgs = wrapper.findAll('svg');
    expect(svgs).toHaveLength(1);

    const svg = svgs[0];
    expect(svg.classes()).toContain('fill-yellow-500');
    expect(svg.attributes('id')).toBe(
      'watchlist-icon-' + movieOnWatchlist.imdbID,
    );
  });

  it('displays no <li>s when there are no movies', () => {
    const wrapper = createWrapper(movies, selectedMovie.imdbID, watchlistIds);

    wrapper.vm.movies = [];
    expect(wrapper.findAll('li')).not.toHaveLength();
  });

  it('applies light grey background to the selected movie', () => {
    const wrapper = createWrapper(movies, selectedMovie.imdbID, watchlistIds);

    const selectedMovieButton = wrapper.find(
      `button[aria-label="Select ${selectedMovie.Title}"]`,
    );
    const movieOnWatchlistButton = wrapper.find(
      `button[aria-label="Select ${otherMovie.Title}"]`,
    );
    const otherMovieButton = wrapper.find(
      `button[aria-label="Select ${otherMovie.Title}"]`,
    );

    expect(selectedMovieButton.classes()).toContain('bg-zinc-100');
    expect(movieOnWatchlistButton.classes()).not.toContain('bg-zinc-100');
    expect(otherMovieButton.classes()).not.toContain('bg-zinc-100');
  });

  it('emits the selection event with correct IMDb ID when a movie is clicked', () => {
    const wrapper = createWrapper(movies, selectedMovie.imdbID, watchlistIds);

    const otherMovieButton = wrapper.find(
      `button[aria-label="Select ${otherMovie.Title}"]`,
    );
    otherMovieButton.trigger('click').then(() => {
      const selection = wrapper.emitted('selection');
      expect(selection).toBeTruthy();
      expect(selection[0]).toEqual([otherMovie.imdbID]);
    });
  });
});
