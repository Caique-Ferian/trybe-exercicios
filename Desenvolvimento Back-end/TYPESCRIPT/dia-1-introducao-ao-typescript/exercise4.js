"use strict";
var _a, _b;
exports.__esModule = true;
var readline_sync_1 = require("readline-sync");
var exercise2_1 = require("./exercise2");
var exercise3_1 = require("./exercise3");
var monthsOfYear = Object.values(exercise2_1["default"]);
var choiceMonth = readline_sync_1.keyInSelect(monthsOfYear, 'Choose a month');
var seasonsNorth = (_a = {},
    _a[exercise3_1["default"].SPRING] = [exercise2_1["default"].MARCH, exercise2_1["default"].APRIL, exercise2_1["default"].MAY, exercise2_1["default"].JUNE],
    _a[exercise3_1["default"].SUMMER] = [exercise2_1["default"].JUNE, exercise2_1["default"].JULY, exercise2_1["default"].AUGUST, exercise2_1["default"].SEPTEMBER],
    _a[exercise3_1["default"].AUTUMN] = [exercise2_1["default"].SEPTEMBER, exercise2_1["default"].OCTOBER, exercise2_1["default"].NOVEMBER, exercise2_1["default"].DECEMBER],
    _a[exercise3_1["default"].WINTER] = [exercise2_1["default"].DECEMBER, exercise2_1["default"].JANUARY, exercise2_1["default"].FEBRUARY, exercise2_1["default"].MARCH],
    _a);
var seasonsSouth = (_b = {},
    _b[exercise3_1["default"].SPRING] = seasonsNorth.AUTUMN,
    _b[exercise3_1["default"].SUMMER] = seasonsNorth.WINTER,
    _b[exercise3_1["default"].AUTUMN] = seasonsNorth.SPRING,
    _b[exercise3_1["default"].WINTER] = seasonsNorth.SUMMER,
    _b);
var hemispheres = {
    North: seasonsNorth,
    South: seasonsSouth
};
var choiceHemisphere = readline_sync_1.keyInSelect(Object.keys(hemispheres), 'Choose an hemisphere');
var month = Object.values(exercise2_1["default"])[choiceMonth];
var hemisphere = Object.keys(hemispheres)[choiceHemisphere];
var choosenHemisphereSeasons = Object.values(hemispheres)[choiceHemisphere];
console.log("Month: ".concat(month));
console.log("Hemisphere: ".concat(hemisphere));
console.log('Seasons: ');
Object.entries(choosenHemisphereSeasons).map(function (element) {
    if (element[1].includes(month))
        console.log("".concat(element[0]));
});
