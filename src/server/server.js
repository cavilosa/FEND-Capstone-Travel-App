const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

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
