import { Config } from './config.js';


/**
 * An abstract class responsible for manipulating the data on page
 */
export class DOM {

    /**
     * Shows date on page
     * @param date {Date}
     */
    static setDate(date) {
        document.querySelector('time').innerHTML = date.toLocaleDateString('en-US', Config.dateFormat);
    }

    /**
     * Sets table body
     * @param body {string}
     */
    static setTableBody(body) {
        document.querySelector('table tbody').innerHTML = body;
    }

    /**
     * Prepends row to table
     * @param row {string}
     */
    static prependRowToTable(row) {
        document.querySelector('table tbody').prepend(row);
    }

    /**
     * Show or hide loading indicator
     * @param enable {boolean}
     */
    static loading(enable) {
        document.getElementById('loader').style.display = enable ? 'block' : 'none';
    }

    /**
     * Clean up table to keep the last items
     * @param maxItems {number}
     */
    static cleanUpTable(maxItems) {
        const rows = document.querySelectorAll('table tbody tr');
        if (rows.length > maxItems) {
            rows[rows.length - 1].remove();
        }
    }

}
