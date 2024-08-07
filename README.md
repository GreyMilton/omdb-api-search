# omdb-api-search

## What is this?

This repo was built undertaking a fun challenge in interacting with an API and displaying data in a user friendly web-app. The API is an online movie database. The app allows for searching, filtering, viewing and adding results to a watchlist.

## Features currently include:

- Fully responsive styling for all screen widths.
- Accessibility features including focus states, correct focus ordering, aria attributes, search status messages, text resizability, semantic html, etc.
- Search, fetch and display results of movies/series on typing.
- Debounce search so that excessive API calls are not made.
- Optionally filter by type (movie, series, episode).
- Optionally filter by year.
- Clear search and search results on button click.
- Show status messages for search responses and key user actions.
- Display moving dots '...' on loading related statuses so that user can see something is happening (e.g. when waiting for search response).
- Handle request errors including those from the API, and network error.
- Select and view more details for individual search results (making another request to the API).
- Debounce individual movie details requests so that excessive API calls are not made.
- Add/remove selected movie from watchlist.
- Close selected movie display.
- View next to each movie in search results if that movie is on the watchlist.
- View a list of all (and only) movies in the watchlist.
- Select a movie from the watchlist to view more details of (in the same way as selecting a search result to view more details of).
- View a message if the watchlist is empty.
- Load more results for the given search, if not all results are shown that match the search.
- Continue being able to load more results until all results are shown.
- Disable load more results button when fetching more results.
- Hide load more results button if all results are shown.

## Local Project Setup

### Versions used in development

- node.js v22.5.1
- npm 10.8.2

### Package Installation

```sh
npm install
```

### Create and Populate .env

See `.env.example` for required variables.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Tests

```sh
npm test
```

### Lint code

```sh
npm run lint
```

### Format code

```sh
npm run format
```

## Development Process

I planned the development process, and created mock Jira issues for tracking git commits, mimicking a real world client/project scenario. I referenced the below "issue numbers" in the majority of my commits.

1. Project setup (OMDB-1)
2. Create search bar (OMDB-2)
3. Retrieve records on search (OMDB-3)
4. Display search results (OMDB-4)
5. Filter search by type (OMDB-5)
6. Select and view details for an individual result (OMDB-6)
7. Bugfix (OMDB-7)
8. Filter search by a single year (OMDB-8)
9. Create close button for indivudal result (OMDB-9)
10. Various styling and naming improvements (OMDB-10)
11. Improve interactivity with the API (OMDB-11)
12. Use Axios instead of Fetch API (OMDB-12)
13. Store movies in watchlist (OMDB-13)
14. Display watchlist - show/hide (OMDB-14)
15. Miscellaneous improvements (OMDB-15)
16. Automated testing (OMDB-16)
17. Load More search results button (OMDB-17)

## Looking Forward

Whilst I am happy with the work I have done, in the future I would...

- _Refactor App.vue_ - This component is fairly large and contains code that could be reused in other places as the app expands. I would consider splitting this into separate components, or at least extracting some of the JS into other files. E.g. `utils.js` and `api.js` for reusable utility functions and api related code. This would also help with testing as mentioned below.

- _Expand testing_ - I would increase testing coverage, consider more 'sad paths', and also consider implementing different types of tests e.g. unit tests and end-to-end tests.

- _Explore filtering search by a range of years_ - As far as I can determine, the API does not provide this functionality, it only allows searching by one year at a time. This feature would therefore require looping through the years selected and making a request to the API for each one, then handling errors as a group, and combining succesful responses together. This could be inefficient and problematic, but worth thinking through.
