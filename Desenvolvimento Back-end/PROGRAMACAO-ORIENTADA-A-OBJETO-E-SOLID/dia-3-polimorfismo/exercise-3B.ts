import Evaluation from "./exercise-3A";

export default class EvaluationResult {
    constructor(private _evaluation: Evaluation, private _score: number) { }

    get evaluation(): Evaluation { return this._evaluation; }

    set evaluation(evaluation: Evaluation) { this._evaluation = evaluation; }

    get score(): number { return this._score; }

    set score(score: number) {
        if(score < 0) {
            throw new Error("Score must be an positive number");
        }
        if(this.evaluation.type === 'exams' && score > 25) {
            throw new Error('The score of the exam cannot be greater than 25');
        }
        if(this.evaluation.type === 'works' && score > 50) {
            throw new Error('The score of the works cannot be greater than 50');
        }
        this._score = score;
    }
}