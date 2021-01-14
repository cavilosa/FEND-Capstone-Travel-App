export async function checkStorage() {
    if (!localStorage.getItem("projectData")) {
        console.log("no local sotrage data")
    }
    //console.log(localStorage)
    try {
        getStorageData()
        .then ( async (projectData) => {
            Client.updateUI(projectData)
        })
    }catch(e) {
        console.log(e)
    }
}

export async function getStorageData(){
    const projectData = JSON.parse(localStorage.getItem("projectData"))
    return projectData
}
