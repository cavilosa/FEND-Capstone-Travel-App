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
let pixabay_key = process.env.pixabay_key;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static("dist"));
const port = 8080;

app.get("/", function (req, res) {
    res.sendFile("dist/index.html")
})

const server = app.listen(port, () => {
    console.log("Server is running on port 8080");
})

// Main project object that sores all the information
let projectData = {inputData: {}, geoData: {}, picture: {}}

app.post("/data", retrieveInput);

async function retrieveInput(req, res) {
    getInput(req, res)
    .then ( () => {
        getGeoInfo()
        .then( () => {
            pixabay()
            .then( ()=> {
                allData(req, res)
            })
        })
    })
}


// The route to send mainobject to clint side
app.get("/all", allData);

async function allData(req, res) {
    res.send(projectData)
}


// Receives input info from client side
async function getInput(req, res) {
    if (req) {
        projectData.inputData = req.body.data // destination, departure, comeback
        return projectData.inputData
    }else{
        console.log("the input is empty")
    }
}


// API to fetch geo information regardinf the input destination
async function getGeoInfo(req, res) {

const url = `http://api.geonames.org/searchJSON?q=${projectData.inputData.destination}&maxRows=10&username=${api_key}`

    const response = await fetch(url);
    try {
        const geoInfo = await response.json();
        if (geoInfo.totalResultsCount === 0){
            return projectData.geoData = {};
        } else {
            projectData.geoData = {
                latitude: geoInfo.geonames[0].lat,
                longitude: geoInfo.geonames[0].lng,
                country: geoInfo.geonames[0].countryName,
                city: geoInfo.geonames[0].toponymName,
                countryCode: geoInfo.geonames[0].countryCode
            }
            return projectData.geoData
        }
    } catch (error) {
        console.log("error", error)
    }
}


// API call to et picture of the city or f the country of destination
// On the client side, when there is no city of country img, will return initial picture
async function pixabay () {
    const city = encodeURIComponent(projectData.geoData.city)
    const url = `https://pixabay.com/api/?key=${pixabay_key}&q=${city}&category=places&image_type=photo`
    const response = await fetch(url)
    try {
        const data = await response.json();
        if (data.totalHits >= 1) {
            projectData.picture = data.hits[0].largeImageURL
            return projectData.picture, projectData
        } else if (data.totalHits === 0)  { // if no city image is available,  will fetch county img
            const country = encodeURIComponent(projectData.geoData.country)
            const url = `https://pixabay.com/api/?key=${pixabay_key}&q=${country}&category=places&image_type=photo`
            const response = await fetch(url)
            try{
                const data = await response.json();
                if (data.totalHits === 0) {
                    projectData.picture = ""
                    return projectData.picture, projectData
                } else {
                    projectData.picture = data.hits[0].largeImageURL
                    return projectData.picture, projectData
                }
            }catch(error) {
                console.log(error)
            }
        }
    }catch(error) {
        console.log(error)
    }
}


// Main weather forecast object
let weatherForecast = {};

// Geo info objety received fom localSotrage
let geoData = {};

app.route("/forecast") // Using same route for post and get requests

    .post(async function(req, res){
        storageInfo(req, res)
    })

    .get(async function(req, res){
        weatherbitForecast(geoData)
        const geo = await weatherbitForecast(geoData)
        res.send(weatherForecast);
    })


// Getting geo info from localStorage on the client side
async function storageInfo(req, res) {
    geoData = req.body.data;
    return geoData
}


// API to get wather forecast, uses global geoData oject
async function weatherbitForecast(geoData) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${geoData.latitude}&lon=${geoData.longitude}&days=16&units=M&key=${weather_key}`
    const response = await fetch(url)
    try {
        const data = await response.json();
        data.data.forEach( function(each) {
            return weatherForecast[each.valid_date] = {
               date: each.valid_date,
               max_temp: each.max_temp,
               min_temp: each.min_temp,
               description: each.weather.description,
               icon: each.weather.icon,
               code: each.weather.code
            }
        });
        return weatherForecast
    } catch (error) {
        console.log(error)
    }
}

// exporting functions and srver for jest testings
module.exports = server, getInput, storageInfo, weatherbitForecast;
