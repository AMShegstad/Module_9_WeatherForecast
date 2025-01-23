import * as dotenv from 'dotenv';
dotenv.config();

import HistoryService from "../service/historyService.js";

// TODO: Define a class for the Weather object
class Weather /*implements Coordinates*/{
    city;
    date;
    icon;
    iconDescription;
    tempF;
    windSpeed;
    humidity;

    constructor(
        city,
        date,
        icon,
        iconDescription,
        tempF,
        windSpeed,
        humidity
    ) {
        this.city = city;
        this.date = date;
        this.icon = icon;
        this.iconDescription = iconDescription;
        this.tempF = tempF;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
    }
}

// TODO: Complete the WeatherService class
class WeatherService {
    static city_name;
    static api_key;

    constructor (
        city_name,  
    ) {
        city_name = city_name;
    }

    // I need a function to get the longitude and latitude so that I can use the required request url given to us in the README.
    static getWeatherData = async (cityName)  => {
 
        const doesThisWork = (cityName);
        console.log("const doesThisWork = JSON.parse(cityName)");
        
        const geocode_url = `http://api.openweathermap.org/geo/1.0/direct?q=${doesThisWork.cityName}&limit=1&appid=${process.env.API_KEY}`;
        // Add the city name to the search hhistory is it doesn't already exist.

        console.log(doesThisWork.cityName);
        // send for the response.
        const response = await fetch(geocode_url);
        console.log("const response = await fetch(geocode_url)");
        // assign the response to a variable.
        const geocode_data = await response.json();
        console.log("const geocode_data = await response.json()");
        // Deconstruct the data to retrieve only the values I require.
        const { lat, lon } = geocode_data[0];
        console.log(lat, lon);
        // Now I can use the correct API url.
        let weather_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`;
        //console.log(weather_url);
        // send for the new response.
        const weather_response = await fetch(weather_url);
        // assign the response.
        const weather_data = await weather_response.json();
        // Starting work with the actual array of weather data I'll be sending as a response.
        try {
            HistoryService.addToHistory(doesThisWork.cityName); 
            console.log("History saved!");
            } catch (err) {
              console.log("History save failed...");
            }
        let weatherArray = []
        for (let i = 0; i <= 32; i += 8) {
            console.log();
        
            //const {name, icon, temp, wind, humidity} = weather_data.list[i];
            const name = weather_data.city.name;
            const dateString = weather_data.list[i].dt_txt;
            const date = dateString.substring(0,10);
            const icon = weather_data.list[i].weather[0].icon;
            const iconDescription = weather_data.list[i].weather[0].description;
            const tempF = weather_data.list[i].main.temp;
            const windSpeed = weather_data.list[i].wind.speed;
            const humidity = weather_data.list[i].main.humidity;
            const day = new Weather(name, date, icon, iconDescription, tempF, windSpeed, humidity);
            weatherArray.push(day);
        }

        return weatherArray;
    }
}
export default WeatherService;