
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

// Convert a city name into coordinates
async function getCoordinates(city) {
    const params = new URLSearchParams({
        name: city,
        count: "1",
        language: "en",
        format: "json"
    });

    const response = await fetch(
        `${GEOCODING_URL}?${params}`,
        { signal: AbortSignal.timeout(10000) }
    );

    if (!response.ok) {
        throw new Error("Could not search for the city.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`City "${city}" was not found.`);
    }

    return data.results[0];
}

// Get weather using the city's coordinates
export async function getWeather(city, days = 1) {
    if (!city) {
        throw new Error("Please provide a city name.");
    }

    const location = await getCoordinates(city);

    const params = new URLSearchParams({
        latitude: location.latitude,
        longitude: location.longitude,
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        timezone: "auto",
        forecast_days: String(days)
    });

    const response = await fetch(
        `${WEATHER_URL}?${params}`,
        { signal: AbortSignal.timeout(10000) }
    );

    if (!response.ok) {
        throw new Error("Could not retrieve weather information.");
    }

    const data = await response.json();

    console.log(`\nWeather for ${location.name}, ${location.country}`);
    console.log("--------------------------------");
    console.log(`Temperature: ${data.current.temperature_2m}°C`);
    console.log(`Feels like: ${data.current.apparent_temperature}°C`);
    console.log(`Humidity: ${data.current.relative_humidity_2m}%`);
    console.log(`Wind speed: ${data.current.wind_speed_10m} km/h`);

    console.log("\nForecast:");

    for (let i = 0; i < data.daily.time.length; i++) {
        console.log(
            `${data.daily.time[i]}: ` +
            `${data.daily.temperature_2m_min[i]}°C - ` +
            `${data.daily.temperature_2m_max[i]}°C`
        );
    }
}
