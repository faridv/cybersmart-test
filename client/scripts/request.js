import { Config } from './config.js';


/**
 * An abstract class responsible for making the AJAX (fetch) requests
 * @abstract
 */
export class Request {

    /**
     * @returns {Response<{date: string}>}
     */
    static async getDate() {
        return await fetch(Config.baseUrl + Config.date);
    }

    /**
     *
     * @param city - name of the city to get weather for
     * @returns {Response<Weather[]>}
     */
    static async getWeather(city) {
        return await fetch(Config.baseUrl + Config.weather.replace('{city}', city));
    }

}
