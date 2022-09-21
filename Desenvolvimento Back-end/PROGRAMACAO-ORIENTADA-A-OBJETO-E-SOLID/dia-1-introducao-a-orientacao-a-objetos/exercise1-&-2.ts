class Student {
    private _enrollment: string;
    private _name: string;
    private _examsGrade: number[];
    private _worksGrade: number[];

    constructor(enrollment: string, name: string, examsGrade: number[],worksGrade: number[]) {
        this._enrollment = enrollment;
        this._name = name;
        this._examsGrade = examsGrade;
        this._worksGrade = worksGrade;
    }

    get enrollment(): string { return this._enrollment; }

    set enrollment(isEnrolled: string) { this._enrollment = isEnrolled; }

    get name(): string { return this._name; }

    get examsGrade(): number[] { return this._examsGrade; }

    set examsGrade(grade:number[]) { this._examsGrade = grade; }

    get worksGrade(): number[] { return this._worksGrade; }

    set worksGrade(grade:number[]) { this._worksGrade = grade; }

    public sumGrades(): number {
        return [...this._examsGrade, ...this._worksGrade].reduce((prevValue, currentValue) => prevValue += currentValue, 0);
    }

    public avgGrades(): number {
        const sumGrades = this.sumGrades();
        return sumGrades/([...this._worksGrade, ...this._examsGrade].length)
    }
}

const student1 = new Student('Matriculado','Caio',[5,6,7,8], [9,10]);

console.log(student1.sumGrades());

console.log(student1.avgGrades());

