import { users } from "../data/user.store";
import { User } from "../models/user.model";

export const UserService = {
    getAll(): User[] {
        return users;
    },

    getById(id: number): User | undefined {
        return users.find(u => u.id === id);
    },

    create(
        firstName: string,
        lastName: string,
        age: number,
        sex: 'male' | 'female'
    ): User {
        let lastId = users.length > 0 ? users[users.length - 1].id : 0;

        const user: User = {
            id: lastId + 1,
            firstName,
            lastName,
            age,
            sex,
        };

        users.push(user);
        return user;
    }
};
