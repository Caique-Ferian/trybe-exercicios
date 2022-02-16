// apiScript.js
const API_URL = 'https://icanhazdadjoke.com/';


const fetchJoke = () => {
  const myObject = {
    method : 'GET',
    headers: { 'Accept': 'application/json' }
  };

  fetch(API_URL, myObject)
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById('jokeContainer');
      const paragraph = document.createElement('p');
      paragraph.innerText = data.joke;
      container.appendChild(paragraph);

    });
};
window.onload = () => fetchJoke();
