class Data {
    private _day: number;
    private _month: number;
    private _year: number;

    constructor(day: number, month: number, year: number) {
        const date = `${year}-${month}-${day}`;
        if(new Date(date).getDate() !== day) {
            this._day = 1;
            this._month = 1;
            this._year = 1900;
        } else {
            this._day = day;
            this._month = month;
            this._year = year;
        }
    }

    get day(): number { return this._day; }

    set day(day: number) {
        if(day < 0 || day > 31) {
            throw new Error('Dia Inválido');
        }
        this._day = day;
    }

    get month(): number { return this._month; }

    set month(month: number) {
        if(month < 0 || month > 12) {
            throw new Error('Mês Inválido');
        }
        this._month = month;
    }

    get year(): number { return this._year; }

    set year(year: number) {
        if(year < 0) {
            throw new Error('Ano Inválido');
        }
        this._year = year;
    }

    public getMonthName(): string {
        const months: string[] =['January', 'February','March','April','May',
        'June','July','August','September','October','November','December'];

        return months[this._month - 1];
    }

    public isLeapYear(): boolean { return this._year % 4 === 0 }

    public compare(date: Data): number {
        const currentDate = `${this.year}-${this.month}-${this.day}`;
        const compareDate = `${date.year}-${date.month}-${date.day}`

        if(new Date(currentDate) >  new Date(compareDate)) return 1;
        if(new Date(currentDate) <  new Date(compareDate)) return -1;

        return 0;
    }

    public format(formatting: string): string {
        const validation: boolean[] = [(!formatting.match(/a{2,4}/g)),
        (!formatting.match(/m{2}/g) && !formatting.match(/M{1}/g)),
        (!formatting.match(/d{2}/g))];
        if(validation.every((format) => format)) {
            throw new Error(`O formato passado é inválido: ${formatting}`);
        }
    const day = this._day < 9 ? `0${this._day}` : this._day.toString();
    const month = this._month < 9 ? `0${this._month}` : this._month.toString();
    const year = this._year.toString();

    return formatting.replace('dd',day).replace('M',this.getMonthName())
    .replace('mm',month).replace('aaaa',year).replace('aa',year[2] + year[3]);
    }
}

const testDate = new Data(29,1,1989);
console.log(testDate);
console.log('Dia: ', testDate.day);
console.log('Mês: ', testDate.month);
console.log('Mês por extenso: ', testDate.getMonthName());
console.log('Ano: ', testDate.year);
console.log('É ano bissexto: ', testDate.isLeapYear() ? 'Sim' : 'Não');
console.log(testDate.format('dd/mm/aaaa'));
console.log(testDate.format('dd-mm-aaaa'));
console.log(testDate.format('aaaa/mm/dd'));
console.log(testDate.format('aaaa-mm-dd'));
console.log(testDate.format('dd de M de aa'));
console.log(testDate.format('dd, M de aaaa'));

const otherDate = new Data(30, 1, 2021);

const compared = testDate.compare(otherDate);

const compareStates = ['anterior', 'igual', 'posterior'];

console.log(`A primeira data é ${compareStates[compared + 1]} a segunda.`);

// data inválida
const invalidDate = new Data(31, 2, 2021);

console.log('Teste data inválida: ', invalidDate);

// formato inválido
// console.log(invalidDate.format('a m d'));
