export async function removeTrip(e){
    e.preventDefault();
    console.log("removeTrip is on")
    //console.log("localstorage", localStorage
    localStorage.clear()
    location.reload()
    //console.log("LOCAL storgae", localStorage.getItem("projectData"))
}

export async function clearInput(e){
    console.log("clear input is on")
    document.querySelector("#destination").value = "";
    document.querySelector("#departure").value = "";
    document.querySelector("#comeback").value = "";

}
