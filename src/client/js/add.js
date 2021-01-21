

export async function lodging(e){
    e.preventDefault();
    console.log("add lodging")

    let oldItems = JSON.parse(localStorage.getItem("projectData"))
    //console.log(oldItems)

    const lodging = document.querySelector("#lodging");

    if (lodging.childNodes.length === 1){

        let parent = document.querySelector(".add-more-info")

        let input = document.createElement("INPUT");
        input.classList.add("input-lodging")
        console.log(input.classList)

        parent.insertBefore(input, parent.firstChild)

        lodging.style.display = "none";

        let submit = document.createElement("BUTTON")
        submit.innerHTML = "Save Lodging"
        submit.classList.add("save-lodging");

        parent.insertBefore(submit, parent.firstElementChild.nextSibling)

        submit.addEventListener("click", saveLodging)
    }
}

export async function saveLodging(e){
    e.preventDefault();
    console.log("save lodging")

    let input = document.querySelector(".input-lodging").value;

    console.log(input)
}
