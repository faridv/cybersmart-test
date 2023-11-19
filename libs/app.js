import express from 'express';
import cors from 'cors';
import { Weather } from './weather.js';

export class App {

    /**
     * @type {express|undefined}
     */
    instance = undefined;

    /**
     * @type {Weather|undefined}
     */
    weather = undefined;

    // create express app on startup
    constructor() {
        this.weather = new Weather();
        this.instance = express();
        this.configureServer();
        this.createRoutes();
    }

    /**
     * Configures existing Express instance
     */
    configureServer() {
        this.instance.use(express.json());
        this.instance.use(express.urlencoded({ extended: true }));
        this.instance.use(express.static('client'));
        this.instance.use(cors())
    }

    /**
     * Initialize application routes
     */
    createRoutes() {
        this.instance.get('/', (req, res) => {
            res.send('Hello World!');
        });
        this.instance.get('/date', (req, res) => {
            res.send(JSON.stringify({ date: this.getDate() }));
        });
        this.instance.get('/weather/:city', async (req, res) => {
            const data = await this.weather.getData(req.params.city);
            res.send(data);
        });
        this.instance.listen(3000, () => console.log('Server started on port 3000'));
    }


    /**
     * Get current system time/date
     * @returns {string}
     */
    getDate() {
        return new Date().toISOString();
    }

}
