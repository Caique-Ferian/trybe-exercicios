import Employee from "./exercise-2A";

export class Subject {
    constructor(private _name: string) { }

    get name() { return this._name; }

    set name(subject: string) { 
        if(subject.length < 3) {
            throw new Error("The subject must be at least 3 characters");
        }
        this._name = subject;
    }
}

export default class Teacher extends Employee {
    constructor(
        name: string,
        birthDate: Date,
        salary: number,
        private _subject: Subject){
        super(name, birthDate, salary);
        this.enrollment = this.generateEnrollment();
    }

    get subject() : Subject { return this._subject; }

    set subject(subject: Subject) { this._subject = subject; }
}

const teacher = new Teacher('Roberta',new Date('1990-09-04'),2000, new Subject('History'));
