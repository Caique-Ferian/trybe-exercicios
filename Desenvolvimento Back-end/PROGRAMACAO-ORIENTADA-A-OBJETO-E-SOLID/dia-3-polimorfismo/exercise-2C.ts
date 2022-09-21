import Person from './exercise-1';
import EvaluationResult from './exercise-3B';

export interface Enrollable {
    _enrollment: string;
    generateEnrollment() : string;
}

export default class Student extends Person implements Enrollable{
    public _enrollment: string
    constructor(
        name: string,
        birthDate: Date,
        private _evaluationsResult: number[],
        ) {
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

    get evaluationsResult(): number[] { return this._evaluationsResult; }

    public addEvaluationResult(evaluation: number): void {
        this._evaluationsResult.push(evaluation);
    }

    // public sumGrades(): number {
    //     return [...this._evaluationsResult].reduce((prevValue, currentValue) => prevValue += currentValue.score, 0);
    // }

    // public avgGrades(): number {
    //     const sumGrades = this.sumGrades();
    //     return sumGrades/([...this._evaluationsResult].length)
    // }

    public generateEnrollment(): string {
        return `STU${Math.random().toString(36).slice(2).toUpperCase()}
        ${Math.random().toString(36).slice(2).toUpperCase()}`;
    }
}

