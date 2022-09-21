import EvaluationAbs from "./exercise-4A";
import Teacher from './exercise-2B';

export default class Exam extends EvaluationAbs {
    constructor(score: number, teacher: Teacher) {
        super(score, teacher);
    }
    set score(score: number) {
        if(score > 25) {
            throw new Error("The score of the exam cannot be greater than 25");
        }
        super.score = score;
    }
}