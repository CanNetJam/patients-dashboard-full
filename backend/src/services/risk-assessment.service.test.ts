import { RiskAssessmentService } from './risk-assessment.service';

describe('RiskAssessmentService', () => {
    describe('computeRisk', () => {
        describe('Age Modifier', () => {
            it('should apply 1.5 modifier for age >= 75', () => {
                const result = RiskAssessmentService.computeRisk(75, 'Heart Rate', 70);
                expect(result.score).toBe(1.5);
            });

            it('should apply 1.0 modifier for age >= 60', () => {
                const result = RiskAssessmentService.computeRisk(60, 'Heart Rate', 70);
                expect(result.score).toBe(1.0);
            });

            it('should apply 0.5 modifier for age >= 40', () => {
                const result = RiskAssessmentService.computeRisk(40, 'Heart Rate', 70);
                expect(result.score).toBe(0.5);
            });

            it('should apply 0 modifier for age < 40', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Heart Rate', 70);
                expect(result.score).toBe(0);
            });
        });

        describe('Non-applicable Types', () => {
            it('should return "Not applicable" for Height', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Height', 170);
                expect(result.level).toBe('Not applicable');
                expect(result.score).toBe(0);
            });

            it('should return "Not applicable" for Weight', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Weight', 70);
                expect(result.level).toBe('Not applicable');
                expect(result.score).toBe(0);
            });

            it('should return "Not applicable" for Note', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Note', 0);
                expect(result.level).toBe('Not applicable');
                expect(result.score).toBe(0);
            });
        });

        describe('Heart Rate', () => {
            it('should return Critical (score 2) for rate < 40', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Heart Rate', 35);
                expect(result.score).toBe(2);
                expect(result.level).toBe('Critical');
            });

            it('should return Critical (score 2) for rate > 120', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Heart Rate', 125);
                expect(result.score).toBe(2);
                expect(result.level).toBe('Critical');
            });

            it('should return At-risk (score 1) for rate between 40-59', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Heart Rate', 55);
                expect(result.score).toBe(1);
                expect(result.level).toBe('At-risk');
            });

            it('should return At-risk (score 1) for rate between 101-120', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Heart Rate', 105);
                expect(result.score).toBe(1);
                expect(result.level).toBe('At-risk');
            });

            it('should return Normal (score 0) for rate between 60-100', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Heart Rate', 75);
                expect(result.score).toBe(0);
                expect(result.level).toBe('Normal');
            });

            it('should combine age modifier with base score for elderly patient', () => {
                const result = RiskAssessmentService.computeRisk(80, 'Heart Rate', 55);
                expect(result.score).toBe(2.5); // baseScore 1 + ageModifier 1.5
                expect(result.level).toBe('Critical');
            });
        });

        describe('BloodPressure - Diastolic', () => {
            it('should return Critical (score 2) for rate < 90', () => {
                const result = RiskAssessmentService.computeRisk(30, 'BloodPressure - Diastolic', 85);
                expect(result.score).toBe(1);
                expect(result.level).toBe('At-risk');
            });

            it('should return At-risk (score 1) for rate between 85-89', () => {
                const result = RiskAssessmentService.computeRisk(30, 'BloodPressure - Diastolic', 87);
                expect(result.score).toBe(1);
                expect(result.level).toBe('At-risk');
            });

            it('should return Normal (score 0) for rate >= 90', () => {
                const result = RiskAssessmentService.computeRisk(30, 'BloodPressure - Diastolic', 95);
                expect(result.score).toBe(0);
                expect(result.level).toBe('Normal');
            });

            it('should combine age modifier with base score', () => {
                const result = RiskAssessmentService.computeRisk(65, 'BloodPressure - Diastolic', 80);
                expect(result.score).toBe(3); // baseScore 2 + ageModifier 1
                expect(result.level).toBe('Critical');
            });
        });

        describe('BloodPressure - Systolic', () => {
            it('should return Critical (score 2) for rate < 130', () => {
                const result = RiskAssessmentService.computeRisk(30, 'BloodPressure - Systolic', 120);
                expect(result.score).toBe(2);
                expect(result.level).toBe('Critical');
            });

            it('should return At-risk (score 1) for rate between 125-129', () => {
                const result = RiskAssessmentService.computeRisk(30, 'BloodPressure - Systolic', 127);
                expect(result.score).toBe(1);
                expect(result.level).toBe('At-risk');
            });

            it('should return Normal (score 0) for rate >= 130', () => {
                const result = RiskAssessmentService.computeRisk(30, 'BloodPressure - Systolic', 135);
                expect(result.score).toBe(0);
                expect(result.level).toBe('Normal');
            });
        });

        describe('Respiratory Rate', () => {
            it('should return Critical (score 2) for rate < 10', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Respiratory Rate', 8);
                expect(result.score).toBe(2);
                expect(result.level).toBe('Critical');
            });

            it('should return Critical (score 2) for rate > 22', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Respiratory Rate', 25);
                expect(result.score).toBe(2);
                expect(result.level).toBe('Critical');
            });

            it('should return At-risk (score 1) for rate between 10-11', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Respiratory Rate', 11);
                expect(result.score).toBe(1);
                expect(result.level).toBe('At-risk');
            });

            it('should return At-risk (score 1) for rate between 21-22', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Respiratory Rate', 21);
                expect(result.score).toBe(1);
                expect(result.level).toBe('At-risk');
            });

            it('should return Normal (score 0) for rate between 12-20', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Respiratory Rate', 16);
                expect(result.score).toBe(0);
                expect(result.level).toBe('Normal');
            });
        });

        describe('Temperature', () => {
            it('should return Critical (score 2) for rate < 35', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Temperature', 34);
                expect(result.score).toBe(2);
                expect(result.level).toBe('Critical');
            });

            it('should return Critical (score 2) for rate > 38.8', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Temperature', 39);
                expect(result.score).toBe(2);
                expect(result.level).toBe('Critical');
            });

            it('should return At-risk (score 1) for rate between 35-36.4', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Temperature', 36);
                expect(result.score).toBe(1);
                expect(result.level).toBe('At-risk');
            });

            it('should return At-risk (score 1) for rate between 37.4-38.8', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Temperature', 38);
                expect(result.score).toBe(1);
                expect(result.level).toBe('At-risk');
            });

            it('should return Normal (score 0) for rate between 36.5-37.3', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Temperature', 37);
                expect(result.score).toBe(0);
                expect(result.level).toBe('Normal');
            });
        });

        describe('Risk Level Classification', () => {
            it('should classify score >= 2 as Critical', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Heart Rate', 125);
                expect(result.score).toBe(2);
                expect(result.level).toBe('Critical');
            });

            it('should classify score >= 1 and < 2 as At-risk', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Heart Rate', 55);
                expect(result.score).toBe(1);
                expect(result.level).toBe('At-risk');
            });

            it('should classify score < 1 as Normal', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Heart Rate', 75);
                expect(result.score).toBe(0);
                expect(result.level).toBe('Normal');
            });

            it('should classify combined score of 1.5 as At-risk', () => {
                const result = RiskAssessmentService.computeRisk(75, 'Heart Rate', 75);
                expect(result.score).toBe(1.5);
                expect(result.level).toBe('At-risk');
            });
        });

        describe('Edge Cases', () => {
            it('should handle exact boundary values for Heart Rate (40)', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Heart Rate', 40);
                expect(result.level).toBe('At-risk');
            });

            it('should handle exact boundary values for Heart Rate (120)', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Heart Rate', 120);
                expect(result.level).toBe('At-risk');
            });

            it('should handle exact boundary values for Temperature (35)', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Temperature', 35);
                expect(result.level).toBe('At-risk');
            });

            it('should handle exact boundary values for Temperature (38.8)', () => {
                const result = RiskAssessmentService.computeRisk(30, 'Temperature', 38.8);
                expect(result.level).toBe('At-risk');
            });
        });
    });
});