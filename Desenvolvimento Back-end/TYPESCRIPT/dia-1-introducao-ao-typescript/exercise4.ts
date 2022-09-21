import readline from "readline-sync";
import  Months  from "./exercise2";
import Seasons from "./exercise3";

const monthsOfYear: Array<string> = Object.values(Months);

const choiceMonth = readline.keyInSelect(monthsOfYear, 'Choose a month');

type seasons = {
    SPRING: Array<string>,
    SUMMER: Array<string>,
    AUTUMN: Array<string>,
    WINTER: Array<string>,
}

type hemisphere = {
    North: object,
    South: object,
}

const seasonsNorth: seasons = {
    [Seasons.SPRING]: [Months.MARCH, Months.APRIL, Months.MAY, Months.JUNE],
    [Seasons.SUMMER]: [Months.JUNE, Months.JULY, Months.AUGUST, Months.SEPTEMBER],
    [Seasons.AUTUMN]: [Months.SEPTEMBER, Months.OCTOBER, Months.NOVEMBER, Months.DECEMBER],
    [Seasons.WINTER]: [Months.DECEMBER, Months.JANUARY, Months.FEBRUARY, Months.MARCH],
}

const seasonsSouth: seasons = {
    [Seasons.SPRING]: seasonsNorth.AUTUMN,
    [Seasons.SUMMER]: seasonsNorth.WINTER,
    [Seasons.AUTUMN]: seasonsNorth.SPRING,
    [Seasons.WINTER]: seasonsNorth.SUMMER,
}

const hemispheres: hemisphere = {
    North: seasonsNorth,
    South: seasonsSouth,
};

const choiceHemisphere = readline.keyInSelect(Object.keys(hemispheres), 'Choose an hemisphere');

const month:string = Object.values(Months)[choiceMonth];

const hemisphere:string = Object.keys(hemispheres)[choiceHemisphere];

const choosenHemisphereSeasons: object = Object.values(hemispheres)[choiceHemisphere];

console.log(`Month: ${month}`);
console.log(`Hemisphere: ${hemisphere}`);
console.log('Seasons: ');
Object.entries(choosenHemisphereSeasons).map((element) => {
    if(element[1].includes(month))
    console.log(`${element[0]}`);
})