import request from "supertest";
import app from "../app";
import { users } from "../data/user.store";
import { User } from "../models/user.model";

// Mock the user store to ensure clean state for tests
jest.mock("../data/user.store", () => ({
    users: []
}));

describe("User API", () => {
    beforeEach(() => {
        // Clear users array before each test
        users.length = 0;
    });

    describe("POST /api/users", () => {
        it("should create a user with valid data", async () => {
            const userData = {
                name: "John Doe",
                dateOfBirth: "1992-01-01",
                age: 32,
                sex: "male"
            };

            const res = await request(app)
                .post("/api/users")
                .send(userData);

            expect(res.status).toBe(201);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.id).toBeDefined();
            expect(res.body.data.name).toBe(userData.name);
            expect(res.body.data.dateOfBirth).toBe(userData.dateOfBirth);
            expect(res.body.data.age).toBe(userData.age);
            expect(res.body.data.sex).toBe(userData.sex);
            expect(res.body.data.createdAt).toBeDefined();
        });

        it("should create a female user", async () => {
            const userData = {
                name: "Jane Doe",
                dateOfBirth: "1995-05-15",
                age: 29,
                sex: "female"
            };

            const res = await request(app)
                .post("/api/users")
                .send(userData);

            expect(res.status).toBe(201);
            expect(res.body.data.sex).toBe("female");
        });

        it("should create multiple users with incremental IDs", async () => {
            const user1 = await request(app)
                .post("/api/users")
                .send({
                    name: "User 1",
                    dateOfBirth: "1990-01-01",
                    age: 34,
                    sex: "male"
                });

            const user2 = await request(app)
                .post("/api/users")
                .send({
                    name: "User 2",
                    dateOfBirth: "1985-01-01",
                    age: 39,
                    sex: "female"
                });

            expect(user1.status).toBe(201);
            expect(user2.status).toBe(201);
            expect(user2.body.data.id).toBe(user1.body.data.id + 1);
        });

        it("should return 400 for missing name field", async () => {
            const res = await request(app)
                .post("/api/users")
                .send({
                    dateOfBirth: "1992-01-01",
                    age: 32,
                    sex: "male"
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
            expect(res.body.success).toBe(false);
        });

        it("should return 400 for missing dateOfBirth field", async () => {
            const res = await request(app)
                .post("/api/users")
                .send({
                    name: "John Doe",
                    age: 32,
                    sex: "male"
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
            expect(res.body.success).toBe(false);
        });

        it("should return 400 for missing age field", async () => {
            const res = await request(app)
                .post("/api/users")
                .send({
                    name: "John Doe",
                    dateOfBirth: "1992-01-01",
                    sex: "male"
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
            expect(res.body.success).toBe(false);
        });

        it("should return 400 for missing sex field", async () => {
            const res = await request(app)
                .post("/api/users")
                .send({
                    name: "John Doe",
                    dateOfBirth: "1992-01-01",
                    age: 32
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
            expect(res.body.success).toBe(false);
        });

        it("should return 400 for empty request body", async () => {
            const res = await request(app)
                .post("/api/users")
                .send({});

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
            expect(res.body.success).toBe(false);
        });

        it("should return 400 for negative age", async () => {
            const res = await request(app)
                .post("/api/users")
                .send({
                    name: "John Doe",
                    dateOfBirth: "1992-01-01",
                    age: -5,
                    sex: "male"
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Age should be a positive number");;
            expect(res.body.success).toBe(false);
        });

        it("should accept age of 0 (newborn)", async () => {
            const res = await request(app)
                .post("/api/users")
                .send({
                    name: "Baby Doe",
                    dateOfBirth: "2024-01-01",
                    age: 0,
                    sex: "male"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.age).toBe(0);
        });

        it("should accept very old age", async () => {
            const res = await request(app)
                .post("/api/users")
                .send({
                    name: "Senior Doe",
                    dateOfBirth: "1920-01-01",
                    age: 104,
                    sex: "female"
                });

            expect(res.status).toBe(201);
            expect(res.body.data.age).toBe(104);
        });
    });

    describe("GET /api/users", () => {
        it("should return an empty array when no users exist", async () => {
            const res = await request(app).get("/api/users");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(0);
        });

        it("should get all users", async () => {
            // Create test users
            await request(app)
                .post("/api/users")
                .send({
                    name: "User 1",
                    dateOfBirth: "1990-01-01",
                    age: 34,
                    sex: "male"
                });

            await request(app)
                .post("/api/users")
                .send({
                    name: "User 2",
                    dateOfBirth: "1985-01-01",
                    age: 39,
                    sex: "female"
                });

            const res = await request(app).get("/api/users");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(2);
        });

        it("should return users sorted by createdAt (newest first)", async () => {
            // Create users with slight delay
            const user1 = await request(app)
                .post("/api/users")
                .send({
                    name: "First User",
                    dateOfBirth: "1990-01-01",
                    age: 34,
                    sex: "male"
                });

            // Small delay to ensure different timestamps
            await new Promise(resolve => setTimeout(resolve, 10));

            const user2 = await request(app)
                .post("/api/users")
                .send({
                    name: "Second User",
                    dateOfBirth: "1985-01-01",
                    age: 39,
                    sex: "female"
                });

            const res = await request(app).get("/api/users");

            expect(res.status).toBe(200);
            // Newest user should be first
            expect(res.body.data[0].name).toBe("Second User");
            expect(res.body.data[1].name).toBe("First User");
        });

        it("should return all user properties", async () => {
            await request(app)
                .post("/api/users")
                .send({
                    name: "John Doe",
                    dateOfBirth: "1992-01-01",
                    age: 32,
                    sex: "male"
                });

            const res = await request(app).get("/api/users");

            expect(res.status).toBe(200);
            const user = res.body.data[0];
            expect(user).toHaveProperty("id");
            expect(user).toHaveProperty("name");
            expect(user).toHaveProperty("dateOfBirth");
            expect(user).toHaveProperty("age");
            expect(user).toHaveProperty("sex");
            expect(user).toHaveProperty("createdAt");
        });
    });

    describe("GET /api/users/:id", () => {
        it("should return a user by ID", async () => {
            const createRes = await request(app)
                .post("/api/users")
                .send({
                    name: "John Doe",
                    dateOfBirth: "1992-01-01",
                    age: 32,
                    sex: "male"
                });

            const userId = createRes.body.data.id;

            const res = await request(app).get(`/api/users/${userId}`);

            expect(res.status).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.id).toBe(userId);
            expect(res.body.data.name).toBe("John Doe");
        });

        it("should return the correct user among multiple users", async () => {
            await request(app)
                .post("/api/users")
                .send({
                    name: "User 1",
                    dateOfBirth: "1990-01-01",
                    age: 34,
                    sex: "male"
                });

            const targetUser = await request(app)
                .post("/api/users")
                .send({
                    name: "Target User",
                    dateOfBirth: "1985-01-01",
                    age: 39,
                    sex: "female"
                });

            await request(app)
                .post("/api/users")
                .send({
                    name: "User 3",
                    dateOfBirth: "1995-01-01",
                    age: 29,
                    sex: "male"
                });

            const res = await request(app).get(`/api/users/${targetUser.body.data.id}`);

            expect(res.status).toBe(200);
            expect(res.body.data.name).toBe("Target User");
        });

        it("should return 404 for a non-existent user", async () => {
            const res = await request(app).get("/api/users/999");

            expect(res.status).toBe(404);
            expect(res.body.message).toBeDefined();
        });

        it("should return 400 for invalid user ID (non-numeric)", async () => {
            const res = await request(app).get("/api/users/abc");

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
        });

        it("should return 400 for invalid user ID (special characters)", async () => {
            const res = await request(app).get("/api/users/@#$");

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
        });

        it("should handle ID 0 gracefully", async () => {
            const res = await request(app).get("/api/users/0");

            expect(res.status).toBe(404);
            expect(res.body.message).toBeDefined();
        });

        it("should handle negative ID", async () => {
            const res = await request(app).get("/api/users/-1");

            expect(res.status).toBe(404);
            expect(res.body.message).toBeDefined();
        });
    });

    describe("Integration Tests", () => {
        it("should create and retrieve a user in sequence", async () => {
            const userData = {
                name: "Integration Test User",
                dateOfBirth: "1990-06-15",
                age: 34,
                sex: "male"
            };

            // Create user
            const createRes = await request(app)
                .post("/api/users")
                .send(userData);

            expect(createRes.status).toBe(201);
            const userId = createRes.body.data.id;

            // Retrieve user by ID
            const getRes = await request(app).get(`/api/users/${userId}`);

            expect(getRes.status).toBe(200);
            expect(getRes.body.data.name).toBe(userData.name);
            expect(getRes.body.data.age).toBe(userData.age);

            // Check user appears in list
            const listRes = await request(app).get("/api/users");

            expect(listRes.status).toBe(200);
            expect(listRes.body.data.some((u: User) => u.id === userId)).toBe(true);
        });

        it("should handle concurrent user creation", async () => {
            const userPromises = [
                request(app).post("/api/users").send({
                    name: "User 1",
                    dateOfBirth: "1990-01-01",
                    age: 34,
                    sex: "male"
                }),
                request(app).post("/api/users").send({
                    name: "User 2",
                    dateOfBirth: "1991-01-01",
                    age: 33,
                    sex: "female"
                }),
                request(app).post("/api/users").send({
                    name: "User 3",
                    dateOfBirth: "1992-01-01",
                    age: 32,
                    sex: "male"
                })
            ];

            const results = await Promise.all(userPromises);

            results.forEach(res => {
                expect(res.status).toBe(201);
                expect(res.body.data.id).toBeDefined();
            });

            const listRes = await request(app).get("/api/users");
            expect(listRes.body.data.length).toBe(3);
        });
    });
});
