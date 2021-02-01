import { updateUI } from "./generateInfo.js"

export async function lodging(e){
    e.preventDefault();
    //console.log("add lodging")

    let oldItems = JSON.parse(localStorage.getItem("projectData"))
    //console.log(oldItems)

    if (oldItems === null) {

        return alert("Create a trip first")

    } else {

        //let oldItems = JSON.parse(localStorage.getItem("projectData"))
        //console.log(oldItems)

        const lodging = document.querySelector("#lodging");

        let parent = document.querySelector(".add-more-info")

        const divLodging = document.createElement("div")
        divLodging.classList.add("divLodging");

        let input = document.createElement("textarea");
        input.classList.add("input-lodging")
        input.columns = "20"
        //console.log(input.classList)

        divLodging.insertBefore(input, divLodging.firstChild)

        lodging.style.display = "none";

        let submit = document.createElement("BUTTON")
        submit.innerHTML = "Save Lodging"
        submit.classList.add("save-info");

        divLodging.insertBefore(submit, divLodging.firstElementChild.nextSibling)

        submit.addEventListener("click", saveLodging)

        parent.insertBefore(divLodging, parent.firstChild)
    }

}

export async function saveLodging(e){
    e.preventDefault();
    //console.log("save lodging")

    let projectData = JSON.parse(localStorage.getItem("projectData"))

    let inputValue = document.querySelector(".input-lodging").value;

    let regex = new RegExp(/\S/);

    if (regex.test(inputValue)) {
        let input = {"lodging" : `${inputValue}`}
        //console.log(projectData.inputData, input)

        projectData.lodging = inputValue

        localStorage.setItem("projectData", JSON.stringify(projectData))
        //console.log(localStorage)

        updateUI(projectData)

        document.querySelector(".divLodging").style.display = "none";
    } else {
        return alert("Lodging info is empty")
    }
}


export async function addNotes(e){
    //console.log("save list is on")
    let oldItems = JSON.parse(localStorage.getItem("projectData"))

    const notes = document.querySelector("#notes")

    let projectData = JSON.parse(localStorage.getItem("projectData"))

    if (oldItems === null) {

        return alert("Create your trip first")

    } else {
        let parent = document.querySelector(".add-more-info")

        const divNotes = document.createElement("div")
        divNotes.classList.add("divNotes");

        let input = document.createElement("textarea");
        input.classList.add("input-notes")
        //console.log(input.classList)

        divNotes.insertBefore(input, divNotes.firstChild)

        notes.style.display = "none";

        let submit = document.createElement("BUTTON")
        submit.innerHTML = "Save Notes"
        submit.classList.add("save-info");

        divNotes.insertBefore(submit, divNotes.firstElementChild.nextSibling)

        submit.addEventListener("click", saveNotes)

        parent.insertBefore(divNotes, parent.firstElementChild.nextSibling)
    }
}

export async function saveNotes(e){
    //console.log("saveList")

    let projectData = JSON.parse(localStorage.getItem("projectData"))

    let notesValue = document.querySelector(".input-notes").value;

    let regex = new RegExp(/\S/);

    if (regex.test(notesValue)) {

        let input = {"notes": `${notesValue}`}
        //console.log(projectData.inputData, input)

        projectData.notes = notesValue

        localStorage.setItem("projectData", JSON.stringify(projectData))
        //console.log(localStorage)

        updateUI(projectData)

        document.querySelector(".divNotes").style.display = "none";
    } else {
        return alert("Lodging info is empty")
    }
}
