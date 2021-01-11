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
            weatherbit()
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
        if (response.status != 200) {
            console.log("response status is", response.status)
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

async function weatherbit(req, res) {
    // creating var for weather forecast - next day after arrival
    let end_date = new Date(inputData.departure);  // new date as of departure
    end_date.setDate(end_date.getDate() + 1) // nex day in calendar calculated

    // extracting only neaded info from the date - year-month-day
    end_date = end_date.toISOString().slice(0, 10)
    end_date = encodeURIComponent(end_date);  // representing the provided string encoded as a URI component

    const url = `https://api.weatherbit.io/v2.0/history/daily?&lat=${geoData.latitude}&lon=${geoData.longitude}&start_date=${inputData.departure}&end_date=${end_date}&units=M&key=${weather_key}`
    console.log("url", url)
    const response = await fetch(url)
        if (response.status !=200) {
            console.log(response.status)
        }
    try {
        const data = await response.json();
        console.log("data", data.data)
    } catch (error) {
        console.log(error)
    }
}




app.get("/all", getData);

// Callback function to complete GET '/all'
function getData (req, res) {
    res.send(projectData);
}
