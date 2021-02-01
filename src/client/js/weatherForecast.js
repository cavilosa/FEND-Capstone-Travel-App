//const fetch = require('node-fetch')
export async function weatherForecast(e) {
    e.preventDefault();
    console.log("weatherForecast is on")
   //localStorage.clear()

   if(localStorage.getItem("projectData")){
       getStorage()
       .then( async (weatherGeoData) => {
            sendStorage(weatherGeoData)
       })
       .then( async (weatherGeoData)=> {
            newForecast(weatherGeoData)
           .then ( async (data) => {
               updateWeatherUI(data)
           })
       })
   } else {
       alert("Please, create your trip first")
   }
}

export async function getStorage(){
    const projectData = JSON.parse(localStorage.getItem("projectData"))
    const weatherGeoData = await projectData.geoData
    console.log("getstorage", weatherGeoData)
    return weatherGeoData
}


export async function sendStorage(weatherGeoData){
    console.log("send storage is on", weatherGeoData)
    const req = await fetch("http://localhost:8000/forecast", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({data: weatherGeoData})
    })
    try{
        const data = await req.json();
        return data
    }catch(e){
        console.log(e)
    }
}

export async function newForecast(req, res){
    console.log("new forecast is on")
    const response = await fetch("http://localhost:8000/forecast")
    try{
        const data = await response.json();
        console.log("data from new forecast", typeof data, data)
        return data
    }catch(e){
        console.log(e)
    }
}

export async function updateWeatherUI(data) {
    console.log("update weather ui is on", data)

    const forecast = await Object.values(data);
    console.log(forecast)

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const container = document.querySelector(".forecast")
    container.parentElement.scrollIntoView();
    if (container.children.length > 0){
        container.innerHTML = "";
        //console.log("empty containter data", data)
   } else {
        container.innerHTML = "";
        for (let y = 0; y <=3; y ++){ // creates rows
            let row = document.createElement("div");
            row.classList.add("row")
            console.log("y", y)
            //for (let z = 0; z <= 2 ; z++) { // creates cells
            let x = y * 4;
            let m = x + 3
            for ( let z = x; z<=m; z++) {
                console.log("1z", z)
                let cell = document.createElement("div");
                cell.classList.add("cell");

                dateFormat(forecast, z)

                .then ( async(newDate) => {
                    console.log("day", newDate)
                    cell.innerHTML = `<span class="date">${newDate[0]} ${monthNames[newDate[1]]}</span><br>${forecast[z].description}
                       <br>High: ${forecast[z].max_temp}&#176C <br>
                       Low: ${forecast[z].min_temp}&#176C`
                })

               row.appendChild(cell);
           }
        container.appendChild(row)
       }

    console.log("update ui end")
    }
}

export async function dateFormat(forecast, z){
    console.log("forecast[z].date", forecast[z].date)
    const l = forecast[z].date.toString()
    const day = `${l[8]}${l[9]}`
    //console.log(day)

    let dateMonth;
    const month =  `${l[5]}${l[6]}`
    if(month[0] === "0"){
        dateMonth = `${l[6]}`
    } else {
        dateMonth = month
    }

    dateMonth = dateMonth - 1
    console.log(dateMonth, day)
    const newDate = [day, dateMonth]
    return (newDate)
}
