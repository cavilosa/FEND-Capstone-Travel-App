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

//let geoData = {}; // lat, lng, city, country and countryCode

app.post("/data", retreiveInfo);

async function retreiveInfo(req, res) {
    getInput(req, res)
    .then ( (inputData) => { getGeoInfo(inputData) } )
    //.then( (geoData) => { weatherbit(geoData) } )
        .then( async (result) => {
            console.log(result)
        } )
}


async function getInput (req, res) {
    inputData = req.body.data // destination, departure, comeback
    console.log("getinput", inputData)
    return inputData
}

async function getGeoInfo(inputData) {

    const url = `http://api.geonames.org/searchJSON?q=${inputData.destination}${api_key}`

    const response = await fetch(url);
        if (response.status != 200) {
            console.log("response status is", response.status)
        }
    try {
        const geoInfo = await response.json();

        newEntry= {
            latitude: geoInfo.geonames[0].lat,
            longitude: geoInfo.geonames[0].lng,
            country: geoInfo.geonames[0].countryName,
            city: geoInfo.geonames[0].toponymName,
            countryCode: geoInfo.geonames[0].countryCode
        }
        //console.log("newentry", newEntry, "geodata", geoData)
        const geoData = newEntry;
        console.log( "geodata", geoData)
        return geoData
    } catch (error) {
        console.log("error", error)
    }
    //return geoData
    //.then( (geoData) => { console.log("then geodata", geoData, "then inputData", inputData)})
}

async function weatherbit(geoData, inputData) {
    console.log(geoData, inputData)
    const url = `https://api.weatherbit.io/v2.0/history/daily&lat=${geoData.latitude}&lon=${geoData.longitude}&start_date=${inputData.departure}&end_date=${inputData.comeback}&key=${weather_key}`
    console.log(url)

}



app.get("/all", getData);

// Callback function to complete GET '/all'
function getData (req, res) {
    res.send(projectData);
}
