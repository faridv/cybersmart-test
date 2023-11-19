/**
 *  This is a simple object to keep the environmental variables of the application
 */
export const Config = {
    baseUrl: '/',
    date: 'date',
    weather: 'weather/{city}',
    city: 'London',
    dateFormat: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    },
    timeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        month: 'short',
        day: 'numeric',
    },
    maxItemsToKeep: 100,
    updateInterval: 1000 * 10, // 10 seconds
};
