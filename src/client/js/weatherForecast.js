const fetch = require('node-fetch')
export async function weatherForecast(e) {
    e.preventDefault();
    console.log("weatherForecast is on")
   //localStorage.clear()

   if(localStorage.getItem("projectData")){
       getStorage()
       .then( async (projectData)=>{
           const weatherGeoData = await projectData.geoData
           console.log(" 1 weather geo data is on", weatherGeoData)
           return weatherGeoData
       })
       .then( async (weatherGeoData) => {
            //const sendStorageData = await weatherGeoData
            sendStorage(weatherGeoData)
       })
       .then( async (weatherGeoData)=> {
            const news = await weatherGeoData
            newForecast()
           .then ( async (data) => {
               const update = await data
               updateWeatherUI(data)
           })
       })
   } else {
       alert("Please, create your trip first")
   }
}

export async function getStorage(){
    const projectData = JSON.parse(localStorage.getItem("projectData"))
    return projectData
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
    console.log("newfirecast is on")
    const response = await fetch("http://localhost:8000/newForecast")
    try{
        const data = response.json();
        console.log("data from new forecast", data)
        return data
    }catch(e){
        console.log(e)
    }
}

export async function updateWeatherUI(data) {
    console.log("update weather ui is on", data)

    const forecast = await Object.values(data);

    const container = document.querySelector(".forecast")

   if (container.hasChildNodes()){
        container.innerHTML = "";
        console.log("container.innerHTML = emptied")
   }else {
       for (let x = 1; x <= 1; x ++){ // creates rows
           let row = document.createElement("div");
           row.classList.add("row")
           for (let y = 0; y <= 7 ; y++) { // creates cells
               let cell = document.createElement("div");
               cell.classList.add("cell");
               cell.innerHTML = `${forecast[y].date}<br>${forecast[y].description}
                   <br>High: ${forecast[y].max_temp}&#176 C <br>
                   Low: ${forecast[y].min_temp}&#176 C`
               row.appendChild(cell);
           }
       container.appendChild(row)
       }
       for (let x = 1; x <= 1; x ++){ // creates rows
           let row = document.createElement("div");
           row.classList.add("row")
           for (let y = 8; y <= 15 ; y++) { // creates cells
               let cell = document.createElement("div");
               cell.classList.add("cell");
               cell.innerHTML = `${forecast[y].date}<br>${forecast[y].description}
                   <br>High: ${forecast[y].max_temp}&#176 C <br>
                   Low: ${forecast[y].min_temp}&#176 C`
               row.appendChild(cell);
           }
       container.appendChild(row)
       }
   }
    console.log("update ui end")
}
