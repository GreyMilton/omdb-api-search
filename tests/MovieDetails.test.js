import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import MovieDetails from '../src/components/MovieDetails.vue';
import CrossIcon from '../src/components/icons/CrossIcon.vue';
import BookmarkIcon from '../src/components/icons/BookmarkIcon.vue';

describe('MovieDetails.vue', () => {
  const movie = {
    Title: 'Star Wars: Episode IV - A New Hope',
    Year: '1977',
    Rated: 'PG',
    Released: '25 May 1977',
    Runtime: '121 min',
    Genre: 'Action, Adventure, Fantasy',
    Director: 'George Lucas',
    Writer: 'George Lucas',
    Actors: 'Mark Hamill, Harrison Ford, Carrie Fisher',
    Plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth ...",
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 6 Oscars. 67 wins & 31 nominations total',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg',
    Ratings: [
      {
        Source: 'Internet Movie Database',
        Value: '8.6/10',
      },
      {
        Source: 'Rotten Tomatoes',
        Value: '93%',
      },
      {
        Source: 'Metacritic',
        Value: '90/100',
      },
    ],
    Metascore: '90',
    imdbRating: '8.6',
    imdbVotes: '1,460,832',
    imdbID: 'tt0076759',
    Type: 'movie',
    DVD: 'N/A',
    BoxOffice: '$460,998,507',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True',
  };

  const watchlistWithMovie = [movie.imdbID, 'with', 'other', 'ids'];
  const watchlistWithoutMovie = ['just', 'other', 'ids'];

  const wrapperForMovieOnWatchlist = mount(MovieDetails, {
    props: { movie, watchlist: watchlistWithMovie },
    global: {
      components: { CrossIcon, BookmarkIcon },
    },
  });

  const wrapperForMovieOffWatchlist = mount(MovieDetails, {
    props: { movie, watchlist: watchlistWithoutMovie },
    global: {
      components: { CrossIcon, BookmarkIcon },
    },
  });

  it('renders movie details correctly', () => {
    const wrapper = wrapperForMovieOnWatchlist;
    const text = wrapper.text();
    const ratings = wrapper.findAll('li');

    expect(wrapper.find('h1').text()).toBe(movie.Title);
    expect(wrapper.find('img').attributes('src')).toBe(movie.Poster);
    expect(text).toContain(movie.Rated);
    expect(text).toContain(movie.Year);
    expect(text).toContain(movie.Genre);
    expect(text).toContain(movie.Type);
    expect(text).toContain(movie.Runtime);
    expect(text).toContain(movie.Actors);
    expect(text).toContain(movie.Plot);

    expect(ratings).toHaveLength(movie.Ratings.length);
    ratings.forEach((rating, index) => {
      expect(rating.text()).toContain(movie.Ratings[index].Value);
      expect(rating.text()).toContain(movie.Ratings[index].Source);
    });
  });

  it('emits close event when close button is clicked', () => {
    wrapperForMovieOnWatchlist
      .find('button[aria-label="Close"]')
      .trigger('click')
      .then(() => {
        expect(wrapperForMovieOnWatchlist.emitted('close')).toBeTruthy();
      });
  });

  it('emits add-to-watchlist event when watchlist button is clicked (and movie is not on watchlist)', () => {
    wrapperForMovieOffWatchlist
      .find('button[aria-label="Toggle on/off watchlist"]')
      .trigger('click')
      .then(() => {
        expect(
          wrapperForMovieOffWatchlist.emitted('add-to-watchlist'),
        ).toBeTruthy();
        expect(
          wrapperForMovieOffWatchlist.emitted('add-to-watchlist')[0],
        ).toEqual([
          {
            Poster: movie.Poster,
            Title: movie.Title,
            Type: movie.Type,
            Year: movie.Year,
            imdbID: movie.imdbID,
          },
        ]);
      });
  });

  it('emits remove-from-watchlist event when watchlist button is clicked (and movie is on watchlist)', () => {
    wrapperForMovieOnWatchlist
      .find('button[aria-label="Toggle on/off watchlist"]')
      .trigger('click')
      .then(() => {
        expect(
          wrapperForMovieOnWatchlist.emitted('remove-from-watchlist'),
        ).toBeTruthy();
        expect(
          wrapperForMovieOnWatchlist.emitted('remove-from-watchlist')[0],
        ).toEqual([movie.imdbID]);
      });
  });

  it('has black outlined styled button when movie is not on watchlist', () => {
    const buttonClasses = wrapperForMovieOffWatchlist
      .find('button[aria-label="Toggle on/off watchlist"]')
      .classes();

    expect(buttonClasses).not.toContain('bg-amber-50');
    expect(buttonClasses).toContain('border-black');
  });

  it('has gold styled watchlist button when movie is on watchlist ', () => {
    const buttonClasses = wrapperForMovieOnWatchlist
      .find('button[aria-label="Toggle on/off watchlist"]')
      .classes();

    expect(buttonClasses).toContain('border-yellow-500');
    expect(buttonClasses).toContain('bg-amber-50');
  });
});
