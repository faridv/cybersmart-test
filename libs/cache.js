import fs from 'fs';

/**
 @abstract
 Manipulating cache files
 */
export class Cache {

    /**
     * Writes cache file
     * @param filename {string}
     * @param content
     */
    static write(filename, content) {
        Cache.makeDirectoryIfDoesNotExist('./cache/');
        fs.writeFileSync(`./cache/${filename.toLowerCase()}`, content, {
            flag: Cache.fileOrPathExists(`./cache/${filename.toLowerCase()}`) ? 'w' : 'wx',
            encoding: 'utf-8',
        });
    }

    /**
     * Reads cache file
     * @param filename {string}
     * @returns {string|null}
     */
    static read(filename) {
        return Cache.fileOrPathExists(`./cache/${filename.toLowerCase()}`)
            ? fs.readFileSync(`./cache/${filename.toLowerCase()}`, 'utf-8')
            : null;
    }

    /**
     * Create directory if it does not exist
     * @param path {string}
     * @returns void
     */
    static makeDirectoryIfDoesNotExist(path) {
        if (!Cache.fileOrPathExists(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
    }

    /**
     * Check if file or path exists
     * @returns {boolean}
     * @param fileOrPath {string}
     */
    static fileOrPathExists(fileOrPath) {
        return fs.existsSync(fileOrPath);
    }

}
