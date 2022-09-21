import Teacher from './exercise-2B';

export default abstract class EvaluationAbs {
    constructor(private _score: number, private _teacher: Teacher) { }

    get score(): number { return this._score; }
    
    set score(score: number) {
        if(score < 0) {
            throw new Error('Score must be an positive number');
        }
        this._score = score;
    }

    get teacher(): Teacher { return this._teacher; }

    set teacher(teacher: Teacher) { this._teacher = teacher; }
}

