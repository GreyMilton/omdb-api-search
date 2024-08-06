import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import MovieList from '../src/components/MovieList.vue';
import BookmarkIcon from '../src/components/icons/BookmarkIcon.vue';

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
  ];

  const selectedMovie = movies[0];
  const otherMovie = movies.find(
    (movie) => movie.imdbID !== selectedMovie.imdbID,
  );

  const wrapper = mount(MovieList, {
    props: { movies, selectedMovieId: selectedMovie.imdbID, watchlistIds: [] },
    global: {
      components: { BookmarkIcon },
    },
  });

  const selectedMovieButton = wrapper.find(
    `button[aria-label="Select ${selectedMovie.Title}"]`,
  );
  const otherMovieButton = wrapper.find(
    `button[aria-label="Select ${otherMovie.Title}"]`,
  );

  it('renders the list correctly when it has movies', () => {
    const imgs = wrapper.findAll('img');
    const h1s = wrapper.findAll('h1');
    const ps = wrapper.findAll('p');

    expect(wrapper.findAll('li')).toHaveLength(movies.length);

    movies.forEach((movie, index) => {
      expect(imgs[index].attributes('src')).toBe(movie.Poster);
      expect(h1s[index].text()).toBe(movie.Title);
      expect(ps[index].text()).toBe(movie.Year);
    });
  });

  it('displays no <li>s when there are no movies', () => {
    wrapper.vm.movies = [];
    expect(wrapper.findAll('li')).not.toHaveLength();
  });

  it('applies light grey background to the selected movie', () => {
    expect(selectedMovieButton.classes()).toContain('bg-zinc-100');
    expect(otherMovieButton.classes()).not.toContain('bg-zinc-100');
  });

  it('emits the selection event with correct IMDb ID when a movie is clicked', () => {
    otherMovieButton.trigger('click').then(() => {
      const selection = wrapper.emitted('selection');
      expect(selection).toBeTruthy();
      expect(selection[0]).toEqual([otherMovie.imdbID]);
    });
  });
});
