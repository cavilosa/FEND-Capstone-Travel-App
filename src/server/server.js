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

let projectData = {inputData: {}, geoData: {}, picture: {}}


app.post("/data", retrieveInput);

async function retrieveInput(req, res) {
    getInput(req, res)
    .then ( () => {
        getGeoInfo()
        .then( () => {
            pixabay()
            .then( ()=> {
                console.log("/all is on")
                allData(req, res)
            })
        })
    })
}

app.get("/all", allData);

async function allData(req, res) {
    console.log("/all is on")
    res.send(projectData)
    //console.log(projectData)
}


async function getInput(req, res) {
    console.log("1 get input")
    if (req) {
        projectData.inputData = req.body.data // destination, departure, comeback
        //console.log("project input", projectData.inputData)
        return projectData.inputData
    }else{
        console.log("the input is empty")
    }
}

async function getGeoInfo(req, res) {
    console.log("2 get geo info")

    const url = `http://api.geonames.org/searchJSON?q=${projectData.inputData.destination}${api_key}`

    const response = await fetch(url);

    try {
        const geoInfo = await response.json();
        console.log("geoinfo", geoInfo)
        if (geoInfo.totalResultsCount === 0){
            return projectData.geoData = {};
        }else{
            projectData.geoData = {
                latitude: geoInfo.geonames[0].lat,
                longitude: geoInfo.geonames[0].lng,
                country: geoInfo.geonames[0].countryName,
                city: geoInfo.geonames[0].toponymName,
                countryCode: geoInfo.geonames[0].countryCode
            }
            //console.log("geodata", projectData.geoData)
            return projectData.geoData
        }
        console.log("2 geo info geo data", projectData.geoData)
    } catch (error) {
        console.log("error", error)
    }
}


async function pixabay () {
    console.log("3 pixabay")

    const url = `https://pixabay.com/api/?key=${pixabay_key}&q=${projectData.geoData.city}&category=places&image_type=photo`
    //console.log("url", url)
    const response = await fetch(url)
    //console.log("respose", response)
    try {
        const data = await response.json();
        //console.log("data", data)
        if (data.totalHits >= 1) {
            projectData.picture = data.hits[0].largeImageURL
            console.log("picture url", projectData.picture)
            return projectData.picture, projectData
        } else if (data.totalHits === 0)  {
            const url = `https://pixabay.com/api/?key=${pixabay_key}&q=${projectData.geoData.country}&category=places&image_type=photo`
            const response = await fetch(url)
            try{
                const data = await response.json();
                projectData.picture = data.hits[0].largeImageURL
                //console.log(projectData.picture)
                return projectData.picture, projectData
            }catch(error) {
                console.log(error)
            }
        }
    }catch(error) {
        console.log(error)
    }
}



let weatherForecast = {};
let geoData = {};
//let router = express.Router();

app.route("/forecast")

    .post(async function(req, res){
        storageInfo(req, res)
    })

    .get(async function(req, res){
        weatherbitForecast(geoData)
        const geo = await weatherbitForecast(geoData)
        console.log(" 3 geo", Object.values(geo)[0])
        res.send(weatherForecast);
        console.log("4 newforecast sent", Object.values(weatherForecast)[0])
    })


async function storageInfo(req, res) {
    geoData = req.body.data;
    console.log("1", geoData)
    return geoData
}


async function weatherbitForecast(geoData) {
    console.log("2", geoData)
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${geoData.latitude}&lon=${geoData.longitude}&days=16&units=M&key=${weather_key}`
    const response = await fetch(url)

    try {
        const data = await response.json();
        //console.log(data)
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
        //console.log("bit func", Object.values(weatherForecast)[0])
        return weatherForecast
    } catch (error) {
        console.log(error)
    }
}
