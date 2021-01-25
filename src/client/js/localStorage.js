import { updateUI, countdown } from "./generateInfo.js"

export async function checkStorage() {
    if (!localStorage.getItem("projectData")) {
        console.log("no local sotrage data")
    }
    //console.log(localStorage)
    try {
        getStorageData()
        .then ( async (projectData) => {
            updateUI(projectData)
        })

        .then( async(projectData) => {
            if (localStorage){
                countdown( projectData)
            } else {
                console.log("no local")
            }

        })

    }catch(e) {
        console.log(e)
    }
}

export async function getStorageData(){
    const projectData = JSON.parse(localStorage.getItem("projectData"))
    return projectData
}
/*
export async function countdown(projectData) {

    let today = new Date().toISOString().slice(0, 10);

    let departure = projectData.inputData.departure;

    const milliseconds = Date.parse(departure) - Date.parse(today);

    var days = Math.floor( milliseconds / (1000 * 60 * 60 * 24));

    const countdown = document.querySelector(".countdown")
    countdown.classList.add("countdown")
    if (days === 1) {
        countdown.innerText = `Your trip is 1 day away.`

    } else if (days === 0) {
        countdown.innerText = `Your trip is today!`
    }else {
        countdown.innerText = `Your trip is ${days} days away.`
    }
}*/
