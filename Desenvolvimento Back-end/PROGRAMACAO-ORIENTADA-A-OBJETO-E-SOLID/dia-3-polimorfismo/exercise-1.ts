export default abstract class Person {
    constructor(private _name: string, private _birthDate: Date) { }
    
    get name(): string { return this._name; }
    
    set name(name: string) { 
        if(name.length < 3) {
            throw new Error("The name must be at least 3 characters");
        }
        this._name = name;
    }

    get birthDate(): Date { return this._birthDate; }

    private static getAge(date:Date): number {
        const age = Math.abs(new Date().getTime() - date.getTime());
        const yearMs = 31_536_000_000;
        return age/yearMs;
    }
    
    set birthDate(birthDate: Date) { 
        if(birthDate.getTime() > new Date().getTime()) {
            throw new Error("The date can't be from the future");
        }
        if(Person.getAge(birthDate) > 120) {
            throw new Error("The person has to be at least 120 years old");
        }
        this._birthDate = birthDate;
    }
}