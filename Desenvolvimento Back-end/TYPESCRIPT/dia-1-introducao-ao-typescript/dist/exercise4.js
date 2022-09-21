"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const exercise2_1 = __importDefault(require("./exercise2"));
const exercise3_1 = __importDefault(require("./exercise3"));
const monthsOfYear = Object.values(exercise2_1.default);
const choiceMonth = readline_sync_1.default.keyInSelect(monthsOfYear, 'Choose a month');
const seasonsNorth = {
    [exercise3_1.default.SPRING]: [exercise2_1.default.MARCH, exercise2_1.default.APRIL, exercise2_1.default.MAY, exercise2_1.default.JUNE],
    [exercise3_1.default.SUMMER]: [exercise2_1.default.JUNE, exercise2_1.default.JULY, exercise2_1.default.AUGUST, exercise2_1.default.SEPTEMBER],
    [exercise3_1.default.AUTUMN]: [exercise2_1.default.SEPTEMBER, exercise2_1.default.OCTOBER, exercise2_1.default.NOVEMBER, exercise2_1.default.DECEMBER],
    [exercise3_1.default.WINTER]: [exercise2_1.default.DECEMBER, exercise2_1.default.JANUARY, exercise2_1.default.FEBRUARY, exercise2_1.default.MARCH],
};
const seasonsSouth = {
    [exercise3_1.default.SPRING]: seasonsNorth.AUTUMN,
    [exercise3_1.default.SUMMER]: seasonsNorth.WINTER,
    [exercise3_1.default.AUTUMN]: seasonsNorth.SPRING,
    [exercise3_1.default.WINTER]: seasonsNorth.SUMMER,
};
const hemispheres = {
    North: seasonsNorth,
    South: seasonsSouth,
};
const choiceHemisphere = readline_sync_1.default.keyInSelect(Object.keys(hemispheres), 'Choose an hemisphere');
const month = Object.values(exercise2_1.default)[choiceMonth];
const hemisphere = Object.keys(hemispheres)[choiceHemisphere];
const choosenHemisphereSeasons = Object.values(hemispheres)[choiceHemisphere];
console.log(`Month: ${month}`);
console.log(`Hemisphere: ${hemisphere}`);
console.log('Seasons: ');
Object.entries(choosenHemisphereSeasons).map((element) => {
    if (element[1].includes(month))
        console.log(`${element[0]}`);
});
