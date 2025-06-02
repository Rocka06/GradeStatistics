export class GradeStatistics {
    constructor(students) {
        if (!students) {
            throw new Error("A tanulók megadása kötelező");
        }
        this.students = students;
    }

    checkEmpty() {
        if (this.students.length === 0) {
            throw new Error("Nincsenek tanulók az adatbázisban");
        }
    }

    getAverage(grades) {
        return grades.reduce((sum, g) => sum + g, 0) / grades.length;
    }

    getClassAverage() {
        this.checkEmpty();
        const allGrades = this.students.flatMap(s => s.grades);
        const total = allGrades.reduce((sum, g) => sum + g, 0);
        return total / allGrades.length;
    }

    getTopStudent() {
        this.checkEmpty();
        let topStudent = this.students[0];
        let highestAvg = this.getAverage(topStudent.grades);

        for (const student of this.students) {
            const avg = this.getAverage(student.grades);
            if (avg > highestAvg) {
                topStudent = student;
                highestAvg = avg;
            }
        }

        return topStudent.name;
    }

    getFailingStudents() {
        this.checkEmpty();
        return this.students
            .filter(s => this.getAverage(s.grades) < 2.0)
            .map(s => s.name);
    }

    getStudentAverage(name) {
        this.checkEmpty();
        const student = this.students.find(s => s.name === name);
        if (!student) {
            throw new Error(`A megadott tanuló (${name}) nem található`);
        }
        return this.getAverage(student.grades);
    }
}