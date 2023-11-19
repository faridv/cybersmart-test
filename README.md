<h1 align="center">CyberSmart Evaluation Project</h1>

## What is it?

The project has a simple backend and an interface for showing on the browser. The backend is responsible for loading data from Weather API and providing it as a RESTful API. It also caches the weather data based on the given city name.

Cached files are, in fact, JSON files distinguished by city name, containing the last 100 records gathered from Weather API. If the cache file already exists, the app will update its contents.

To change the city, update the `config.js` file and set the city to whatever you like. Other settings are also available in the same file.

The project is asset-free; only a CSS file is loaded for the page styles.

## To install
Head to the project folder in your terminal of choice and run `npm install`.

## To run
You can either use `npm run start` or `node index.js`.<br>
This will start the application on port <b>3000</b> and is accessible on [localhost:3000](http://localhost:3000). Thus, keeping this port free before starting the app would be best.

After opening the URL in your browser, wait and see that by 10-second intervals, weather history and current weather are updated.
