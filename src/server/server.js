const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.text());
app.use(bodyParser.json());


app.use(express.static("dist"));
const port = 8000;

app.get("/", function (req, res) {
    res.sendFile("dist/index.html")
})

const server = app.listen(port, () => {
    console.log("Server is running on port 8000");
})

let inputData = {};

app.post("/data", getWeather);

async function getWeather (req, res) {
    inputData = req.body.data // destination, departure, comback
    const url = ""
}
/*
async function getWeather(url) {
    console.log(url)
    const response = await fetch(url);
    if (response.status != 200) {
        window.alert("Try a valid city name, please!");
        document.getElementById("location").value = "";
    }
    try {
        const weather = await response.json();
        latitude = weather.geonames[0].lat;
        longitude = weather.geonames[0].lng;
        country = weather.geonames[0].countryName;
        console.log(latitude, longitude, country)
        return latitude, longitude, country;
    } catch (error) {
        console.log("error", error);
    }
}*/


// Post Route
app.post("/addWeather", addWeather);

function addWeather(req, res){
    newEntry = {
        city: req.body.city,
        weather: req.body.weather,
        temperature: req.body.temperature,
        feelsLike: req.body.feelsLike,
        wind: req.body.wind
    }
    projectData = newEntry;
}


app.get("/all", getData);

// Callback function to complete GET '/all'
function getData (req, res) {
    res.send(projectData);
}
