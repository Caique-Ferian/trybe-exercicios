import EvaluationAbs from "./exercise-4A";
import Teacher from './exercise-2B';

export default class Work extends EvaluationAbs {
    constructor(score: number, teacher: Teacher) {
        super(score, teacher);
    }
    set score(score: number) {
        if(score > 50) {
            throw new Error("The score of the work cannot be greater than 50");
        }
        super.score = score;
    }
}

