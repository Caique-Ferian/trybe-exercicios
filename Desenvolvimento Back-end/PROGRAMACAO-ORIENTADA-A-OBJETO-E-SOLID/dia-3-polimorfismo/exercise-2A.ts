import Person from './exercise-1';
import { Enrollable } from './exercise-2C';

export default class Employee extends Person implements Enrollable {
    public _enrollment: string;
    constructor(name: string, birthDate: Date, private _salary: number, private _admissionDate: Date = new Date()) {
        super(name, birthDate);
        this._enrollment = this.generateEnrollment();
    }

    get enrollment(): string { return this._enrollment; }

    set enrollment(enrollment: string) { 
        if(enrollment.length < 16) {
            throw new Error("The enrollment must be at least 16 characters");
        }
        this._enrollment = enrollment;
    }

    get salary(): number { return this._salary; }

    set salary(salary: number) {
        if(salary < 0) {
            throw new Error("The salary must be an positive number");
        }
        this._salary = salary;
    }

    get admissionDate(): Date { return this._admissionDate; }

    set admissionDate(date: Date) { 
        if(date.getTime() > new Date().getTime()) {
            throw new Error("The date can't be from the future");
        }
        this._admissionDate = date;
    }

    public generateEnrollment(): string {
        return `EMP${Math.random().toString(36).slice(2).toUpperCase()}${Math.
            random().toString(36).slice(2).toUpperCase()}`;
    }
}  