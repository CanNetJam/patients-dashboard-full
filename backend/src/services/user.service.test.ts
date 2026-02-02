import { UserService } from './user.service';
import { users } from '../data/user.store';
import { User } from '../models/user.model';

// Mock the user store
jest.mock('../data/user.store', () => ({
    users: []
}));

describe('UserService', () => {
    beforeEach(() => {
        // Clear the users array before each test
        users.length = 0;
    });

    describe('getAll', () => {
        it('should return an empty array when no users exist', () => {
            const result = UserService.getAll();
            expect(result).toEqual([]);
            expect(result.length).toBe(0);
        });

        it('should return all users', () => {
            const user1: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            const user2: User = {
                id: 2,
                name: 'Jane Smith',
                dateOfBirth: new Date('1985-05-15'),
                age: 39,
                sex: 'female',
                createdAt: new Date('2024-01-02')
            };

            users.push(user1, user2);

            const result = UserService.getAll();
            expect(result.length).toBe(2);
            expect(result).toContainEqual(user1);
            expect(result).toContainEqual(user2);
        });

        it('should return users sorted by createdAt in descending order (newest first)', () => {
            const oldUser: User = {
                id: 1,
                name: 'Old User',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            const middleUser: User = {
                id: 2,
                name: 'Middle User',
                dateOfBirth: new Date('1985-05-15'),
                age: 39,
                sex: 'female',
                createdAt: new Date('2024-01-15')
            };
            const newUser: User = {
                id: 3,
                name: 'New User',
                dateOfBirth: new Date('1995-03-20'),
                age: 29,
                sex: 'male',
                createdAt: new Date('2024-01-30')
            };

            users.push(oldUser, middleUser, newUser);

            const result = UserService.getAll();
            expect(result[0]).toEqual(newUser);
            expect(result[1]).toEqual(middleUser);
            expect(result[2]).toEqual(oldUser);
        });

        it('should handle users with same createdAt timestamp', () => {
            const sameDate = new Date('2024-01-01');
            const user1: User = {
                id: 1,
                name: 'User 1',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: sameDate
            };
            const user2: User = {
                id: 2,
                name: 'User 2',
                dateOfBirth: new Date('1985-05-15'),
                age: 39,
                sex: 'female',
                createdAt: sameDate
            };

            users.push(user1, user2);

            const result = UserService.getAll();
            expect(result.length).toBe(2);
        });
    });

    describe('getById', () => {
        it('should return undefined when user does not exist', () => {
            const result = UserService.getById(999);
            expect(result).toBeUndefined();
        });

        it('should return the correct user by id', () => {
            const user1: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            const user2: User = {
                id: 2,
                name: 'Jane Smith',
                dateOfBirth: new Date('1985-05-15'),
                age: 39,
                sex: 'female',
                createdAt: new Date('2024-01-02')
            };

            users.push(user1, user2);

            const result = UserService.getById(2);
            expect(result).toEqual(user2);
        });

        it('should return the first user when searching for id 1', () => {
            const user: User = {
                id: 1,
                name: 'First User',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };

            users.push(user);

            const result = UserService.getById(1);
            expect(result).toEqual(user);
        });

        it('should return undefined for id 0', () => {
            const result = UserService.getById(0);
            expect(result).toBeUndefined();
        });

        it('should return undefined for negative id', () => {
            const result = UserService.getById(-1);
            expect(result).toBeUndefined();
        });
    });

    describe('create', () => {
        it('should create a new user with id 1 when no users exist', () => {
            const name = 'John Doe';
            const dateOfBirth = new Date('1990-01-01');
            const age = 34;
            const sex = 'male';

            const result = UserService.create(name, dateOfBirth, age, sex);

            expect(result.id).toBe(1);
            expect(result.name).toBe(name);
            expect(result.dateOfBirth).toBe(dateOfBirth);
            expect(result.age).toBe(age);
            expect(result.sex).toBe(sex);
            expect(result.createdAt).toBeInstanceOf(Date);
        });

        it('should increment id based on last user in array', () => {
            const existingUser: User = {
                id: 5,
                name: 'Existing User',
                dateOfBirth: new Date('1985-01-01'),
                age: 39,
                sex: 'female',
                createdAt: new Date('2024-01-01')
            };

            users.push(existingUser);

            const result = UserService.create('New User', new Date('1990-01-01'), 34, 'male');

            expect(result.id).toBe(6);
        });

        it('should add the created user to the users array', () => {
            const initialLength = users.length;

            UserService.create('John Doe', new Date('1990-01-01'), 34, 'male');

            expect(users.length).toBe(initialLength + 1);
            expect(users[users.length - 1].name).toBe('John Doe');
        });

        it('should handle dateOfBirth as a string', () => {
            const dateString = '1990-01-01';
            const result = UserService.create('John Doe', dateString, 34, 'male');

            expect(result.dateOfBirth).toBe(dateString);
        });

        it('should handle dateOfBirth as a Date object', () => {
            const dateObj = new Date('1990-01-01');
            const result = UserService.create('John Doe', dateObj, 34, 'male');

            expect(result.dateOfBirth).toBe(dateObj);
        });

        it('should create female user correctly', () => {
            const result = UserService.create('Jane Doe', new Date('1990-01-01'), 34, 'female');

            expect(result.sex).toBe('female');
        });

        it('should set createdAt to current timestamp', () => {
            const beforeCreate = Date.now();
            const result = UserService.create('John Doe', new Date('1990-01-01'), 34, 'male');
            const afterCreate = Date.now();

            const createdAtTime = new Date(result.createdAt).getTime();
            expect(createdAtTime).toBeGreaterThanOrEqual(beforeCreate);
            expect(createdAtTime).toBeLessThanOrEqual(afterCreate);
        });

        it('should handle multiple user creations in sequence', () => {
            UserService.create('User 1', new Date('1990-01-01'), 34, 'male');
            UserService.create('User 2', new Date('1985-01-01'), 39, 'female');
            UserService.create('User 3', new Date('1995-01-01'), 29, 'male');

            expect(users.length).toBe(3);
            expect(users[0].id).toBe(1);
            expect(users[1].id).toBe(2);
            expect(users[2].id).toBe(3);
        });

        it('should handle edge case ages', () => {
            const youngUser = UserService.create('Young User', new Date('2020-01-01'), 4, 'male');
            const oldUser = UserService.create('Old User', new Date('1920-01-01'), 104, 'female');

            expect(youngUser.age).toBe(4);
            expect(oldUser.age).toBe(104);
        });

        it('should preserve all user properties', () => {
            const name = 'Complete Test User';
            const dob = new Date('1988-06-15');
            const age = 36;
            const sex = 'female';

            const result = UserService.create(name, dob, age, sex);

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('name', name);
            expect(result).toHaveProperty('dateOfBirth', dob);
            expect(result).toHaveProperty('age', age);
            expect(result).toHaveProperty('sex', sex);
            expect(result).toHaveProperty('createdAt');
        });
    });
});