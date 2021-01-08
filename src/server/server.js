const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();
let api_key = process.env.api_key;

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

app.post("/data", geoInfo);

async function geoInfo (req, res) {
    inputData = req.body.data // destination, departure, comback
    const url = `http://api.geonames.org/searchJSON?q=${inputData.destination}${api_key}`;
    const response = await fetch(url);
        if (response.status != 200) {
            window.alert("Weatherbit response failed");
            console.log("response status is", response.status)
        }

    const geoInfo = await response.json();
    console.log(geoInfo.geonames[0].toponymName)
    newEntry = {
        latitude: geoInfo.geonames[0].lat,
        longitude: geoInfo.geonames[0].lng,
        country: geoInfo.geonames[0].countryName,
        city: geoInfo.geonames[0].toponymName,
        countryCode: geoInfo.geonames[0].countryCode
    }
    geoData = newEntry; // latitude. longitude, country,
    console.log("geodata", geoData)
    console.log("inputData", inputData)
}



app.get("/all", getData);

// Callback function to complete GET '/all'
function getData (req, res) {
    res.send(projectData);
}
