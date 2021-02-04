// Getting 16 day weather forecast
export async function weatherForecast(e) {
    e.preventDefault();

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

// Getting data from localStorage is any
export async function getStorage(){
    const projectData = JSON.parse(localStorage.getItem("projectData"))
    const weatherGeoData = await projectData.geoData
    return weatherGeoData
}

// Sending info to server side for API call the weatherbit
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

// Returning the received data from server side with forecast
export async function newForecast(req, res){
    const response = await fetch("http://localhost:8000/forecast")
    try{
        const data = await response.json();
        return data
    }catch(e){
        console.log(e)
    }
}


// Updating weatherUI
export async function updateWeatherUI(data) {

    const forecast = await Object.values(data);

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const container = document.querySelector(".forecast")
    container.parentElement.scrollIntoView();
    // On second click the weather forecast will disappear
    if (container.children.length > 0){
        container.innerHTML = "";
   } else {
        container.innerHTML = "";
        for (let y = 0; y <=3; y ++){ // creates rows
            let row = document.createElement("div");
            row.classList.add("row")
            let x = y * 4;
            let m = x + 3
            for ( let z = x; z<=m; z++) { // creates cells
                let cell = document.createElement("div");
                cell.classList.add("cell");

                dateFormat(forecast, z) // Making the date look better

                .then ( async(newDate) => {
                    cell.innerHTML = `<span class="date">${newDate[0]} ${monthNames[newDate[1]]}</span><br>${forecast[z].description}
                       <br>High: ${forecast[z].max_temp}&#176C <br>
                       Low: ${forecast[z].min_temp}&#176C`
                })

               row.appendChild(cell);
           }
        container.appendChild(row)
       }
    }
}

// Changing the date format to user firendly appearance
export async function dateFormat(forecast, z){
    const l = forecast[z].date.toString()
    const day = `${l[8]}${l[9]}`

    let dateMonth;
    const month =  `${l[5]}${l[6]}`
    if(month[0] === "0"){
        dateMonth = `${l[6]}`
    } else {
        dateMonth = month
    }

    dateMonth = dateMonth - 1
    const newDate = [day, dateMonth]
    return (newDate)
}
