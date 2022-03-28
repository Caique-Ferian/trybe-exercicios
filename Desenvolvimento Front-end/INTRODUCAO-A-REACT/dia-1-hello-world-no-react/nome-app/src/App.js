import logo from './logo.svg';
import './App.css';

const array = ['Acordar','Escovar os Dentes','Comer','Jogar','Estudar','Tomar Banho','Dormir'];
const Task = (value) => {
  return (
    <li>{value}</li>
  );
}

function App() {
  return (
    <ol>
      {array.map((element) => Task(element))}
    </ol>
  );
}

export default App;
