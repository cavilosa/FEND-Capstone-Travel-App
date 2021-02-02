import { removeTrip } from "../src/client/js/removeTrip"
import { weatherForecast } from "../src/client/js/weatherForecast"
//import { generate } from "../src/client/js/generateInfo"
import { checkStorage } from "../src/client/js/localStorage"

describe("Generate info", ()=>{
    test("removeTrip", () => {
        /*const axios = require('axios');
        jest.mock('axios');
        axios.get.mockResolvedValue({
            destination: "Kiev", departure: "2022-01-01",
                    comeback: "2022-01-01"
        });

        const data = await getData();
        expect(data).toEqual({destination: "Kiev", departure: "2022-01-01",
                comeback: "2022-01-01"})*/
        expect(removeTrip).toBeDefined();
        expect(removeTrip).not.toBeNull();
    });

    test("weather forecast", async () =>{
        expect(weatherForecast).toBeDefined();
        expect(weatherForecast).not.toBeNull();
    });

    /*test("generate", () => {
        expect(generate).tobeDefined();
    })*/

    test("generate info", ()=>{
        expect(checkStorage).toBeDefined();
    })
})
