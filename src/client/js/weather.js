const endpoint = "http://api.geonames.org/searchJSON?q=";
const userName = "&maxRows=10&username=cavilosa";
//http://api.geonames.org/searchJSON?q=london&maxRows=10&username=demo

// Event listener to add function to existing HTML DOM element
document.getElementById("save").addEventListener("click", generate);

/* Function called by event listener */
export async function generate() {
    const location = document.getElementById("location").value;
    location = zipcode.trim();

    Client.getWeather(`${endpoint}${location}${userName}`)
      /*.then ( (data) => {
        postData("/addWeather", {city: data.name, weather:
                data.weather[0].description, temperature: data.main.temp,
                feelsLike: data.main.feels_like, wind: data.wind.speed});
    })

      .then ( () => updateUI());*/
}

/* Function to GET Web API Data*/
export async function getWeather(url) => {
    console.log(url)
    const response = await fetch(url);
    if (response.status != 200) {
        window.alert("Try a valid city name, please!");
        document.getElementById("location").value = "";
    }
    try {
        const weather = await response.json();
        console.log(weather)
        return weather;
    } catch (error) {
        console.log("error", error);
    }
}



/* Function to POST data */
export const postData = async (url="", data = {}) => {
    const response = await fetch(`http://localhost:8000${url}`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log("newData done");
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
export const updateUI = async () => {
    const feelings = document.querySelector("#feelings").value;
    const request = await fetch("http://localhost:8000/all");
    try {
        const allData = await request.json();
        document.getElementById("city").innerHTML = allData.city;
        document.getElementById("date").innerHTML = newDate;
        document.getElementById("temp").innerHTML =
                                      `${allData.temperature} &#176 Celsius`;
        document.getElementById("feels-like").innerHTML =
                                        `${allData.feelsLike} &#176 Celsius`;
        document.getElementById("wind").innerHTML = `${allData.wind} km/h`;
        document.getElementById("content").innerHTML = feelings;
        document.getElementById("zip").value = "";
        document.querySelector("#feelings").value = "";
    } catch(error) {
        console.log("error", error);
    }
}
