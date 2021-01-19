export async function removeTrip(e){
    e.preventDefault();
    console.log("removeTrip is on")
    //console.log("localstorage", localStorage
    localStorage.clear()
    location.reload()
    //console.log("LOCAL storgae", localStorage.getItem("projectData"))
}

export async function clearInput(){
    document.querySelector("#destination").innerText = "";
    document.querySelector("#departure").innerText = "";
    document.querySelector("#comeback").innerText = "";

}
