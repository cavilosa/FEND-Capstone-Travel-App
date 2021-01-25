import { updateUI } from "./generateInfo.js"

export async function lodging(e){
    e.preventDefault();
    console.log("add lodging")

    let oldItems = JSON.parse(localStorage.getItem("projectData"))
    console.log(oldItems)

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
    console.log("save lodging")

    let projectData = JSON.parse(localStorage.getItem("projectData"))

    let inputValue = document.querySelector(".input-lodging").value;

    let regex = new RegExp(/\S/);

    if (regex.test(inputValue)) {
        let input = {"lodging" : `${inputValue}`}
        //console.log(projectData.inputData, input)

        projectData.lodging = inputValue

        localStorage.setItem("projectData", JSON.stringify(projectData))
        console.log(localStorage)

        updateUI(projectData)

        document.querySelector(".divLodging").style.display = "none";
    } else {
        return alert("Lodging info is empty")
    }
}


export async function addList(e){
    console.log("save list is on")
    let oldItems = JSON.parse(localStorage.getItem("projectData"))

    const list = document.querySelector("#list")

    let projectData = JSON.parse(localStorage.getItem("projectData"))

    if (oldItems === null) {

        return alert("Create your trip first")

    } else {
        let parent = document.querySelector(".add-more-info")

        const divList = document.createElement("div")
        divList.classList.add("divList");

        let input = document.createElement("textarea");
        input.classList.add("input-list")
        //console.log(input.classList)

        divList.insertBefore(input, divList.firstChild)

        list.style.display = "none";

        let submit = document.createElement("BUTTON")
        submit.innerHTML = "Save List"
        submit.classList.add("save-info");

        divList.insertBefore(submit, divList.firstElementChild.nextSibling)

        submit.addEventListener("click", saveList)

        parent.insertBefore(divList, parent.firstElementChild.nextSibling)
    }
}

export async function saveList(e){
    console.log("saveList")

    let projectData = JSON.parse(localStorage.getItem("projectData"))

    let listValue = document.querySelector(".input-list").value;

    let regex = new RegExp(/\S/);

    if (regex.test(listValue)) {

        let input = {"packingList" : `${listValue}`}
        //console.log(projectData.inputData, input)

        projectData.packingList = listValue

        localStorage.setItem("projectData", JSON.stringify(projectData))
        console.log(localStorage)

        updateUI(projectData)

        document.querySelector(".divList").style.display = "none";
    } else {
        return alert("Lodging info is empty")
    }
}
