const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();
let api_key = process.env.api_key;
let weather_key = process.env.weather_key;

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

let projectData = {inputData: {}, geoData: {}, weatherForecast: {}}

let message = ""; // error message from geo api when the city is incorrect

app.post("/data", retrieveInput);

async function retrieveInput(req, res) {
    getInput(req, res)
    .then ( () => {
        getGeoInfo()
        .then( () => {
            weatherbitForecast()
        } )
    } )
}


async function getInput (req, res) {
    if (req) {
        projectData.inputData = req.body.data // destination, departure, comeback
        return projectData.inputData
    }else{
        console.log("the input is empty")
    }
}


async function getGeoInfo() {

    const url = `http://api.geonames.org/searchJSON?q=${projectData.inputData.destination}${api_key}`

    const response = await fetch(url);

    const geoInfo = await response.json();

    try {
            if (Object.keys(geoInfo.geonames).length > 0) {
                projectData.geoData = {
                    latitude: geoInfo.geonames[0].lat,
                    longitude: geoInfo.geonames[0].lng,
                    country: geoInfo.geonames[0].countryName,
                    city: geoInfo.geonames[0].toponymName,
                    countryCode: geoInfo.geonames[0].countryCode
                }
                return projectData.geoData
            } else {
                message = "The city name is incorrect";
                console.log(message)
                return message
            }
        } catch(error) {
            console.log(error)
        }
}


async function weatherbitForecast(req, res) {
    if (projectData.geoData) {
        const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${projectData.geoData.latitude}&lon=${projectData.geoData.longitude}&days=16&units=M&key=${weather_key}`

        const response = await fetch(url);
        try {
            const data = await response.json();

            data.data.forEach( function(each) {
                return projectData.weatherForecast[each.valid_date] = {
                   date: each.valid_date,
                   max_temp: each.max_temp,
                   min_temp: each.min_temp,
                   description: each.weather.description,
                   icon: each.weather.icon,
                   code: each.weather.code
                }
            });
        } catch (error) {
            console.log("no geoData")
        }
        console.log(projectData)
    }

}


app.get("/all", getData);

// Callback function to complete GET '/all'
function getData (req, res) {
    res.send(projectData);
}

app.get("/error", errorMessage);

async function errorMessage(req, res) {
    res.send(JSON.stringify(message));
    console.log("the message is sent", message)
}
