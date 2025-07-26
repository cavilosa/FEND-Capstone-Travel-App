const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
require('dotenv').config();

// Environment variables
const api_key = process.env.api_key;
const weather_key = process.env.weather_key;
const pixabay_key = process.env.pixabay_key;
const port = process.env.PORT || 8081;

const allowedOrigins = [
  process.env.DOMAIN, // e.g., http://localhost:8080
  'http://localhost:8080'
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    console.log("🌍 Incoming Origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`❌ CORS not allowed for origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions), (req, res) => {
  res.sendStatus(204);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "dist") });
});
// Launch server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Shared project data object
let projectData = { inputData: {}, geoData: {}, picture: "" };

// Handle POST to /data
app.post("/data", async (req, res) => {
  try {
    await getInput(req);
    await getGeoInfo();
    await fetchImage();
    res.send(projectData);
  } catch (error) {
    console.error("Error in /data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Send all collected project data
app.get("/all", (req, res) => {
  res.send(projectData);
});

// Parse input from client
async function getInput(req) {
  if (req.body?.data) {
    projectData.inputData = req.body.data;
  } else {
    throw new Error("Missing input data in request.");
  }
}

// Get GeoNames data
async function getGeoInfo() {
  const destination = encodeURIComponent(projectData.inputData.destination);
  const url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=10&username=${api_key}`;
  const response = await fetch(url);
  const geoInfo = await response.json();

  if (!geoInfo?.geonames?.length) {
    projectData.geoData = {};
  } else {
    const location = geoInfo.geonames[0];
    projectData.geoData = {
      latitude: location.lat,
      longitude: location.lng,
      country: location.countryName,
      city: location.toponymName,
      countryCode: location.countryCode
    };
  }
}

// Get photo from Pixabay
async function fetchImage() {
  const city = encodeURIComponent(projectData.geoData.city || "");
  let url = `https://pixabay.com/api/?key=${pixabay_key}&q=${city}&category=places&image_type=photo`;
  let response = await fetch(url);
  let data = await response.json();

  if (!data.totalHits) {
    const country = encodeURIComponent(projectData.geoData.country || "");
    url = `https://pixabay.com/api/?key=${pixabay_key}&q=${country}&category=places&image_type=photo`;
    response = await fetch(url);
    data = await response.json();
  }

  projectData.picture = data.hits?.[0]?.largeImageURL || "";
}

// Weather data
app.route("/forecast")
  .post((req, res) => {
    req.app.locals.geoData = req.body.data;
    res.status(200).send({ message: "Geo data stored" });
  })
  .get(async (req, res) => {
    try {
      const weather = await weatherbitForecast(req.app.locals.geoData);
      res.send(weather);
    } catch (error) {
      console.error("Forecast error:", error);
      res.status(500).send({ error: "Forecast failed" });
    }
  });

async function weatherbitForecast(geoData) {
  if (!geoData?.latitude || !geoData?.longitude) throw new Error("Invalid geoData");

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${geoData.latitude}&lon=${geoData.longitude}&days=16&units=M&key=${weather_key}`;
  const response = await fetch(url);
  const data = await response.json();

  const forecast = {};
  for (const day of data.data) {
    forecast[day.valid_date] = {
      date: day.valid_date,
      max_temp: day.max_temp,
      min_temp: day.min_temp,
      description: day.weather.description,
      icon: day.weather.icon,
      code: day.weather.code
    };
  }

  return forecast;
}

// Exported for Jest or external testing if needed
module.exports = { server, getInput, weatherbitForecast };
