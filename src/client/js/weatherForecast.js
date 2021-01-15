export async function weatherForecast(e) {
    e.preventDefault();
    console.log("weatherForecast is on")

   if(localStorage.getItem("projectData")){
       getStorageData()
       .then( (projectData)=>{
           const weatherGeoData = projectData.geoData
           console.log(weatherGeoData)
           return weatherGeoData
       })
       .then( (weatherGeoData) => {
            sendStorage(weatherGeoData)
       })
       .then( (weatherGeoData)=> {
           newForecast()
           .then ( (data) => {
               updateWeather(data)
           })
       })

   }
}

export async function getStorageData(){
    const projectData = JSON.parse(localStorage.getItem("projectData"))
    return projectData
}

export async function sendStorage(weatherGeoData){
    console.log("sendstorage is on")
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
    const response = await fetch("http://localhost:8000/newForecast")
    try{
        const data = response.json();
        console.log(data)
        return data
    }catch(e){
        console.log(e)
    }
}

export async function updateWeather(data) {
    const forecast = Object.values(data);
    //console.log(forecast[0].date)

    const container = document.querySelector(".forecast")
    container.innerHTML = "";
    for (let x = 1; x <= 2; x ++){ // creates rows
        let row = document.createElement("div");
        row.classList.add("row")
        for (let y = 1; y <= 8; y++) { // creates cells
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerHTML = `${forecast[0].date}<br>${forecast[0].description}
                <br>High: ${forecast[0].max_temp}&#176 C <br>
                Low: ${forecast[0].min_temp}&#176 C`
            row.appendChild(cell);
        }
    container.appendChild(row)
    }
}
