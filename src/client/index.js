import { generate, getData, postData, getRes } from "./js/weather.js";

import "./styles/main.scss";
import "./styles/header.scss";
import "./styles/newtrip.scss";
import "./styles/trip.scss";

document.getElementById("new-save").addEventListener("click", generate);
console.log("hello");

export {
    generate,
    getData,
    postData,
    getRes
}
