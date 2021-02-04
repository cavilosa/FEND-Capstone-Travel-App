import { updateUI, countdown } from "./generateInfo.js"

export async function checkStorage() {
    if (!localStorage.getItem("projectData")) {
        console.log("no local sotrage data")
    }
    try {
        getStorageData()
        .then ( async (projectData) => {
            updateUI(projectData) // Fill in the UI with savedtrip info
        })

        .then( async(projectData) => {
            if (localStorage){
                countdown( projectData) // Calculate remaining days till departure
            } else {
                console.log("no local")
            }
        })
    }catch(e) {
        console.log(e)
    }
}


// Check if local Storage has saved trip
export async function getStorageData(){
    const projectData = JSON.parse(localStorage.getItem("projectData"))
    return projectData
}
