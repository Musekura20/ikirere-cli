
import { parseArgs } from "node:util";
import { getWeather } from "./weather.js";

function showHelp() {
    console.log(`
IKIRERE - Your Weather Assistant

USAGE:
  ikirere <command> [arguments]

COMMANDS:
  weather <city>       Get current weather
  forecast <city>      Get weather forecast
  favorites add <city> Save a favorite city
  favorites list       Show favorite cities
  favorites remove <city> Remove a favorite city
  history              Show previous searches
  settings             Show application settings

OPTIONS:
  --help               Show help
  --days <number>      Number of forecast days
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
            await getWeather(positionals[1]);
            return;
        }

        if (command === "forecast") {
            const days = Number(values.days || 7);

            if (!Number.isInteger(days) || days < 1 || days > 7) {
                throw new Error("Days must be between 1 and 7.");
            }

            await getWeather(positionals[1], days);
            return;
        }

        if (command === "favorites") {
            console.log("Favorites command selected.");
            console.log("Action:", positionals[1]);
            return;
        }

        if (command === "history") {
            console.log("History command selected.");
            return;
        }

        if (command === "settings") {
            console.log("Settings command selected.");
            return;
        }

        throw new Error(`Unknown command: ${command}`);

    } catch (error) {
        console.error("Error:", error.message);
        process.exitCode = 1;
    }
}
