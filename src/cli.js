
import { parseArgs } from "node:util";

function showHelp() {
    console.log(`
IKIRERE - Your Weather Assistant

USAGE:
  ikirere <command> [arguments]

COMMANDS:
  weather <city>       Get current weather
  forecast <city>      Get weather forecast
  favorites add <city>    Save a favorite city
  favorites list       Show favorite cities
  favorites remove <city> Remove a favorite city
  history              Show previous searches
  settings             Show application settings

OPTIONS:
  --help               Show help
  --days <number>      Number of forecast days
`);
}

export function main() {
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
            console.log("Weather command selected.");
            console.log("City:", positionals[1]);
            return;
        }

        if (command === "forecast") {
            console.log("Forecast command selected.");
            console.log("City:", positionals[1]);
            console.log("Days:", values.days || 7);
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

        console.error("Unknown command:", command);
        process.exitCode = 1;

    } catch (error) {
        console.error("Error:", error.message);
        process.exitCode = 1;
    }
}
