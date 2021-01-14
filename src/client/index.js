import { generate, getData, postData, getProjectData, upperCaseFirstChar, updateUI, getStorageData,checkStorage } from "./js/weather.js";

import "./styles/main.scss";
import "./styles/header.scss";
import "./styles/newtrip.scss";
import "./styles/trip.scss";
import img from "./images/travel.jpg";

let picture = document.querySelector("#img");
picture.src = img

document.getElementById("new-save").addEventListener("click", generate);

window.addEventListener("load", checkStorage)


export {
    generate,
    getData,
    postData,
    getProjectData,
    upperCaseFirstChar,
    checkStorage,
    updateUI,
    getStorageData
}
