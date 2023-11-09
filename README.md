# Amazon Scraper Project

This project is an Amazon web scraper, which uses Puppeteer to search for products on Amazon based on a keyword provided by the user. The project consists of three main files: `scraper.js`, `app.js`, and `index.html`.

## scraper.js

This file contains the web scraping logic. It uses Puppeteer to start a browser, navigate to the Amazon page, insert the keyword into the search box, click the search button, and wait for navigation. Then, it extracts the details of the products from the results page and returns these details.

## app.js

This file is the Express server that serves the static `index.html` file and exposes an API to perform the web scraping. When the `/api/scrape` route is accessed with a keyword as a query parameter, it calls the scraping function in `scraper.js` and returns the results.

## index.html

This is the HTML file that is served by the Express server. It contains an input field for the keyword and a button to start the scraping. When the button is clicked, it makes a request to the server's API and displays the results on the page.

# How to use

1. Install the project dependencies with `npm install`.
2. Start the server with `node app.js`.
3. Open a browser and go to `http://localhost:3000`.
4. Enter a keyword in the input field and click the button to start the scraping.
5. The results will be displayed on the page.

# Dependencies

- [Puppeteer](https://pptr.dev/)
- [Express](https://expressjs.com/)
- [CORS](https://expressjs.com/en/resources/middleware/cors.html)

Please note that this project is for educational purposes only and should not be used for large-scale scraping as this may violate Amazon's terms of service. Also, scraping may be blocked by Amazon at any time, so this project may not work in the future.
