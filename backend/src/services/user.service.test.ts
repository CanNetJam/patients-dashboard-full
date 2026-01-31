import { UserService } from "./user.service";
import { users } from "../data/user.store";
import { User } from "../models/user.model";

describe("UserService", () => {
    beforeEach(() => {
        // Reset the users array and nextId before each test
        users.length = 0;

        users.push(
            { id: 1, name: "John", dateOfBirth: new Date(), age: 30, sex: "male", createdAt: new Date() },
            { id: 2, name: "Jane", dateOfBirth: new Date(), age: 25, sex: "female", createdAt: new Date() }
        );
    });

    it("should create a new user", () => {
        const newUser: Omit<User, "id"> = {
            name: "Alice",
            dateOfBirth: new Date(),
            age: 28,
            sex: "female",
            createdAt: new Date()
        };

        const createdUser = UserService.create(
            newUser.name,
            newUser.dateOfBirth,
            newUser.age,
            newUser.sex
        );

        expect(createdUser).toBeDefined();
        expect(createdUser.id).toBe(3);
        expect(createdUser.name).toBe(newUser.name);
        expect(createdUser.dateOfBirth).toBe(newUser.dateOfBirth);
        expect(createdUser.age).toBe(newUser.age);
        expect(createdUser.sex).toBe(newUser.sex);

        // Ensure the new user is added to the users array
        expect(users).toHaveLength(3);
        expect(users).toContainEqual(createdUser);
    });

    it("should increment the user ID for each new user", () => {
        const user1 = UserService.create("Alice Johnson", new Date(), 28, "female");
        const user2 = UserService.create("Bob Brown", new Date(), 35, "male");

        expect(user1.id).toBe(3); // First new user
        expect(user2.id).toBe(4); // Second new user
    });
});