import { expect, describe, it } from "vitest";
import { GradeStatistics } from "./GradeStatistics";

const students1 = [
    { name: "Anna", grades: [5, 4, 5] },
    { name: "Béla", grades: [1, 2, 2] },
    { name: "Csaba", grades: [3, 4, 4] },
];

const students2 = [
    { name: "Dóra", grades: [5, 5, 5] },
    { name: "Ernő", grades: [2, 2, 1] },
];

it('throws error if student list is null or undefined', () => {
    expect(() => new GradeStatistics(null)).toThrow("A tanulók megadása kötelező");
    expect(() => new GradeStatistics(undefined)).toThrow("A tanulók megadása kötelező");
});

it('throws error if methods are called on empty list', () => {
    const stats = new GradeStatistics([]);
    expect(() => stats.getClassAverage()).toThrow("Nincsenek tanulók az adatbázisban");
    expect(() => stats.getTopStudent()).toThrow("Nincsenek tanulók az adatbázisban");
    expect(() => stats.getFailingStudents()).toThrow("Nincsenek tanulók az adatbázisban");
    expect(() => stats.getStudentAverage("Anna")).toThrow("Nincsenek tanulók az adatbázisban");
});

it('calculates class average correctly', () => {
    const stats = new GradeStatistics(students1);
    expect(stats.getClassAverage()).toBeCloseTo(3.33, 1);
});

it('returns top student correctly', () => {
    const stats = new GradeStatistics(students1);
    expect(stats.getTopStudent()).toBe("Anna");
});

it('returns failing students correctly', () => {
    const stats = new GradeStatistics(students1);
    expect(stats.getFailingStudents()).toContain("Béla");
    expect(stats.getFailingStudents()).not.toContain("Anna");
});

it('getStudentAverage returns correct averages', () => {
    const stats = new GradeStatistics(students1);
    expect(stats.getStudentAverage("Anna")).toBeCloseTo(4.67, 1);
    expect(stats.getStudentAverage("Béla")).toBeCloseTo(1.67, 1);
    expect(stats.getStudentAverage("Csaba")).toBeCloseTo(3.67, 1);
});

it('getStudentAverage throws error if student not found', () => {
    const stats = new GradeStatistics(students2);
    expect(() => stats.getStudentAverage("Noname")).toThrow("A megadott tanuló (Noname) nem található");
});

it('works correctly with second list of students', () => {
    const stats = new GradeStatistics(students2);
    expect(stats.getTopStudent()).toBe("Dóra");
    expect(stats.getFailingStudents()).toContain("Ernő");
    expect(stats.getClassAverage()).toBeCloseTo(3.33, 1);
});