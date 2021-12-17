import { generate, getData, postData, getProjectData, updateUI, countdown, changeDate } from "./js/generateInfo.js";
import { weatherForecast, newForecast, updateWeatherUI, dateFormat } from "./js/weatherForecast.js";
import { removeTrip, clearInput } from "./js/removeTrip.js";
import { lodging, saveLodging, saveNotes, addNotes } from "./js/add.js";
import { checkStorage, getStorageData } from "./js/localStorage.js"

import "./styles/main.scss";
import "./styles/header.scss";
import "./styles/newtrip.scss";
import "./styles/footer.scss";
import "./styles/media.scss";
import "./styles/weather.scss";
import "./styles/add-info.scss";
import img from "./images/travel.jpg";
import geoNames from "./images/geoNames.png";
import weatherbit from "./images/weatherbit.png";


// Installing service worker for production mode only
if (process.env.NODE_ENV === "production") {
    // Check that service workers are supported
    if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
            console.log("Installing service workers in production")
            navigator.serviceWorker.register('./service-worker.js');
        });
    } else {
        console.log("Service worker installation skipped!");
    }
} else {
    console.log("Service worker installation skipped!");
}

// Exporting main image for further use in other js files
export async function imageMain () {
    let picture = document.querySelector("#img");
    return picture.src = img
}

imageMain();

// Geonames picture
let image = document.querySelector("#geoNames");
image.src = geoNames

// Weatherbit picture
let weatherbitPic = document.querySelector("#weatherbit");
weatherbitPic.src = weatherbit

// Main funcion
document.getElementById("new-save").addEventListener("click", generate);

// Add lodging info to existing trip
document.querySelector("#lodging").addEventListener("click", lodging);

// Get weather forecast
document.querySelector("#weather").addEventListener("click", weatherForecast);

// Delete trip
document.querySelector("#remove").addEventListener("click", removeTrip);

// Clear the input fields
document.querySelector("#new-remove").addEventListener("click", clearInput);

// Add notes to existing trip
document.querySelector("#notes").addEventListener("click", addNotes);

// Use localStorage to fill in the trip info on load
window.addEventListener("load", checkStorage)

export {
    generate,
    getData,
    postData,
    getProjectData,
    checkStorage,
    updateUI,
    getStorageData,
    weatherForecast,
    newForecast,
    updateWeatherUI,
    removeTrip,
    clearInput,
    lodging,
    saveLodging,
    saveNotes,
    addNotes,
    dateFormat,
    changeDate
}
