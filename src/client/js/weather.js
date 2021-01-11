/*const endpoint = "http://api.geonames.org/searchJSON?q=";
const userName = "&maxRows=10&username=cavilosa";
let latitude = "";
let longitude ="";
let country = "";

var d = new Date();*/

// Event listener to add function to existing HTML DOM element
//document.getElementById("new-save").addEventListener("click", generate);
//let data = {};
/* Function called by event listener */
export async function generate() {

    event.preventDefault();
    console.log("generate is on");

    getData()
    .then((data)=> {postData(data)});
}


export async function getData() {
    console.log("getdata is on")
    let destination = document.getElementById("destination").value;

    let regex = new RegExp(/\S/);

    if (regex.test(destination)) {
        destination = destination.trim();
        destination = encodeURIComponent(destination);
    } else {
        alert("Destination is not provided")
    }

    let departure = document.getElementById("departure").value;
    departure = encodeURIComponent(departure);

    let comeback = document.querySelector("#comeback").value;
    comeback = encodeURIComponent(comeback);

    let d = new Date();

    if(Date.parse(departure) <= Date.parse(comeback)){
        if (Date.parse(d.toISOString().slice(0, 10)) <= Date.parse(departure) ) {
            return {destination: destination, departure: departure,
                    comeback: comeback}
        }else{
            alert("The departure date can't be in past.")
        }
    }else{
        alert("The return date can't be before the end date");
    }
}


export async function postData (data) {
    console.log("post data", JSON.stringify({data}));
    const request = await fetch("http://localhost:8000/data", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({data:data})
    })
    try {
        const data = await request.json();
        const response = await fetch("http://localhost:8000/data");
        const message = response.json();
        alert(message)
        return data, response
    }catch(error){
        console.log(error)
    }



}

//export { getData, postData, generate}

/* Function to GET Web API Data*/
/*
export async function getWeather(url) {
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
}

export async function getDates() {
    let departureDate = document.getElementById("departure").value;
    console.log(data)
    let currentDate = d.toISOString().slice(0, 10);
    console.log(d);
}*/
