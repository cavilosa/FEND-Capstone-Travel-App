const endpoint = "http://api.geonames.org/searchJSON?q=";
const userName = "&maxRows=10&username=cavilosa";
//http://api.geonames.org/searchJSON?q=london&maxRows=10&username=demo

// Event listener to add function to existing HTML DOM element
document.getElementById("new-save").addEventListener("click", generate);

/* Function called by event listener */
export async function generate() {
    let location = document.getElementById("location").value;
    location = location.trim();

    getWeather(`${endpoint}${location}${userName}`)
      /*.then ( (data) => {
        postData("/addWeather", {city: data.name, weather:
                data.weather[0].description, temperature: data.main.temp,
                feelsLike: data.main.feels_like, wind: data.wind.speed});
    })

      .then ( () => updateUI());*/
}

/* Function to GET Web API Data*/
export async function getWeather(url) {
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
