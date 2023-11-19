import fetch from 'node-fetch';
import { Cache } from './cache.js';


export class Weather {

    apiKey = "a38751cd03a2f53c339309128542ff30";

    /**
     * Get weather data for a city
     * @returns {Promise<any|*[]>}
     * @param city {string} name of the city
     */
    async getData(city) {
        const cache = this.readCache(city);
        const data = cache ? JSON.parse(cache) : [];
        // we do not have data, or last item is out-dated (more than 9.5 seconds old)
        if (!data.length || (data.length && data[0].time + 9500 < new Date().getTime())) {
            // get fresh data
            const newRecord = await this.fetch(city);
            data.unshift(newRecord);
        }
        // splice records to only keep latest 100
        this.updateHistory(city, this.spliceRecords(data));
        // show data in reversed order so the latest record is first
        return data;
    }


    /**
     * update the cached file
     * @param city {string} name of the city
     * @param data {array} weather data
     */
    updateHistory(city, data) {
        Cache.write(`${city}.json`, JSON.stringify(data));
    }

    /**
     * @param data {array} weather data
     * @param count {number} number of records to keep
     * @returns {array} spliced weather data
     */
    spliceRecords(data, count = 100) {
        if (data.length > count) {
            data.splice(0, data.length - count);
        }
        return data;
    }

    /**
     * @param city {string} name of the city
     * @returns {string|null} weather data
     */
    readCache(city = 'London') {
        return Cache.read(`${city}.json`);
    }

    /**
     * @param city {string} name of the city
     * @returns {Promise<{temperature: *, forecast: NodeJS.Module, time: number}>}
     */
    async fetch(city = 'London') {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.apiKey}`;
        try {
            const response = await fetch(weatherURL);
            const responseObj = await response.json();
            return {
                time: new Date().getTime(),
                temperature: responseObj.main.temp,
                forecast: responseObj.weather[0].main,
            }
        } catch (error) {
            console.log("Error fetching weather data:", error);
            throw error;
        }
    }

}
