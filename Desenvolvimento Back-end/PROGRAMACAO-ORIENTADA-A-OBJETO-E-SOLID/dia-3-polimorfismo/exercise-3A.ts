import Teacher, {Subject} from './exercise-2B';

export default class Evaluation {
    constructor(private _score: number, private _teacher: Teacher, private _type: string) { }

    get score(): number { return this._score; }
    
    set score(score: number) {
        if(score < 0) {
            throw new Error('Score must be an positive number');
        }
        if(this.type === 'exams' && score > 25) {
            throw new Error('The score of the exam cannot be greater than 25');
        }
        if(this.type === 'works' && score > 50) {
            throw new Error('The score of the work cannot be greater than 50');
        }
        this._score = score;
    }

    get teacher(): Teacher { return this._teacher; }

    set teacher(teacher: Teacher) { this._teacher = teacher; }

    get type(): string { return this._type; }

    set type(type: string) {
        if(type !== 'exams' && type !== 'works') {
            throw new Error('Type must be exams or works');
        }
        this._type = type;
    }
}

const teacher = new Teacher('Roberta',new Date('1990-09-04'),2000, new Subject('History'));

const evalu = new Evaluation(10,teacher,'works');

