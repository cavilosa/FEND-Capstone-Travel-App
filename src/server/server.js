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


let inputData = {}; // input info: city destination, departure and return dates

let geoData = {}; // lat, lng, city, country and countryCode

app.post("/data", retreiveInfo);

async function retreiveInfo(req, res) {
    getInput(req, res)
    .then ( () => {
        getGeoInfo()
        .then( () => {
            weatherForecast()
        } )
    } )
}


async function getInput (req, res) {
    inputData = req.body.data // destination, departure, comeback
    console.log("getinput", inputData)
    return inputData
}

async function getGeoInfo() {

    const url = `http://api.geonames.org/searchJSON?q=${inputData.destination}${api_key}`

    const response = await fetch(url);
        if (response.status !== 200) {
            console.log("response status is", response.status)
            req.send("wrong")
            function showDisplay(){
                alert('WARNING: Price must equal Contract Price.');
            }
        }
    try {
        const geoInfo = await response.json();

        geoData = {
            latitude: geoInfo.geonames[0].lat,
            longitude: geoInfo.geonames[0].lng,
            country: geoInfo.geonames[0].countryName,
            city: geoInfo.geonames[0].toponymName,
            countryCode: geoInfo.geonames[0].countryCode
        }
        console.log( "geodata", geoData)
        return geoData
    } catch (error) {
        console.log("error", error)
    }
}

async function weatherForecast(req, res) {

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${geoData.latitude}&lon=${geoData.longitude}&units=M&key=${weather_key}`

    const response = await fetch(url)
        if (response.status !=200) {
            console.log(response.status)
        }
    try {
        const data = await response.json();
        console.log("data", data.data[0])
    } catch (error) {
        console.log(error)
    }
}




app.get("/all", getData);

// Callback function to complete GET '/all'
function getData (req, res) {
    res.send(projectData);
}
