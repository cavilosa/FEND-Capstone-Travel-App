import { generate, getData, postData, getProjectData, upperCaseFirstChar, updateUI, countdown } from "./js/generateInfo.js";
//import { , countdown } from "./js/localStorage.js"
import { weatherForecast, newForecast, updateWeatherUI } from "./js/weatherForecast.js"
import { removeTrip, clearInput } from "./js/removeTrip.js"
import "./styles/main.scss";
import "./styles/header.scss";
import "./styles/newtrip.scss";
import "./styles/footer.scss";
import "./styles/media.scss";
import "./styles/weather.scss";
import img from "./images/travel.jpg";
import geoNames from "./images/geoNames.png";
import weatherbit from "./images/weatherbit.png";

let picture = document.querySelector("#img");
picture.src = img

let image = document.querySelector("#geoNames");
image.src = geoNames

let weatherbitPic = document.querySelector("#weatherbit");
weatherbitPic.src = weatherbit

document.getElementById("new-save").addEventListener("click", generate);

window.addEventListener("load", checkStorage)

async function checkStorage() {
    if (!localStorage.getItem("projectData")) {
        console.log("no local sotrage data")
    } else {
        try {
            getStorageData()
            .then ( async (projectData) => {
                countdown( projectData)
                .then( async(projectData) => {
                    updateUI(projectData)
                })
            })

        }catch(e) {
            console.log(e)
        }
    }
}

async function getStorageData(){
    console.log("get storage data is on")
    const projectData = JSON.parse(localStorage.getItem("projectData"))
    return projectData
}



document.querySelector("#weather").addEventListener("click", weatherForecast);

document.querySelector("#remove").addEventListener("click", removeTrip);

document.querySelector("#new-remove").addEventListener("click", clearInput);

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
    removeTrip,
    clearInput
}
