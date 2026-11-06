
import { parseArgs } from "node:util";
import { getWeather } from "./weather.js";

import {
    loadData,
    addFavorite,
    removeFavorite,
    addHistory,
    updateTemperatureUnit
} from "./storage.js";

function showHelp() {
    console.log(`
IKIRERE - Your Weather Assistant

USAGE:
  ikirere <command> [arguments]

COMMANDS:
  weather <city>          Get current weather
  forecast <city>         Get weather forecast
  favorites add <city>    Save a favorite city
  favorites list          Show favorite cities
  favorites remove <city> Remove a favorite city
  history                 Show previous searches
  settings                Show application settings

OPTIONS:
  --help                  Show help
  --days <number>         Number of forecast days
`);
}

export async function main() {
    try {
        const { values, positionals } = parseArgs({
            args: process.argv.slice(2),
            options: {
                help: {
                    type: "boolean",
                    short: "h"
                },
                days: {
                    type: "string",
                    short: "d"
                }
            },
            allowPositionals: true
        });

        if (values.help) {
            showHelp();
            return;
        }

        const command = positionals[0];

        if (!command) {
            showHelp();
            return;
        }

        if (command === "weather") {
    const city = positionals.slice(1).join(" ");
    const data = await loadData();

    await getWeather(city, 1, data.settings.temperatureUnit);
    await addHistory(city);
    return;
}

        if (command === "forecast") {
            const city = positionals.slice(1).join(" ");
            const days = Number(values.days || 7);

            if (!Number.isInteger(days) || days < 1 || days > 7) {
                throw new Error("Days must be between 1 and 7.");
            }

            const data = await loadData();
            await getWeather(city, days, data.settings.temperatureUnit);
            await addHistory(city);
            return;
        }

        if (command === "favorites") {
            const action = positionals[1];
            const city = positionals.slice(2).join(" ");

            if (action === "add") {
                if (!city) {
                    throw new Error("Please provide a city name.");
                }

                console.log(await addFavorite(city));
                return;
            }

            if (action === "list") {
                const data = await loadData();

                console.log("\nYour favorite cities:");

                if (data.favorites.length === 0) {
                    console.log("No favorite cities saved yet.");
                } else {
                    data.favorites.forEach((city, index) => {
                        console.log(`${index + 1}. ${city}`);
                    });
                }

                return;
            }

            if (action === "remove") {
                if (!city) {
                    throw new Error("Please provide a city name.");
                }

                console.log(await removeFavorite(city));
                return;
            }

            throw new Error("Use favorites add, list or remove.");
        }

        if (command === "history") {
            const data = await loadData();

            console.log("\nYour search history:");

            if (data.history.length === 0) {
                console.log("No searches yet.");
            } else {
                data.history.forEach((item, index) => {
                    console.log(
                        `${index + 1}. ${item.city} - ` +
                        `${new Date(item.date).toLocaleString()}`
                    );
                });
            }

            return;
        }

        if (command === "settings") {
    const unit = positionals[1];

    if (unit) {
        if (unit !== "celsius" && unit !== "fahrenheit") {
            throw new Error("Choose celsius or fahrenheit.");
        }

        console.log(await updateTemperatureUnit(unit));
        return;
    }

    const data = await loadData();

    console.log("\nYour settings:");
    console.log("Temperature unit:", data.settings.temperatureUnit);

    return;
}

        throw new Error(`Unknown command: ${command}`);

    } catch (error) {
    console.error("\nSomething went wrong!");
    console.error(error.message);
    console.error("Please check your command and try again.");

    process.exitCode = 1;
}
}
