import supertest from "supertest";
import app from "../app";

describe("User API", () => {
    it("should create a user", async () => {
        const res = await supertest(app)
            .post("/api/users")
            .send({
                firstName: "John",
                lastName: "Marston",
                age: 35,
                sex: 'male'
            });

        expect(res.status).toBe(201);
        expect(res.body.data.firstName).toBe("John");
    });

    it("should get users", async () => {
        const res = await supertest(app).get("/api/users");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("returns age validation error", async () => {
        const res = await supertest(app).post("/api/users").send({
            firstName: "John",
            lastName: "Marston",
            age: -10,
            sex: 'male'
        });

        expect(res.status).toBe(400);
    });

    it("returns 400 for missing fields", async () => {
        const res = await supertest(app).post("/api/users").send({});

        expect(res.status).toBe(400);
    });

    it("returns 404 for missing user", async () => {
        const res = await supertest(app).get("/api/users/999");

        expect(res.status).toBe(404);
    });
});
