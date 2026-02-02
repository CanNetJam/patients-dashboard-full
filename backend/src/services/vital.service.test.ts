import { VitalService } from './vital.service';
import { vitals } from '../data/vital.store';
import { users } from '../data/user.store';
import { Vital } from '../models/vital.model';
import { User } from '../models/user.model';
import { RiskAssessmentService } from './risk-assessment.service';

// Mock the data stores
jest.mock('../data/vital.store', () => ({
    vitals: []
}));

jest.mock('../data/user.store', () => ({
    users: []
}));

// Mock the RiskAssessmentService
jest.mock('./risk-assessment.service', () => ({
    RiskAssessmentService: {
        computeRisk: jest.fn()
    }
}));

describe('VitalService', () => {
    beforeEach(() => {
        // Clear arrays before each test
        vitals.length = 0;
        users.length = 0;
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return an empty array when no vitals exist', () => {
            const result = VitalService.getAll();
            expect(result).toEqual([]);
            expect(result.length).toBe(0);
        });

        it('should return all vitals', () => {
            const vital1: Vital = {
                id: 1,
                userId: 1,
                type: 'Heart Rate',
                value: 75,
                unit: 'bpm',
                riskScore: 'Normal',
                details: 'Normal reading',
                createdAt: new Date('2024-01-01')
            };
            const vital2: Vital = {
                id: 2,
                userId: 1,
                type: 'Temperature',
                value: 37,
                unit: '°C',
                riskScore: 'Normal',
                details: 'Normal temp',
                createdAt: new Date('2024-01-02')
            };

            vitals.push(vital1, vital2);

            const result = VitalService.getAll();
            expect(result.length).toBe(2);
            expect(result).toContainEqual(vital1);
            expect(result).toContainEqual(vital2);
        });
    });

    describe('getById', () => {
        it('should return an empty array when no vitals exist for the user', () => {
            const result = VitalService.getById(1);
            expect(result).toEqual([]);
        });

        it('should return only vitals for the specified user', () => {
            const vital1: Vital = {
                id: 1,
                userId: 1,
                type: 'Heart Rate',
                value: 75,
                unit: 'bpm',
                riskScore: 'Normal',
                details: 'User 1 reading',
                createdAt: new Date('2024-01-01')
            };
            const vital2: Vital = {
                id: 2,
                userId: 2,
                type: 'Temperature',
                value: 37,
                unit: '°C',
                riskScore: 'Normal',
                details: 'User 2 reading',
                createdAt: new Date('2024-01-02')
            };
            const vital3: Vital = {
                id: 3,
                userId: 1,
                type: 'Respiratory Rate',
                value: 16,
                unit: 'breaths/min',
                riskScore: 'Normal',
                details: 'User 1 reading 2',
                createdAt: new Date('2024-01-03')
            };

            vitals.push(vital1, vital2, vital3);

            const result = VitalService.getById(1);
            expect(result.length).toBe(2);
            expect(result).toContainEqual(vital1);
            expect(result).toContainEqual(vital3);
            expect(result).not.toContainEqual(vital2);
        });

        it('should return vitals sorted by createdAt in descending order (newest first)', () => {
            const oldVital: Vital = {
                id: 1,
                userId: 1,
                type: 'Heart Rate',
                value: 75,
                unit: 'bpm',
                riskScore: 'Normal',
                details: 'Old reading',
                createdAt: new Date('2024-01-01')
            };
            const middleVital: Vital = {
                id: 2,
                userId: 1,
                type: 'Temperature',
                value: 37,
                unit: '°C',
                riskScore: 'Normal',
                details: 'Middle reading',
                createdAt: new Date('2024-01-15')
            };
            const newVital: Vital = {
                id: 3,
                userId: 1,
                type: 'Respiratory Rate',
                value: 16,
                unit: 'breaths/min',
                riskScore: 'Normal',
                details: 'New reading',
                createdAt: new Date('2024-01-30')
            };

            vitals.push(oldVital, middleVital, newVital);

            const result = VitalService.getById(1);
            expect(result[0]).toEqual(newVital);
            expect(result[1]).toEqual(middleVital);
            expect(result[2]).toEqual(oldVital);
        });

        it('should return empty array for non-existent user id', () => {
            const vital: Vital = {
                id: 1,
                userId: 1,
                type: 'Heart Rate',
                value: 75,
                unit: 'bpm',
                riskScore: 'Normal',
                details: 'Reading',
                createdAt: new Date('2024-01-01')
            };

            vitals.push(vital);

            const result = VitalService.getById(999);
            expect(result).toEqual([]);
        });
    });

    describe('create', () => {
        it('should throw error when patient is not found', () => {
            expect(() => {
                VitalService.create(999, 'Heart Rate', 75, 'bpm', 'Test reading');
            }).toThrow('Patient not found');
        });

        it('should create a vital with id 1 when no vitals exist', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            users.push(user);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 0,
                level: 'Normal'
            });

            const result = VitalService.create(1, 'Heart Rate', 75, 'bpm', 'Normal reading');

            expect(result.id).toBe(1);
        });

        it('should increment id based on last vital in array', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            users.push(user);

            const existingVital: Vital = {
                id: 5,
                userId: 1,
                type: 'Heart Rate',
                value: 75,
                unit: 'bpm',
                riskScore: 'Normal',
                details: 'Existing',
                createdAt: new Date('2024-01-01')
            };
            vitals.push(existingVital);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 0,
                level: 'Normal'
            });

            const result = VitalService.create(1, 'Temperature', 37, '°C', 'New reading');

            expect(result.id).toBe(6);
        });

        it('should call RiskAssessmentService.computeRisk with correct parameters', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            users.push(user);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 0,
                level: 'Normal'
            });

            VitalService.create(1, 'Heart Rate', 75, 'bpm', 'Test');

            expect(RiskAssessmentService.computeRisk).toHaveBeenCalledWith(34, 'Heart Rate', 75);
        });

        it('should set riskScore from RiskAssessmentService result', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            users.push(user);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 2,
                level: 'Critical'
            });

            const result = VitalService.create(1, 'Heart Rate', 130, 'bpm', 'High heart rate');

            expect(result.riskScore).toBe('Critical');
        });

        it('should add the created vital to the vitals array', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            users.push(user);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 0,
                level: 'Normal'
            });

            const initialLength = vitals.length;

            VitalService.create(1, 'Heart Rate', 75, 'bpm', 'Test');

            expect(vitals.length).toBe(initialLength + 1);
        });

        it('should create vital with all correct properties', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            users.push(user);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 0,
                level: 'Normal'
            });

            const result = VitalService.create(1, 'Heart Rate', 75, 'bpm', 'Normal reading');

            expect(result).toHaveProperty('id');
            expect(result.userId).toBe(1);
            expect(result.type).toBe('Heart Rate');
            expect(result.value).toBe(75);
            expect(result.unit).toBe('bpm');
            expect(result.riskScore).toBe('Normal');
            expect(result.details).toBe('Normal reading');
            expect(result).toHaveProperty('createdAt');
            expect(result.createdAt).toBeInstanceOf(Date);
        });

        it('should handle all vital types correctly', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            users.push(user);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 0,
                level: 'Normal'
            });

            const vitalTypes: Vital['type'][] = [
                'Heart Rate',
                'Respiratory Rate',
                'BloodPressure - Diastolic',
                'BloodPressure - Systolic',
                'Temperature',
                'Height',
                'Weight',
                'Note'
            ];

            vitalTypes.forEach((type, index) => {
                const result = VitalService.create(1, type, 100, 'unit', `Test ${type}`);
                expect(result.type).toBe(type);
                expect(result.id).toBe(index + 1);
            });
        });

        it('should handle "At-risk" level from risk assessment', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            users.push(user);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 1,
                level: 'At-risk'
            });

            const result = VitalService.create(1, 'Heart Rate', 105, 'bpm', 'Elevated');

            expect(result.riskScore).toBe('At-risk');
        });

        it('should handle "Not applicable" level from risk assessment', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            users.push(user);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 0,
                level: 'Not applicable'
            });

            const result = VitalService.create(1, 'Height', 170, 'cm', 'Height measurement');

            expect(result.riskScore).toBe('Not applicable');
        });

        it('should set createdAt to current timestamp', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            users.push(user);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 0,
                level: 'Normal'
            });

            const beforeCreate = Date.now();
            const result = VitalService.create(1, 'Heart Rate', 75, 'bpm', 'Test');
            const afterCreate = Date.now();

            const createdAtTime = new Date(result.createdAt).getTime();
            expect(createdAtTime).toBeGreaterThanOrEqual(beforeCreate);
            expect(createdAtTime).toBeLessThanOrEqual(afterCreate);
        });

        it('should handle multiple vitals for the same user', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                age: 34,
                sex: 'male',
                createdAt: new Date('2024-01-01')
            };
            users.push(user);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 0,
                level: 'Normal'
            });

            VitalService.create(1, 'Heart Rate', 75, 'bpm', 'Reading 1');
            VitalService.create(1, 'Temperature', 37, '°C', 'Reading 2');
            VitalService.create(1, 'Respiratory Rate', 16, 'breaths/min', 'Reading 3');

            expect(vitals.length).toBe(3);
            expect(vitals.every(v => v.userId === 1)).toBe(true);
        });

        it('should handle multiple users with different vitals', () => {
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
                name: 'Jane Doe',
                dateOfBirth: new Date('1985-01-01'),
                age: 39,
                sex: 'female',
                createdAt: new Date('2024-01-01')
            };
            users.push(user1, user2);

            (RiskAssessmentService.computeRisk as jest.Mock).mockReturnValue({
                score: 0,
                level: 'Normal'
            });

            VitalService.create(1, 'Heart Rate', 75, 'bpm', 'User 1');
            VitalService.create(2, 'Temperature', 37, '°C', 'User 2');

            expect(vitals.length).toBe(2);
            expect(vitals[0].userId).toBe(1);
            expect(vitals[1].userId).toBe(2);
        });
    });
});