const randomNumbers = () => Math.floor(Math.random() * 100);
const upperCase = (str) => str.toUpperCase();
const firstLetter = (str) => str.split('')[0];
const stringConcat = (str1,str2) => str1.concat(str2);
const fetchDog = async () => {
    const URL = 'https://dog.ceo/api/breeds/image/random';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
};
module.exports = {randomNumbers, upperCase,firstLetter, stringConcat, fetchDog}; ;