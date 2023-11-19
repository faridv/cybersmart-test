import { Config } from './config.js';
import { Request } from './request.js';
import { DOM } from './dom.js';


/**
 * The Application!
 */
class App {

    // Keep the last item's time for later comparisons
    lastItemTime = 0;

    constructor() {
        // initially I get the date to show
        // Ideally it is here to keep the server date/time in sync with browser
        // but for now I am just showing the server date/time
        Request.getDate()
            .then(async (data) => {
                const date = await data.json();
                DOM.setDate(new Date(date.date));
            });
        // load weather data and then start the update interval
        this.loadWeather(Config.city, () => this.handleUpdates());
    }

    /**
     * This method is responsible for updating the weather data every {Config.updateInterval} seconds.
     * After every update, the history table is cleaned up to keep only the most recent {Config.maxItemsToKeep}
     */
    handleUpdates() {
        setInterval(async () => {
            const data = await Request.getWeather(Config.city);
            data.json().then(items => {
                items.reverse().forEach(item => {
                    if (item.time > this.lastItemTime) {
                        this.lastItemTime = item.time;
                        const row = document.createElement('tr');
                        row.innerHTML = `<td>${new Date(item.time).toLocaleDateString('en-US', Config.timeFormat)}</td><td>${item.forecast}</td><td>${item.temperature}&deg;</td>`;
                        DOM.prependRowToTable(row);
                        DOM.cleanUpTable(Config.maxItemsToKeep);
                    }
                });
            });
        }, Config.updateInterval);
    }

    /**
     * This method is responsible for loading weather data for a given city and displaying it on the page.
     * It also displays the weather data in a table.
     *
     * The callback function is executed after the weather data is loaded. This is useful for executing code
     * after the weather data is loaded, such as starting the update interval.
     *
     * The callback function is optional and can be omitted.
     *
     * The callback function is executed asynchronously, so it is safe to assume that the weather data is loaded
     * before the callback function is executed.
     *
     * @param city - The city to load weather data for
     * @param callback - A callback function to execute after the weather data is loaded
     */
    loadWeather(city, callback) {
        DOM.setTableBody('');
        Request.getWeather(city)
            .then(async (data) => {
                const weather = await data.json();
                this.displayWeather(weather);
                this.displayHistoryData(weather);
                if (typeof callback === 'function') {
                    callback();
                }
            });
    }

    /**
     * This method is responsible for displaying the weather data on the page.
     * @param weather - The weather data to display
     */
    displayWeather(weather) {
        const data = weather[0];
        this.lastItemTime = data.time;
        const $el = document.querySelector('#current');
        $el.querySelector('.temp').innerHTML = Math.round(data.temperature) + '&deg;';
        $el.querySelector('.city').innerHTML = Config.city;
        $el.querySelector('.desc').innerHTML = data.forecast;
    }

    /**
     * This method is responsible for displaying the weather data in a table.
     * The table is cleaned up to keep only the most recent {Config.maxItemsToKeep}
     * @param weather - The weather data to display in history table
     */
    displayHistoryData(weather) {
        let rows = ''
        weather.forEach(item => {
            const time = new Date(item.time).toLocaleDateString('en-US', Config.timeFormat);
            rows += `<tr><td>${time}</td><td>${item.forecast}</td><td>${item.temperature}&deg;</td></tr>`;
        });
        DOM.setTableBody(rows);
        DOM.loading(false);
    }

}


/**
 * This is the entry point of the application.
 */
window.onload = function () {
    new App();
}
