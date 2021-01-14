import { generate, getData, postData, getProjectData, upperCaseFirstChar, updateUI } from "./js/weather.js";
//import { getStorageData, checkStorage } from "./js/localStorage.js"
import "./styles/main.scss";
import "./styles/header.scss";
import "./styles/newtrip.scss";
import "./styles/weather.scss";
import img from "./images/travel.jpg";

let picture = document.querySelector("#img");
picture.src = img

document.getElementById("new-save").addEventListener("click", generate);

/*window.addEventListener("load", checkStorage)
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
}*/

export {
    generate,
    getData,
    postData,
    getProjectData,
    upperCaseFirstChar,
    //checkStorage,
    updateUI,
    //getStorageData
}
