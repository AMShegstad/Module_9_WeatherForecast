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
    static getWeatherData = async (city_Name)  => {
 
        const queryCity = JSON.parse(city_Name);
        console.log("Start of getWeatherData()");
        console.log(queryCity);
        
        const geocode_url = `http://api.openweathermap.org/geo/1.0/direct?q=${queryCity}&limit=1&appid=${process.env.API_KEY}`;
        // Add the city name to the search history is it doesn't already exist.

        // send for the response.
        const response = await fetch(geocode_url);
        //DEBUGGING -> console.log('getWeatherData() retrieved data from: ', geocode_url);
        // assign the response to a variable.
        const geocode_data = await response.json();
        //DEBUGGING -> console.log("const geocode_data = await response.json()");
        //DEBUGGING -> console.log(geocode_data);
        // Deconstruct the data to retrieve only the values I require.
        const { lat, lon } = geocode_data[0];
        console.log(lat, lon);
        // Now I can use the correct API url.
        let weather_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`;
        //DEBUGGING -> console.log(weather_url);
        // send for the new response.
        const weather_response = await fetch(weather_url);
        //DEBUGGING -> console.log("getwWeatherData() -> weather_response: ", weather_response);
        // assign the response.
        const weather_data = await weather_response.json();
        //DEBUGGING -> console.log("getWeatherData() ->weather_data: ", weather_data);
        // Starting work with the actual array of weather data I'll be sending as a response.
        try {
            HistoryService.addToHistory(JSON.parse(queryCity)); 
            console.log("History saved!");
            } catch (err) {
              console.log("History save failed...");
            }
        let weatherArray = []
        for (let i = 0; i <= 36; i += 6) {
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