import supertest from "supertest";
import app from "../app";
import { vitals } from "../data/vital.store";
import { users } from "../data/user.store";
import { Vital } from "../models/vital.model";

// Mock the data stores
jest.mock("../data/vital.store", () => ({
    vitals: []
}));

jest.mock("../data/user.store", () => ({
    users: []
}));

describe("Vital API", () => {
    let testUserId: number;

    beforeEach(async () => {
        // Clear arrays before each test
        vitals.length = 0;
        users.length = 0;

        // Create a test user for vital tests
        const userRes = await supertest(app)
            .post("/api/users")
            .send({
                name: "Test Patient",
                dateOfBirth: "1990-01-01",
                age: 34,
                sex: "male"
            });

        testUserId = userRes.body.data.id;
    });

    describe("POST /api/vitals", () => {
        it("should create a vital with valid data", async () => {
            const vitalData = {
                userId: testUserId,
                type: "Heart Rate",
                value: 75,
                unit: "bpm",
                details: "Normal heart rate"
            };

            const res = await supertest(app)
                .post("/api/vitals")
                .send(vitalData);

            expect(res.status).toBe(201);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.id).toBeDefined();
            expect(res.body.data.userId).toBe(testUserId);
            expect(res.body.data.type).toBe("Heart Rate");
            expect(res.body.data.value).toBe(75);
            expect(res.body.data.unit).toBe("bpm");
            expect(res.body.data.details).toBe("Normal heart rate");
            expect(res.body.data.riskScore).toBeDefined();
            expect(["Normal", "At-risk", "Critical", "Not applicable"]).toContain(res.body.data.riskScore);
            expect(res.body.data.createdAt).toBeDefined();
        });

        it("should create vital with Normal risk score for normal heart rate", async () => {
            const res = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 75,
                    unit: "bpm",
                    details: "Normal"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.riskScore).toBe("Normal");
        });

        it("should create vital with At-risk score for borderline heart rate", async () => {
            const res = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 105,
                    unit: "bpm",
                    details: "Slightly elevated"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.riskScore).toBe("At-risk");
        });

        it("should create vital with Critical score for abnormal heart rate", async () => {
            const res = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 130,
                    unit: "bpm",
                    details: "Very high"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.riskScore).toBe("Critical");
        });

        it("should create vital with Not applicable for Height", async () => {
            const res = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Height",
                    value: 175,
                    unit: "cm",
                    details: "Height measurement"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.riskScore).toBe("Not applicable");
        });

        it("should create Temperature vital", async () => {
            const res = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Temperature",
                    value: 37.2,
                    unit: "°C",
                    details: "Normal temperature"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.type).toBe("Temperature");
            expect(res.body.data.riskScore).toBe("Normal");
        });

        it("should create Respiratory Rate vital", async () => {
            const res = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Respiratory Rate",
                    value: 16,
                    unit: "breaths/min",
                    details: "Normal breathing"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.type).toBe("Respiratory Rate");
        });

        it("should create BloodPressure - Systolic vital", async () => {
            const res = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "BloodPressure - Systolic",
                    value: 135,
                    unit: "mmHg",
                    details: "Normal systolic BP"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.type).toBe("BloodPressure - Systolic");
        });

        it("should create BloodPressure - Diastolic vital", async () => {
            const res = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "BloodPressure - Diastolic",
                    value: 95,
                    unit: "mmHg",
                    details: "Normal diastolic BP"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.type).toBe("BloodPressure - Diastolic");
        });

        it("should create Weight vital", async () => {
            const res = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Weight",
                    value: 70,
                    unit: "kg",
                    details: "Weight measurement"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.type).toBe("Weight");
            expect(res.body.data.riskScore).toBe("Not applicable");
        });

        it("should create Note vital", async () => {
            const res = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Note",
                    value: 0,
                    unit: "N/A",
                    details: "Patient reports feeling well"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.type).toBe("Note");
            expect(res.body.data.value).toBe(0);
            expect(res.body.data.riskScore).toBe("Not applicable");
        });

        it("should create multiple vitals with incremental IDs", async () => {
            const vital1 = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 75,
                    unit: "bpm",
                    details: "First reading"
                });

            const vital2 = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Temperature",
                    value: 37,
                    unit: "°C",
                    details: "Second reading"
                });

            expect(vital1.status).toBe(201);
            expect(vital2.status).toBe(201);
            expect(vital2.body.data.id).toBe(vital1.body.data.id + 1);
        });

        it("should allow vitals without details field", async () => {
            const res = await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 75,
                    unit: "bpm"
                });

            expect(res.status).toBe(201);
        });
    });

    describe("GET /api/vitals", () => {
        it("should return an empty array when no vitals exist", async () => {
            const res = await supertest(app).get("/api/vitals");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(0);
        });

        it("should get all vitals", async () => {
            // Create test vitals
            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 75,
                    unit: "bpm",
                    details: "First reading"
                });

            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Temperature",
                    value: 37,
                    unit: "°C",
                    details: "Second reading"
                });

            const res = await supertest(app).get("/api/vitals");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(2);
        });

        it("should validate riskScore in all vitals", async () => {
            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 75,
                    unit: "bpm",
                    details: "Normal"
                });

            const res = await supertest(app).get("/api/vitals");

            expect(res.status).toBe(200);
            res.body.data.forEach((vital: Vital) => {
                expect(["Normal", "At-risk", "Critical", "Not applicable"]).toContain(vital.riskScore);
            });
        });

        it("should return all vital properties", async () => {
            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 75,
                    unit: "bpm",
                    details: "Test"
                });

            const res = await supertest(app).get("/api/vitals");

            expect(res.status).toBe(200);
            const vital = res.body.data[0];
            expect(vital).toHaveProperty("id");
            expect(vital).toHaveProperty("userId");
            expect(vital).toHaveProperty("type");
            expect(vital).toHaveProperty("value");
            expect(vital).toHaveProperty("unit");
            expect(vital).toHaveProperty("riskScore");
            expect(vital).toHaveProperty("details");
            expect(vital).toHaveProperty("createdAt");
        });
    });

    describe("GET /api/vitals?userId=:id", () => {
        it("should return all vitals for a specific userId", async () => {
            // Create second user
            const user2Res = await supertest(app)
                .post("/api/users")
                .send({
                    name: "Second Patient",
                    dateOfBirth: "1985-01-01",
                    age: 39,
                    sex: "female"
                });
            const user2Id = user2Res.body.data.id;

            // Create vitals for first user
            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 75,
                    unit: "bpm",
                    details: "User 1"
                });

            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Temperature",
                    value: 37,
                    unit: "°C",
                    details: "User 1"
                });

            // Create vital for second user
            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: user2Id,
                    type: "Heart Rate",
                    value: 80,
                    unit: "bpm",
                    details: "User 2"
                });

            const res = await supertest(app).get(`/api/vitals?userId=${testUserId}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(2);
            res.body.data.forEach((vital: Vital) => {
                expect(vital.userId).toBe(testUserId);
                expect(["Normal", "At-risk", "Critical", "Not applicable"]).toContain(vital.riskScore);
            });
        });

        it("should return empty array for user with no vitals", async () => {
            // Create second user
            const user2Res = await supertest(app)
                .post("/api/users")
                .send({
                    name: "New Patient",
                    dateOfBirth: "1995-01-01",
                    age: 29,
                    sex: "male"
                });
            const user2Id = user2Res.body.data.id;

            const res = await supertest(app).get(`/api/vitals?userId=${user2Id}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(0);
        });

        it("should handle non-existent userId query parameter", async () => {
            const res = await supertest(app).get("/api/vitals?userId=999");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(0);
        });
    });

    describe("GET /api/vitals/:id", () => {
        it("should return vitals by user ID", async () => {
            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 75,
                    unit: "bpm",
                    details: "Test"
                });

            const res = await supertest(app).get(`/api/vitals/${testUserId}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBeGreaterThan(0);
        });

        it("should return vitals sorted by createdAt (newest first)", async () => {
            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 75,
                    unit: "bpm",
                    details: "First"
                });

            await new Promise(resolve => setTimeout(resolve, 10));

            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Temperature",
                    value: 37,
                    unit: "°C",
                    details: "Second"
                });

            const res = await supertest(app).get(`/api/vitals/${testUserId}`);

            expect(res.status).toBe(200);
            expect(res.body.data[0].details).toBe("Second");
            expect(res.body.data[1].details).toBe("First");
        });
    });

    describe("Integration Tests", () => {
        it("should create vital and retrieve it through different endpoints", async () => {
            const vitalData = {
                userId: testUserId,
                type: "Heart Rate",
                value: 75,
                unit: "bpm",
                details: "Integration test"
            };

            // Create vital
            const createRes = await supertest(app)
                .post("/api/vitals")
                .send(vitalData);

            expect(createRes.status).toBe(201);

            // Get all vitals
            const getAllRes = await supertest(app).get("/api/vitals");
            expect(getAllRes.status).toBe(200);
            expect(getAllRes.body.data.some((v: Vital) => v.details === vitalData.details)).toBe(true);

            // Get vitals by user ID
            const getByUserRes = await supertest(app).get(`/api/vitals/${testUserId}`);
            expect(getByUserRes.status).toBe(200);
            expect(getByUserRes.body.data.some((v: Vital) => v.details === vitalData.details)).toBe(true);

            // Get vitals by query parameter
            const getByQueryRes = await supertest(app).get(`/api/vitals?userId=${testUserId}`);
            expect(getByQueryRes.status).toBe(200);
            expect(getByQueryRes.body.data.some((v: Vital) => v.details === vitalData.details)).toBe(true);
        });

        it("should track vital history for a patient", async () => {
            const readings = [
                { value: 70, details: "Morning" },
                { value: 85, details: "Afternoon" },
                { value: 75, details: "Evening" }
            ];

            for (const reading of readings) {
                await supertest(app)
                    .post("/api/vitals")
                    .send({
                        userId: testUserId,
                        type: "Heart Rate",
                        value: reading.value,
                        unit: "bpm",
                        details: reading.details
                    });
                await new Promise(resolve => setTimeout(resolve, 10));
            }

            const res = await supertest(app).get(`/api/vitals/${testUserId}`);

            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(3);
            // Should be sorted newest first
            expect(res.body.data[0].details).toBe("Evening");
            expect(res.body.data[2].details).toBe("Morning");
        });

        it("should handle vitals for multiple patients", async () => {
            const user2Res = await supertest(app)
                .post("/api/users")
                .send({
                    name: "Patient 2",
                    dateOfBirth: "1985-01-01",
                    age: 39,
                    sex: "female"
                });
            const user2Id = user2Res.body.data.id;

            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: testUserId,
                    type: "Heart Rate",
                    value: 75,
                    unit: "bpm",
                    details: "Patient 1"
                });

            await supertest(app)
                .post("/api/vitals")
                .send({
                    userId: user2Id,
                    type: "Heart Rate",
                    value: 80,
                    unit: "bpm",
                    details: "Patient 2"
                });

            const user1Vitals = await supertest(app).get(`/api/vitals/${testUserId}`);
            const user2Vitals = await supertest(app).get(`/api/vitals/${user2Id}`);

            expect(user1Vitals.body.data.every((v: Vital) => v.userId === testUserId)).toBe(true);
            expect(user2Vitals.body.data.every((v: Vital) => v.userId === user2Id)).toBe(true);
        });
    });
});