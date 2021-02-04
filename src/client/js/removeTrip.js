// Deletes existing trip
export async function removeTrip(e){
    e.preventDefault();
    console.log("removeTrip is on")
    localStorage.clear()
    location.reload()
}

// Cleares the input fields
export async function clearInput(e){
    console.log("clear input is on")
    document.querySelector("#destination").value = "";
    document.querySelector("#departure").value = "";
    document.querySelector("#comeback").value = "";

}
