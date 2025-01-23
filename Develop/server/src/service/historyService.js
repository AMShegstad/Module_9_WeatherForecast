import { promises as fs } from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import WeatherService from "../service/weatherService.js";

const filePath = path.join(__dirname, "../../db/searchHistory.json");

function generateRandomId() {
  // Ten digits just felt right...
  const min = 1000000000;
  const max = 9999999999;
  
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

class City {
  constructor(name, id = generateRandomId()) {
    this.name = name;
    this.id = id;
  }
}

class HistoryService {

  async readHistory() {
    try {
      const data = await fs.readFile(filePath, "utf8");
      console.log("request sent for searchHistory object");
      const jsonObject = JSON.parse(data);
      console.log(jsonObject);
      return jsonObject;

      // Return the entire JSON object
    } catch (error) {
      console.error("Error reading or parsing the file:", error);
      return { cities: [] };
    }
  }

  async appendToArray(city) {
    try {
      const cityToAdd = new City(city);
      console.log(cityToAdd.name);
      let jsonObject = await this.readHistory();
      if (!jsonObject.cities) {
        jsonObject.cities = [];
      }

      jsonObject.cities.push({ name: cityToAdd.cityName, id: cityToAdd.id});

      await fs.writeFile(filePath, JSON.stringify(jsonObject, null, 2), "utf8");
      console.log("Writing completed");
    } catch (err) {
      console.error("Error reading or writing to the file:", err);
    }
  }

  async addToHistory(cityName) {
    await this.appendToArray(cityName);
  }

  async delete(id) {
    try {
      const data = await fs.readFile(filePath, "utf8");
      const jsonObject = JSON.parse(data);
      const cityIndex = jsonObject.cities.findIndex((city) => city.id === id);
      if (cityIndex !== -1) {
        jsonObject.cities.splice(cityIndex, 1);
        await fs.writeFile(filePath, JSON.stringify(jsonObject, null, 2), "utf8");
        return { success: true, message: `City of ID ${id} removed.` };
      } else {
        return { success: false, message: `City of ID ${id} not found.` };
      }
    } catch (error) {
      console.error("Error reading or writing to the file:", error);
      return { success: false, message: "Internal Server Error" };
    }
  }
}

export default new HistoryService();
