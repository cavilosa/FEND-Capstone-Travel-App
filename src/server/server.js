const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// Environment variables
const api_key = process.env.api_key;
const weather_key = process.env.weather_key;
const pixabay_key = process.env.pixabay_key;
const port = process.env.PORT || 8081; // Server's port

// Apply CORS first
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));


// Serve index.html
app.get("/", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "../../dist") });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Main project object that stores all the information
let projectData = { inputData: {}, geoData: {}, picture: {} };

app.post("/data", retrieveInput);

async function retrieveInput(req, res) {
  console.log("Received data:", req.body);
  try {
    await getInput(req);
    await getGeoInfo();
    await pixabay();
    res.send(projectData);
  } catch (error) {
    console.log("Error in /data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

app.get("/all", allData);

async function allData(req, res) {
  res.send(projectData);
}

async function getInput(req) {
  if (req && req.body && req.body.data) {
    projectData.inputData = req.body.data;
    return projectData.inputData;
  } else {
    console.log("The input is empty");
    throw new Error("Input data missing");
  }
}

async function getGeoInfo() {
  const url = `http://api.geonames.org/searchJSON?q=${projectData.inputData.destination}&maxRows=10&username=${api_key}`;
  const response = await fetch(url);
  try {
    const geoInfo = await response.json();
    if (geoInfo.totalResultsCount === 0) {
      projectData.geoData = {};
    } else {
      projectData.geoData = {
        latitude: geoInfo.geonames[0].lat,
        longitude: geoInfo.geonames[0].lng,
        country: geoInfo.geonames[0].countryName,
        city: geoInfo.geonames[0].toponymName,
        countryCode: geoInfo.geonames[0].countryCode
      };
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function pixabay() {
  try {
    const city = encodeURIComponent(projectData.geoData.city);
    let url = `https://pixabay.com/api/?key=${pixabay_key}&q=${city}&category=places&image_type=photo`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.totalHits === 0) {
      const country = encodeURIComponent(projectData.geoData.country);
      url = `https://pixabay.com/api/?key=${pixabay_key}&q=${country}&category=places&image_type=photo`;
      response = await fetch(url);
      data = await response.json();
    }

    projectData.picture = data?.hits?.[0]?.largeImageURL || "";
  } catch (error) {
    console.log("Pixabay error:", error);
    projectData.picture = "";
  }
}

let weatherForecast = {};
let geoData = {};

app.post("/forecast", async (req, res) => {
  geoData = req.body.data;
  res.status(200).send({ message: "Geo data stored" });
});

app.get("/forecast", async (req, res) => {
  try {
    await weatherbitForecast(geoData);
    res.send(weatherForecast);
  } catch (error) {
    console.log("Forecast error:", error);
    res.status(500).send({ error: "Forecast failed" });
  }
});

async function weatherbitForecast(geoData) {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${geoData.latitude}&lon=${geoData.longitude}&days=16&units=M&key=${weather_key}`;
  const response = await fetch(url);
  try {
    const data = await response.json();
    weatherForecast = {};
    data.data.forEach((each) => {
      weatherForecast[each.valid_date] = {
        date: each.valid_date,
        max_temp: each.max_temp,
        min_temp: each.min_temp,
        description: each.weather.description,
        icon: each.weather.icon,
        code: each.weather.code
      };
    });
    return weatherForecast;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Export for testing
module.exports = {
  server,
  getInput,
  storageInfo,
  weatherbitForecast
};
