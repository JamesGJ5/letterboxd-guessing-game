# Notes

- Currently updating unit tests to accommodate significant changes.
- The Letterboxd API is not publicly accessible (see letterboxd.com/api-beta/), so a web scraper scrapes Letterboxd pages for film data and stores them in a database.
- The scraper can be found at https://github.com/fs7fyqy553/letterboxd-scraper
- The backend is set up to regularly update the database but the updater isn't deployed yet for cost reasons
- The backend also contains an API which is currently used to serve film data to the frontend web game.

# Tools

- Frontend:

    - Written in TypeScript within React and NextJS
    - WCAG Level A accessibility
    - Responsive design using Vanilla CSS and Material UI
    - Tested using the React Testing Library in Jest
    - Has a Dockerfile written for manual configuration and specified for deployment to Railway

- Backend:

    - Written in TypeScript withing NodeJS and Express
    - Accessible using a REST API with authentication
    - Uses a MongoDB database
    - Tested using MongoDB In-Memory Server and Supertest in Jest
    - Uses web scraper to automatically update the database daily (see database/database-updater/populate-database.js)

- Web scraper:

    - Written in TypeScript and utilising Puppeteer
