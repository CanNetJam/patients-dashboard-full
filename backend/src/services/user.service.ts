import { users } from "../data/user.store";
import { User } from "../models/user.model";

export const UserService = {
    getAll(): User[] {
        return users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },

    getById(id: number): User | undefined {
        return users.find(u => u.id === id);
    },

    create(
        name: string,
        dateOfBirth: Date | string,
        age: number,
        sex: 'male' | 'female'
    ): User {
        let lastId = users.length > 0 ? users[users.length - 1].id : 0;

        const user: User = {
            id: lastId + 1,
            name,
            dateOfBirth,
            age,
            sex,
            createdAt: new Date(Date.now())
        };

        users.push(user);
        return user;
    }
};
