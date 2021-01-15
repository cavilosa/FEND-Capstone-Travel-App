export async function removeTrip(e){
    console.log("removeTrip is on")
    localStorage.clear()
    location.reload()
}

export async function clearInput(){
    document.querySelector("#destination").innerText = "";
    document.querySelector("#departure").innerText = "";
    document.querySelector("#comeback").innerText = "";

}
