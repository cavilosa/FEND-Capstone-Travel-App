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

let projectData = {};

app.post("/departure", departureDate);

function departureDate(req, res) {
    departureDate = {
        departureDate: req.body.departureDate;
    }
    projectData = departureDate;
}

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
