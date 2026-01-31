export interface User {
    id: number;
    name: string;
    dateOfBirth: Date | string;
    age: number;
    sex: 'male' | 'female';
    createdAt: Date | string;
}
