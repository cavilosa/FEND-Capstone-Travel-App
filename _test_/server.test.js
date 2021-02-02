const fetch = require("node-fetch");
/*const request = require("supertest");*/
const app = require("../src/server/server");
const supertest = require("supertest");
const request = supertest(app);

import { getInput } from "../src/server/server.js"

//const axios = require('axios');
//jest.mock('axios');
/*
beforeAll(()=>{
    require("whatwg-fetch");
})*/

describe ("test the server", () => {
    /*test("test /data endpoint", async (done) => {
        const expected = [
            { inputData:
                {destination: "Kiev",
                departure: "2024-01-01",
                comeback:"2024-01-01"}
            }
        ];
        const json = await getInput();
        expect(json).toMatchObject(expected)

        //const res = await request.post("/data")
            //expect(res.status).not.toBe(200)
            //expect(res.status).toBe(200)
            //expect(res.body).not.toBeNull();
            //expect("Content-Type", /json/)
            //expect(res.body).toHaveProperty("inputData")
            done();
    });*/

    test("GET method test", async (done) => {
        const res = await request.get("/all")

            .expect("Content-Type", /json/)
            expect(res.status).toBe(200)
            expect(res.body).not.toBeNull();
            expect(res.body).toHaveProperty("geoData")
            expect(res.body).not.toHaveProperty("post")

            var size = Object.keys(res.body).length
            expect(size).not.toBe(0)

            done();
    });
});
