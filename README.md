# omdb-api-search

## What is this?

This repo was built undertaking a fun challenge in interacting with an API and displaying data in a user friendly web-app. The API is an online movie database. The app allows for searching, filtering, viewing and adding results to a watchlist.

## Local Project Setup

### Versions Used

- node.js v22.5.1
- npm 10.8.2

### Package Installation

```sh
npm install
```

### Create and Populate `.env`

See `.env.example` for required variables.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Development Process

I created mock Jira issues for tracking git commits, mimicking a real world client/project scenario. I generally followed them, and referenced the below "issue numbers" in the majority of my commits.

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

## Possible Future Enhancements

I am happy with what I have done on this task, however in the future I would consider the below enhancements:

- Automated testing. This would be my top priority.
- Pagination or infinite scroll of search results. The API has some pagination functionality, but it is not very comprehensive. This may require some thought.
- Filter search by range of years. The API does not provide this functionality, it only allows searching by one year at a time. This feature would therefore require looping through the years selected and making a query for each one, then handling errors as a group, and combining succesful queries together.
