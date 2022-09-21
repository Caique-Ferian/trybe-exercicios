export default class Subject {
    constructor(private _name: string) { }

    get name() { return this._name; }

    set name(subject: string) { 
        if(subject.length < 3) {
            throw new Error("The subject must be at least 3 characters");
        }
        this._name = subject;
    }
}