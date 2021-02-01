import img from "../images/travel.jpg";

export async function generate(event) {
    event.preventDefault();
    console.log("generate is on");
    console.log("generate local storage", localStorage.getItem("projectData"))

    getData()
    .then( async(data)=> {
        const post = await postData(data)
    })
    .then( async () => {
        const project = await getProjectData()
    })
}


export async function getData() {
    console.log("getdata is on")
    document.querySelector(".forecast").innerHTML = ""

    let destination = document.getElementById("destination").value;
    let departure = document.getElementById("departure").value;
    let comeback = document.querySelector("#comeback").value;

    let regex = new RegExp(/\S/);

    let d = new Date();

    if (destination !== "") {
        if (regex.test(destination)) {
            destination = destination.trim();
            destination = encodeURIComponent(destination);
        }
        if (departure) {
            departure = encodeURIComponent(departure);
            if (comeback){
                comeback = encodeURIComponent(comeback);
                if(Date.parse(departure) <= Date.parse(comeback)){
                    if (Date.parse(d.toISOString().slice(0, 10)) <= Date.parse(departure) ) {

                        return {destination: destination, departure: departure,
                                comeback: comeback}
                    }else{
                        throw alert("The departure date can't be in past.")
                    }
                }else{
                    throw alert("The return date can't be before the end date")
                }

            }else{
                throw alert("Please, fill in the return date")
            }
        }else{
            throw alert("Please, fill in the departure date")
        }
    }else{
        throw alert ("Please, fill in the destination")
    }
}


export async function postData (data) {
    console.log("postdata is on")
    if (data !== undefined) {
        const request = await fetch("http://localhost:8000/data", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({data:data})
        })
        try {
            const data = await request.json();
            return data
        }catch(error){
            console.log(error)
        }
    }else{
        console.log("The input information is undefined")
    }
}


export async function getProjectData(){

    console.log("getProjectData is on")
    const request = await fetch("http://localhost:8000/all");
    try{
        const data = await request.json();
        console.log("data", Object.values(data))
        if (Object.values(data)[1].longitude === undefined) {
            throw alert("The destination is incorrect, please choose other destination")
        }
        Promise.resolve(data)
        .then(function(value){
            let data = value
            //console.log("getProjectData() is returning data")
            return data
        })
            .then((data)=>{
            //console.log("data", data)
            localStorage.setItem("projectData", JSON.stringify(data))
            const projectData = JSON.parse(localStorage.getItem("projectData"))
            //console.log("projectData is setting to localStorage")
            return projectData
            })
                .then( async (projectData)=> {
                    updateUI(projectData)
                })

    }catch(error){
        console.log(error)
    }
}

export async function updateUI (projectData) {
    console.log("update ui is on")
    if(projectData){
        const list = document.querySelectorAll(".destination")

        list[0].innerText = `${projectData.geoData.city}, ${projectData.geoData.country}`;

        const pictureDiv = document.querySelector(".picture")

        const url = projectData.picture

        if (projectData.picture !== ""){
            document.querySelector("img").src = url;
        } else {
            document.querySelector("img").src = img;
        }
        console.log("string", projectData.inputData.departure)
        changeDate(projectData)
        .then (async(newDate) => {
            document.querySelector(".departure").innerText = `${newDate[0]} ${newDate[1]}, ${newDate[2]}`;

            const comeback = projectData.inputData.comeback.split("-").reverse().join("-");
            document.querySelector(".comeback").innerText = `${newDate[3]} ${newDate[4]}, ${newDate[5]}`;;
        })
        /*const monthNames = ["January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December"];

        let day = projectData.inputData.departure.toString();
        day = day[8] + day[9]

        let month = projectData.inputData.departure.toString()
        let monthNumber = month[5] + month[6]
        if(monthNumber[0] === "0"){
            month = month[6]
        } else {
            month = month[5] + month[6]
        }
        month = month - 1

        let year = projectData.inputData.departure.toString()
        year = year[0] + year[1] + year[2] + year[3]*/
        //console.log("day and month", day, monthNames[month])

        //const departure = projectData.inputData.departure.split("-").reverse().join("-");



        if (projectData.lodging){
            const lodgingButton = document.querySelector("#lodging");
            lodgingButton.style.display ="none";

            const addLodging = document.createElement("div");
            addLodging.classList.add("addLodging");

            let info = projectData.lodging

            addLodging.innerHTML = `<span>Lodging:</span> <br> <p>${info}</p>`;

            let parent = document.querySelector(".add-more-info")
            if (!document.querySelector(".addLodging")){
                parent.insertBefore(addLodging, parent.firstChild)
            }
            console.log("parent.insertBefore(addLodging, parent.firstChild)")
        }

        if(projectData.notes){
            console.log("notes", projectData.notes)

            const notes = document.querySelector("#notes")
            notes.style.display = "none";

            const addNotes = document.createElement("div");
            addNotes.classList.add("notes");
            addNotes.innerHTML = `<span>Notes:</span><br> <p>${projectData.notes}</p>`;

            let parent = document.querySelector(".add-more-info")
            if (!document.querySelector(".notes")){
                parent.insertBefore(addNotes, parent.firstElementChild.nextSibling)

            }
            console.log("parent.insertBefore(addNotes, parent.firstElementChild.nextSibling)")
        }

        countdown( projectData)

        console.log("update ui end")
        return projectData
    }
}

export async function changeDate(projectData){
    const monthNames = ["January", "February", "March", "April", "May", "June",
       "July", "August", "September", "October", "November", "December"];

    let day = projectData.inputData.departure.toString();
    day = day[8] + day[9]

    let month = projectData.inputData.departure.toString()
    let monthNumber = month[5] + month[6]
    if(monthNumber[0] === "0"){
        month = month[6]
    } else {
        month = month[5] + month[6]
    }
    month = monthNames[month - 1]

    let year = projectData.inputData.departure.toString()
    year = year[0] + year[1] + year[2] + year[3]

    let day2 = projectData.inputData.comeback.toString();
    day2 = day2[8] + day2[9]

    let month2 = projectData.inputData.comeback.toString()
    let monthNumber2 = month2[5] + month2[6]
    if(monthNumber2[0] === "0"){
        month2 = month2[6]
    } else {
        month2 = month2[5] + month2[6]
    }
    month2 = monthNames[month2 - 1]

    let year2 = projectData.inputData.comeback.toString()
    year2 = year2[0] + year2[1] + year2[2] + year2[3]

    let newDate = [day, month, year, day2, month2, year2]

    return newDate
}

export async function countdown(projectData) {
    console.log("project data from countdow", projectData)

    let today = new Date().toISOString().slice(0, 10);
    if (projectData){
        let departure = projectData.inputData.departure;

        const milliseconds = Date.parse(departure) - Date.parse(today);

        var days = Math.floor( milliseconds / (1000 * 60 * 60 * 24));

        const countdown = document.querySelector(".countdown")
        countdown.classList.add("countdown")
        if (days === 1) {
            countdown.innerText = `Your trip is 1 day away.`
           return projectData
        } else if (days === 0) {
            countdown.innerText = `Your trip is today!`
            return projectData

        }else if (days < 0){
            countdown.innerText = `This trip expired!`
            return projectData
        } else {
            countdown.innerText = `Your trip is ${days} days away.`
            return projectData
        }
    } else {
        console.log("no project is stored")
    }

}

export async function upperCaseFirstChar (string) {
    const words = string.split(" ");

    for ( let i = 0; i < words.length; i++) {
        let word = words[i];
        word = word[0].toUpperCase() + word.slice(1)
        //console.log(word)
        words[i] = word
    }
    //console.log(words)
    return words.join(" ")
}
