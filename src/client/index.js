import { generate, getData, postData, getProjectData, upperCaseFirstChar, updateUI } from "./js/generateInfo.js";
//import { getStorageData } from "./js/localStorage.js"
import { weatherForecast, newForecast, updateWeatherUI } from "./js/weatherForecast.js"
import { removeTrip } from "./js/removeTrip.js"
import "./styles/main.scss";
import "./styles/header.scss";
import "./styles/newtrip.scss";
import "./styles/weather.scss";
import img from "./images/travel.jpg";

let picture = document.querySelector("#img");
picture.src = img

document.getElementById("new-save").addEventListener("click", generate);

window.addEventListener("load", checkStorage)

async function checkStorage() {
    if (!localStorage.getItem("projectData")) {
        console.log("no local sotrage data")
    }
    //console.log(localStorage)
    try {
        getStorageData()
        .then ( async (projectData) => {
            updateUI(projectData)
        })
    }catch(e) {
        console.log(e)
    }
}

async function getStorageData(){
    const projectData = JSON.parse(localStorage.getItem("projectData"))
    return projectData
}

document.querySelector("#weather").addEventListener("click", weatherForecast);

document.querySelector("#remove").addEventListener("click", removeTrip)

export {
    generate,
    getData,
    postData,
    getProjectData,
    upperCaseFirstChar,
    checkStorage,
    updateUI,
    getStorageData,
    weatherForecast,
    newForecast,
    updateWeatherUI,
    removeTrip
}
