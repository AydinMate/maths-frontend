import { ArithmeticQuestion } from './types';

var problem = document.querySelector('.problem');
var data: ArithmeticQuestion;

async function fetchData() {
  try {
    const response = await fetch('http://localhost:5288/get-arithmetic-mp');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    data = await response.json();

    problem &&
      (await (problem.innerHTML = `${data.firstNumber} ${data.operation} ${data.secondNumber}`));
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData();

// use pnpm start
