import * as SQLite from 'expo-sqlite';
import { Place } from '../models/Place';

const database = SQLite.openDatabaseSync('places.db');

export function init() {
    return database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        );`
    );
}

export function insertPlace(place: Place) {
    const { title, imageUri, location } = place;
    return database.runAsync(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [title, imageUri, location.address, location.lat, location.lng]
    );
}

export function fetchPlaces() {
    return database.getAllAsync('SELECT * FROM places');
}

export async function fetchPlaceById(id: string) {
    const { title, imageUri, address, lat, lng } = await database.getFirstAsync('SELECT * FROM places WHERE id = ?', [id]) as any;

    return { id, title, imageUri, address, location: { lat, lng, address } };
}