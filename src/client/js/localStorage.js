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
