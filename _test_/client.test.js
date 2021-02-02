import { removeTrip } from "../src/client/js/removeTrip"
import { weatherForecast, sendStorage } from "../src/client/js/weatherForecast"
const fetch = require("node-fetch");
//import { generate } from "../src/client/js/generateInfo"
//import { checkStorage } from "../src/client/js/localStorage"


describe("Generate info", ()=>{
    test("removeTrip", () => {
        expect(removeTrip).toBeDefined();
        expect(removeTrip).not.toBeNull();

    });

    test("weather forecast", async () =>{
        expect(weatherForecast).toBeDefined();
        expect(weatherForecast).not.toBeNull();
    });

    /*test("mock", ()=>{
        const mockFn = jest.fn();
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    })*/

    /*test("generate", () => {
        expect(generate).tobeDefined();
    })*/

    /*test("generate info", ()=>{
        expect(checkStorage).toBeDefined();
    })*/
})
