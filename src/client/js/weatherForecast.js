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
           newForecast();
       })
   }
}

export async function getStorageData(){
    const projectData = JSON.parse(localStorage.getItem("projectData"))
    return projectData
}

export async function weatherAPI(){
    const request = await fetch("http://localhost:8000/forecast")
    try{
        const forecast = request.json();
        console.log(forecast00)
    }catch(e){
        console.log(e)
    }
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
        const forecast = response.json();
        console.log(Object.values(forecast))
    }catch(e){
        console.log(e)
    }
}
