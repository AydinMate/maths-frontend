import { ArithmeticQuestion } from './types';

let loader = document.querySelector('.loader') as HTMLElement;

let questionElement = document.querySelector('.question') as HTMLElement;
let problemElement = document.querySelector('.problem') as HTMLElement;
let optionsElement = document.querySelector('.options') as HTMLElement;

let data: ArithmeticQuestion = {
  operation: '',
  firstNumber: 0,
  secondNumber: 0,
  answer: 0,
  options: [],
};

function checkOption (option: number, answer: number) {
  if (option === answer) {
    return true;
  } else {
    return false;
  }
};



function setData(showData: boolean) {
  if (showData) {
    questionElement.style.display = 'block';
    loader.style.display = 'none';
  } else {
    questionElement.style.display = 'none';
    loader.style.display = 'block';
  }
}

async function fetchData() {
  try {
    const response = await fetch('http://localhost:5288/get-arithmetic-mp');

    if (!response.ok) {
      setData(false);
      throw new Error('Network response was not ok');
    } else {
      data = await response.json();

      problemElement.innerHTML = `${data.firstNumber} ${data.operation} ${data.secondNumber}`;

      data.options.forEach((optionValue) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'option';
        optionElement.textContent = optionValue.toString();
        optionsElement.appendChild(optionElement);

        optionElement.addEventListener('click', () => {
          const res = checkOption(optionValue, data.answer);
          console.log(res);
        });
      });

      setData(true);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData();
