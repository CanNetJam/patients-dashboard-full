import { users } from "../data/user.store";
import { User } from "../models/user.model";
import { checkLastId } from "../utils/last-id-checker";

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
        let lastId = checkLastId(users);
        
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
