import { UserService } from "./user.service";
import { users } from "../data/user.store";
import { User } from "../models/user.model";

describe("UserService", () => {
    beforeEach(() => {
        // Reset the users array and nextId before each test
        users.length = 0;

        users.push(
            { id: 1, firstName: "John", lastName: "Doe", age: 30, sex: "male" },
            { id: 2, firstName: "Jane", lastName: "Smith", age: 25, sex: "female" }
        );
    });

    it("should create a new user", () => {
        const newUser: Omit<User, "id"> = {
            firstName: "Alice",
            lastName: "Johnson",
            age: 28,
            sex: "female"
        };

        const createdUser = UserService.create(
            newUser.firstName,
            newUser.lastName,
            newUser.age,
            newUser.sex
        );

        expect(createdUser).toBeDefined();
        expect(createdUser.id).toBe(3); 
        expect(createdUser.firstName).toBe(newUser.firstName);
        expect(createdUser.lastName).toBe(newUser.lastName);
        expect(createdUser.age).toBe(newUser.age);
        expect(createdUser.sex).toBe(newUser.sex);

        // Ensure the new user is added to the users array
        expect(users).toHaveLength(3);
        expect(users).toContainEqual(createdUser);
    });

    it("should increment the user ID for each new user", () => {
        const user1 = UserService.create("Alice", "Johnson", 28, "female");
        const user2 = UserService.create("Bob", "Brown", 35, "male");

        expect(user1.id).toBe(3); // First new user
        expect(user2.id).toBe(4); // Second new user
    });
});