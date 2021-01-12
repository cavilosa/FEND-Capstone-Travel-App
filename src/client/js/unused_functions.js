async function weatherbit(req, res) {
    /* if (inputData.departure === inputData.comeback) {
        inputData.comeback = new Date(inputData.departure);
        inputData.comeback.setDate(inputData.comeback.getDate() + 1)
        return getWeather();
    } else {
        return getWeather();
    } */
    return getWeather()
}

async function getWeather () {
    const url = `https://api.weatherbit.io/v2.0/history/daily?&lat=${geoData.latitude}&lon=${geoData.longitude}&start_date=${inputData.departure}&end_date=${inputData.comeback}&units=M&key=${weather_key}`
    const response = await fetch(url)
        if (response.status !=200) {
            console.log(response.status)
        }
    try {
        const data = await response.json();
        console.log("data", data)
    } catch (error) {
        console.log(error)
    }
}


// creating var for weather forecast - next day after arrival
let start_date = new Date();
start_date = start_date.toISOString().slice(0, 10)
console.log(start_date, "start_date")
let end_date = new Date(start_date);  // new date as of departure
end_date.setDate(end_date.getDate() + 1) // nex day in calendar calculated

// extracting only neaded info from the date - year-month-day
end_date = end_date.toISOString().slice(0, 10)
end_date = encodeURIComponent(end_date);  // representing the provided string encoded as a URI component
