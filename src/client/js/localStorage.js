
export async function checkStorage() {
    if (!localStorage.getItem("projectData")) {
        console.log("no local sotrage data")
    }
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

/*
    try {
        getStorageData()
        .then ( async (projectData) => {
            console.log(projectData)
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

/*
export async function updateUI (projectData) {

    let destination = decodeURIComponent(projectData.inputData.destination)
    upperCaseFirstChar(destination)

    .then ((destination)=>{

        document.querySelector(".destination").innerText = `My trip to: ${destination}`;

        const pictureDiv = document.querySelector(".picture")
        const url = projectData.picture
        document.querySelector("img").src = url;

    })
}

export async function upperCaseFirstChar (string) {
    const words = string.split(" ");

    for ( let i = 0; i < words.length; i++) {
        let word = words[i];
        word = word[0].toUpperCase() + word.slice(1)
        console.log(word)
        words[i] = word
    }
    console.log(words)
    return words.join(" ")
}*/
