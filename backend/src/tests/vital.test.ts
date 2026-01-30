import supertest from "supertest";
import app from "../app";

describe("Vital API", () => {
    it("should create a vital", async () => {
        const res = await supertest(app)
            .post("/api/vitals")
            .send({
                userId: 1,
                heartRate: 120,
                bloodPressure: 55,
                temperature: 32,
                notes: "Everything is fine"
            });

        expect(res.status).toBe(201);
        expect(res.body.data.userId).toBe(1);
    });

    it("should get vitals", async () => {
        const res = await supertest(app).get("/api/vitals");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data));
    });

    it("returns 400 for missing fields", async () => {
        const res = await supertest(app).post("/api/vitals").send({});

        expect(res.status).toBe(400);
    });

    it("returns 404 for missing vital", async () => {
        const res = await supertest(app).get("/api/vitals/999");
        
        expect(res.status).toBe(404);
    });
})