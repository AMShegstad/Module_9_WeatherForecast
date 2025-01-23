import { Router } from "express";
const router = Router();

import HistoryService from "../../service/historyService.js";
import WeatherService from "../../service/weatherService.js";

// TODO: POST Request with city name to retrieve weather data
router.post("/", async (req, res) => {
  // TODO: GET weather data from city name (Call the appropriate method(s) from historyService)
  try {

    const city_name = JSON.stringify(req.body);
  
    const weatherData = await WeatherService.getWeatherData(city_name);
    console.log("router.post('/') ... COMPLETE");
    console.log(weatherData);
    const cityToSave = weatherData[0].name;
    try {
      HistoryService.addToHistory(cityToSave); 
      console.log("History saved!");
      } catch (err) {
        console.log("History save failed...");
      }
    res.json(weatherData);
  } catch (error) {
    console.log("Couldn't get the response: ", error);
  }

  // TODO: save city to search history (Call the method from the historyService document.)
});
// TODO: GET search history

router.get("/history/", async (req, res) => {
  // return the data from searchHistory.json in JSON format.
  try {
    const history = await HistoryService.readHistory(); // Call readHistory()
    console.log(history);
    res.json(history); // Send the array of city names as JSON;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch search history." });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete("/history/:id", async (req, res) => {
  // This should read the searchHistory.json file, DELETE the selected entry, and rewrite the file with the altered JSON object.
  HistoryService.delete(req.params.id);
});

export default router;
