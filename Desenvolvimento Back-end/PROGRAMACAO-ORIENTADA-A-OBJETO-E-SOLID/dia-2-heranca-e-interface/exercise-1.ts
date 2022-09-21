export default class Person {
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

// const person1 = new Person('Ricardo',new Date('1989-05-15'));
// const person2 = new Person('Rodrigo',new Date('1975-12-20'));

// console.log(person1.name);
// console.log(person1.birthDate);
// person1.name = 'André';
// person1.birthDate = new Date('1930-05-02');
// console.log(person1.name);
// console.log(person1.birthDate);

// console.log(person2.name);
// console.log(person2.birthDate);
// person2.name = 'Matheus';
// person2.birthDate = new Date('1940-05-02');
// console.log(person2.name);
// console.log(person2.birthDate);