# IKIRERE – Your Weather Assistant

## 1. About the Project

Ikirere is a command-line weather application built using Node.js.

The application allows users to check the current weather and weather forecasts for different cities directly from their terminal.

I developed this project to practise working with Node.js, command-line applications, APIs, JSON files, and environment variables.

## 2. Features

The application includes the following features:

- **Current Weather:** Get the current temperature, feels-like temperature, humidity, and wind speed of a city.
- **Weather Forecast:** View weather forecasts for up to 7 days.
- **Favorites:** Add, view, and remove favorite cities.
- **Search History:** Keep a record of previously searched cities, including the date and time of each search.
- **Temperature Settings:** Choose between Celsius and Fahrenheit. The application saves the selected unit and uses it when displaying weather information.
- **Data Storage:** Save favorites, search history, and settings in a JSON file.
- **Error Handling:** Display understandable error messages when a city is not found, the internet connection fails, or the user enters an invalid command.
- **Custom Data Location:** Allow users to choose where their application data is stored using an environment variable.

## 3. Technologies Used

- **Node.js:** Used to build the application and run JavaScript outside the browser.
- **JavaScript:** Used to write the application logic.
- **Open-Meteo API:** Used to retrieve geographical information and weather data.
- **JSON:** Used to store favorites, search history, and settings.
- **Git and GitHub:** Used for version control and storing the project online.

## 4. How the Application Works

The application uses two Open-Meteo APIs to retrieve weather information.

First, the user enters a city name. The application sends that city name to the Geocoding API to find its geographical coordinates (latitude and longitude).

Next, it uses those coordinates to send another request to the Weather API. The API returns the current weather and forecast information.

The application then displays the results in the terminal.

No API key is required for these Open-Meteo requests.

## 5. Project Structure

```text
ikirere-cli/
│
├── bin/
│   └── cli.js
│
├── src/
│   ├── cli.js
│   ├── weather.js
│   └── storage.js
│
├── .env.example
├── package.json
└── README.md
```

### What Each File Does

- **bin/cli.js:** Starts the application and connects the terminal command to the main application.
- **src/cli.js:** Handles user commands, reads arguments, and decides which action to perform.
- **src/weather.js:** Handles requests to the Geocoding and Weather APIs and displays weather information.
- **src/storage.js:** Handles saving and reading favorites, search history, and settings using JSON files.
- **package.json:** Contains project information, scripts, and the command-line configuration.
- **.env.example:** Shows the environment variable that can be configured by the user.
- **README.md:** Explains the project and how to use it.

## 6. Installation and Setup

### Requirements

- Node.js (version 22 or later recommended)
- npm
- Git
- An internet connection

### Steps

**1. Get the project**

The project was initially created locally using npm. To use it on another computer, first clone the GitHub repository:

```bash
git clone https://github.com/Musekura20/ikirere-cli
```

**2. Enter the project folder**

```bash
cd ikirere-cli
```

**3. Link the application**

Run:

```bash
npm link
```

This creates a global link to the local project, allowing you to run the application using the `ikirere` command directly from your terminal.

**4. Check that the application works**

```bash
ikirere --help
```

You should see the available commands and options.

## 7. Available Commands

### Help

Display all available commands and options.

```bash
ikirere --help
```

### Current Weather

Get the current weather for a city.

```bash
ikirere weather Kigali
```

### Weather Forecast

Get a 7-day forecast by default.

```bash
ikirere forecast Kigali
```

You can also choose the number of forecast days:

```bash
ikirere forecast Kigali --days 3
```

The number of days must be between 1 and 7.

### Favorites

Add a city to your favorites:

```bash
ikirere favorites add Kigali
```

View your favorite cities:

```bash
ikirere favorites list
```

Remove a city from your favorites:

```bash
ikirere favorites remove Kigali
```

### Search History

View your previous weather searches:

```bash
ikirere history
```

The application keeps the 10 most recent searches.

### Temperature Settings

View your current temperature setting:

```bash
ikirere settings
```

Choose Celsius:

```bash
ikirere settings celsius
```

Choose Fahrenheit:

```bash
ikirere settings fahrenheit
```

The selected temperature unit is saved and used for both current weather and forecasts.

## 8. Data Storage

The application uses a JSON file named `data.json` to save information.

The file contains three main sections:

- `favorites`: Stores the cities saved by the user.
- `history`: Stores previous searches and their dates.
- `settings`: Stores the user's temperature preference.

By default, the application creates its data folder in the user's home directory under `.ikirere`.

For example, on Windows:

```text
C:\Users\YourUsername\.ikirere\data.json
```

The application uses Node.js file system functions to read and write this information. This means saved information remains available even after closing the application.

## 9. Environment Variables

The application uses an environment variable called `IKIRERE_DATA_DIR`.

This variable allows users to choose a different folder for storing their data.

For example, in Windows PowerShell:

```powershell
$env:IKIRERE_DATA_DIR = "$env:USERPROFILE\ikirere-data"
```

After setting it, run a command such as:

```powershell
ikirere favorites add Nairobi
```

The application will save its data in the new folder instead of the default location.

The `.env.example` file shows the name of the variable that can be configured.

## 10. Error Handling

The application checks for common errors and displays understandable messages.

Examples include:

- Entering a city that does not exist.
- Running a command without providing a city name.
- Entering an invalid forecast duration.
- Using an unknown command.
- Losing the internet connection.
- Taking too long to receive a response from the API.

When an error occurs, the application displays an error message and uses exit code `1` to indicate that the command failed.

## 11. Node.js Modules Used

This project uses several built-in Node.js modules:

- **process:** Used to access command-line arguments, environment variables, and exit codes.
- **node:util:** Used through `parseArgs()` to read and organize command-line arguments.
- **node:fs/promises:** Used to read, write, and create files and folders.
- **node:path:** Used to build file paths safely.
- **node:os:** Used to get the user's home directory.

The application also uses the built-in `fetch()` function to communicate with the weather APIs.

## 12. Development and Version Control

The project was created locally and managed using Git for version control.

During development, I made commits to save progress as I added different features. I also connected the local Git repository to GitHub so that the project could be stored online.

The `npm link` command was used to test the application as a globally available command on my computer.

## 13. Conclusion

Building Ikirere helped me understand how to create a command-line application using Node.js.

Through this project, I practised working with APIs, handling user input, saving information in JSON files, using environment variables, handling errors, and configuring an application as an installable CLI.

It also helped me understand how different parts of a Node.js application work together to provide a useful service.