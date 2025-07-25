import { updateUI } from "./generateInfo.js"

// Saving lodging info
export async function lodging(e){
    e.preventDefault();

    let oldItems = JSON.parse(localStorage.getItem("projectData"))

    // Lodging can be added only to existing trip
    if (oldItems === null) {
        return alert("Create a trip first")
    } else {

        const lodging = document.querySelector("#lodging");

        let parent = document.querySelector(".add-more-info")
        // Creates a div with input and save fields
        const divLodging = document.createElement("div")
        divLodging.classList.add("divLodging");

        let input = document.createElement("textarea");
        input.classList.add("input-lodging")
        input.columns = "20"

        divLodging.insertBefore(input, divLodging.firstChild)
        // add lodging button is not needed anymore
        lodging.style.display = "none";

        let submit = document.createElement("BUTTON")
        submit.innerHTML = "Save Lodging"
        submit.classList.add("save-info");

        divLodging.insertBefore(submit, divLodging.firstElementChild.nextSibling)
        // On submit saves the loading info to localStorage and updates the UI
        submit.addEventListener("click", saveLodging)

        parent.insertBefore(divLodging, parent.firstChild)
    }

}

export async function saveLodging(e){
    e.preventDefault();

    let projectData = JSON.parse(localStorage.getItem("projectData"))
    // User input
    let inputValue = document.querySelector(".input-lodging").value;

    let regex = new RegExp(/\S/);// To check if the lodging input is not empty

    if (regex.test(inputValue)) {
        let input = {"lodging" : `${inputValue}`}

        projectData.lodging = inputValue

        localStorage.setItem("projectData", JSON.stringify(projectData)) // setting the value to local storage

        updateUI(projectData) // updating the Ui including lodging info now

        document.querySelector(".divLodging").style.display = "none"; // add lodging button is gone
    } else {
        return alert("Lodging info is empty")
    }
}


// Addling notes to existing trip
export async function addNotes(e){
    let oldItems = JSON.parse(localStorage.getItem("projectData"))

    const notes = document.querySelector("#notes")

    let projectData = JSON.parse(localStorage.getItem("projectData"))
    // Notes can be added to existing trip only
    if (oldItems === null) {
        return alert("Create your trip first")
    } else {
        let parent = document.querySelector(".add-more-info")
        // Creating div with input and save fields
        const divNotes = document.createElement("div")
        divNotes.classList.add("divNotes");

        let input = document.createElement("textarea");
        input.classList.add("input-notes")

        divNotes.insertBefore(input, divNotes.firstChild)

        notes.style.display = "none";

        let submit = document.createElement("BUTTON")
        submit.innerHTML = "Save Notes"
        submit.classList.add("save-info");

        divNotes.insertBefore(submit, divNotes.firstElementChild.nextSibling)
        // eventlistener to a button for saving the notes
        submit.addEventListener("click", saveNotes)

        parent.insertBefore(divNotes, parent.firstElementChild.nextSibling)
    }
}


// Savign the notes
export async function saveNotes(e){

    let projectData = JSON.parse(localStorage.getItem("projectData"))
    // Input notes value
    let notesValue = document.querySelector(".input-notes").value;

    let regex = new RegExp(/\S/);

    if (regex.test(notesValue)) {

        let input = {"notes": `${notesValue}`}

        projectData.notes = notesValue

        localStorage.setItem("projectData", JSON.stringify(projectData))

        updateUI(projectData)

        document.querySelector(".divNotes").style.display = "none";
    } else {
        return alert("Notes are empty")
    }
}
