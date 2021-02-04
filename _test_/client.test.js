import { removeTrip } from "../src/client/js/removeTrip"
import { weatherForecast, sendStorage } from "../src/client/js/weatherForecast"
const fetch = require("node-fetch");


describe("Generate info", ()=>{
    test("removeTrip", () => {
        expect(removeTrip).toBeDefined();
        expect(removeTrip).not.toBeNull();

    });

    test("weather forecast", async () =>{
        expect(weatherForecast).toBeDefined();
        expect(weatherForecast).not.toBeNull();
    });
})
