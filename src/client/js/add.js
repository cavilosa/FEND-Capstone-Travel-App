import { updateUI } from "./generateInfo.js"

export async function lodging(e){
    e.preventDefault();
    console.log("add lodging")

    let oldItems = JSON.parse(localStorage.getItem("projectData"))
    console.log(oldItems)

    if (oldItems === null) {
        return alert("Create a trip first")
    } else {
        let oldItems = JSON.parse(localStorage.getItem("projectData"))
        //console.log(oldItems)

        const lodging = document.querySelector("#lodging");

        let parent = document.querySelector(".add-more-info")

        const divLodging = document.createElement("div")
        divLodging.classList.add("divLodging");

        let input = document.createElement("INPUT");
        input.classList.add("input-lodging")
        //console.log(input.classList)

        divLodging.insertBefore(input, divLodging.firstChild)

        lodging.style.display = "none";

        let submit = document.createElement("BUTTON")
        submit.innerHTML = "Save Lodging"
        submit.classList.add("save-lodging");

        divLodging.insertBefore(submit, divLodging.firstElementChild.nextSibling)

        submit.addEventListener("click", saveLodging)

        parent.insertBefore(divLodging, parent.firstChild)
    }

}

export async function saveLodging(e){
    e.preventDefault();
    console.log("save lodging")

    let projectData = JSON.parse(localStorage.getItem("projectData"))

    let inputValue = document.querySelector(".input-lodging").value;

    let input = {"lodging" : `${inputValue}`}
    //console.log(projectData.inputData, input)

    projectData.lodging = inputValue

    localStorage.setItem("projectData", JSON.stringify(projectData))
    console.log(localStorage)

    updateUI(projectData)

    document.querySelector(".divLodging").style.display = "none";









}
