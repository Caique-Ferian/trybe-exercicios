import Person from "./exercise-1";

class Student extends Person {

    constructor(
        name: string,
        birthDate: Date,
        private _enrollment: string = Student.generateEnrollment(),
        private _examsGrade: number[] = [],
        private _worksGrade: number[] = [],
        ) {
        super(name, birthDate);
    }

    get enrollment(): string { return this._enrollment; }

    set enrollment(enrollment: string) { 
        if(enrollment.length < 16) {
            throw new Error("The enrollment must be at least 16 characters");
        }
        this._enrollment = enrollment;
    }

    get examsGrade(): number[] { return this._examsGrade; }

    set examsGrade(grade:number[]) {
        if(grade.length > 4) {
            throw new Error("The examsGrade array must be at maximum 4 grades");
        }
        this._examsGrade = grade;
    }

    get worksGrade(): number[] { return this._worksGrade; }

    set worksGrade(grade:number[]) {
        if(grade.length > 2) {
            throw new Error("The worksGrade array must be at maximum 2 grades");
        }
        this._worksGrade = grade;
    }

    public sumGrades(): number {
        return [...this._examsGrade, ...this._worksGrade].reduce((prevValue, currentValue) => prevValue += currentValue, 0);
    }

    public avgGrades(): number {
        const sumGrades = this.sumGrades();
        return sumGrades/([...this._worksGrade, ...this._examsGrade].length)
    }

    public static generateEnrollment(): string {
        return `STU${Math.random().toString(36).slice(2).toUpperCase()}
        ${Math.random().toString(36).slice(2).toUpperCase()}`;
    }
}

// const student = new Student('Caio', new Date('2000-10-20'));

// console.log(student.enrollment);
// student.name = 'Roberto';
// student.birthDate = new Date('2010-08-22');
// console.log(student.name);
// console.log(student.birthDate);
// student.enrollment = Student.generateEnrollment();
// console.log(student.enrollment);
// student.examsGrade = [5,6,7,8];
// console.log(student.examsGrade);
// student.worksGrade = [9,10];
// console.log(student.worksGrade);
// console.log(student.sumGrades());
// console.log(student.avgGrades());
