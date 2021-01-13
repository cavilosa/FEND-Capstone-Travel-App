import { generate, getData, postData, getProjectData } from "./js/weather.js";

import "./styles/main.scss";
import "./styles/header.scss";
import "./styles/newtrip.scss";
import "./styles/trip.scss";
import img from "./images/travel.jpg";

let picture = document.querySelector("#img");
picture.src = img

document.getElementById("new-save").addEventListener("click", generate);


export {
    generate,
    getData,
    postData,
    getProjectData
}
