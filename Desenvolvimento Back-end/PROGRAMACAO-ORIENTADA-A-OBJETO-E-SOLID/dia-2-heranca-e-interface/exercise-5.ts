import Person from "./exercise-1";
import Employee from './exercise-3';
import Subject from "./exercise-4";

class Teacher extends Person implements Employee {
    public _registration: string;
    constructor(
        name: string,
        birthDate: Date,
        public _salary: number,
        private _subject: Subject,
        public _admissionDate: Date = new Date()) {
        super(name,birthDate);
        this._registration = this.generateRegistration();
    }

    get registration(): string { return this._registration; }

    set registration(registration: string) {
        if(registration.length < 16) {
            throw new Error('The registration must be at least 16 characters');
        }
        this._registration = registration;
    }


    get salary(): number { return this._salary; }

    set salary(salary: number) {
        if(salary < 0) {
            throw new Error('The salary must be an positive number');
        }
        this._salary = salary;
    }

    get admissionDate() : Date { return this._admissionDate; }

    set admissionDate(date: Date) {
        if(date.getTime() > new Date().getTime()) {
            throw new Error("The date can't be from the future");
        }
        this._admissionDate = date;
    }

    get subject() : Subject { return this._subject; }

    set subject(subject: Subject) { this._subject = subject; }

    public generateRegistration(): string {
        return `EMP${Math.random().toString(36).slice(2).toUpperCase()}${Math
            .random().toString(36).slice(2).toUpperCase()}`;
    }
}

const teacher = new Teacher('Roberta',new Date('1980-07-06'),2000,new Subject('History'));

console.log(teacher.admissionDate);
console.log(teacher.name);
console.log(teacher.birthDate);
console.log(teacher.salary);
console.log(teacher.subject.name);
console.log(teacher.registration);