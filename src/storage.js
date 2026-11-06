
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

// Choose where our data will be stored
const dataFolder = process.env.IKIRERE_DATA_DIR ||
    path.join(os.homedir(), ".ikirere");

const dataFile = path.join(dataFolder, "data.json");

// Default information for a new user
const defaultData = {
    favorites: [],
    history: [],
    settings: {
        temperatureUnit: "celsius"
    }
};

// Read saved information
export async function loadData() {
    try {
        const content = await readFile(dataFile, "utf-8");
        return JSON.parse(content);

    } catch (error) {
        if (error.code === "ENOENT") {
            return defaultData;
        }

        throw error;
    }
}

// Save information to the JSON file
export async function saveData(data) {
    await mkdir(dataFolder, { recursive: true });

    await writeFile(
        dataFile,
        JSON.stringify(data, null, 2),
        "utf-8"
    );
}

// Add a city to favorites
export async function addFavorite(city) {
    const data = await loadData();

    const exists = data.favorites.some(
        favorite => favorite.toLowerCase() === city.toLowerCase()
    );

    if (exists) {
        return "This city is already in your favorites.";
    }

    data.favorites.push(city);
    await saveData(data);

    return `${city} added to favorites.`;
}

// Remove a city from favorites
export async function removeFavorite(city) {
    const data = await loadData();

    const updatedFavorites = data.favorites.filter(
        favorite => favorite.toLowerCase() !== city.toLowerCase()
    );

    if (updatedFavorites.length === data.favorites.length) {
        return `${city} was not found in your favorites.`;
    }

    data.favorites = updatedFavorites;
    await saveData(data);

    return `${city} removed from favorites.`;
}

// Add a city to search history
export async function addHistory(city) {
    const data = await loadData();

    data.history.unshift({
        city: city,
        date: new Date().toISOString()
    });

    data.history = data.history.slice(0, 10);

    await saveData(data);
}

// Change the temperature unit
export async function updateTemperatureUnit(unit) {
    const data = await loadData();

    data.settings.temperatureUnit = unit;

    await saveData(data);

    return `Temperature unit changed to ${unit}.`;
}
