const fetch = require("node-fetch");
const app = require("../src/server/server");
const supertest = require("supertest");
const request = supertest(app);

import { getInput, storageInfo, weatherbitForecast } from "../src/server/server"

describe ("test the server", () => {

    test("get input", async () => {
        expect(getInput).not.toBeNull();
    });

    test("get /data", async () => {
        const res = await request.get("/data")
        .expect("Content-Type", /text/)
    });

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

    test("/forecast rout", async () => {
        const res = await request.get("/forecast")
        .expect("Content-Type", /json/)
        expect(res.status).toBe(200)
        expect(res.body).not.toBeNull();
    });

    test("weatherbitforecast", async () => {
        expect()
    })
});
