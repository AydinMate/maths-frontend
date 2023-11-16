import { ArithmeticQuestion, Setting } from './types';
import './styles/index.scss';
import { getUrlString } from './functions';

let loader = document.querySelector('.loader') as HTMLElement;

let backgroundElement = document.querySelector('.container') as HTMLElement;
let questionElement = document.querySelector('.question') as HTMLElement;
let problemElement = document.querySelector('.problem') as HTMLElement;
let allOptions: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll('.option');
let allSettings: NodeListOf<HTMLInputElement> =
  document.querySelectorAll('.switch-input');

let data: ArithmeticQuestion = {
  operation: '',
  firstNumber: 0,
  secondNumber: 0,
  answer: 0,
  options: [],
};

let settings: Setting = {
  multiplication: false,
  division: true,
  negative: false,
};

let urlString: string = getUrlString(settings);

function setSettingsSwitches() {
  const trueValues: string[] = [];

  for (const key in settings) {
    if (settings[key]) {
      trueValues.push(key);
    }
  }

  allSettings.forEach((setting) => {
    const settingId = setting.id;

    const isChecked = trueValues.includes(settingId);

    setting.checked = isChecked;
  });
}


function setData(showData: boolean) {
  if (showData) {
    questionElement.style.display = 'block';
    loader.style.display = 'none';
  } else {
    questionElement.style.display = 'none';
    loader.style.display = 'block';
  }
}

function checkAnswer(optionValue: number) {
  const isCorrect = optionValue === data.answer;
  if (isCorrect) {
    backgroundElement.style.backgroundColor = 'green';
  } else {
    backgroundElement.style.backgroundColor = 'red';
  }
  setTimeout(() => {
    backgroundElement.style.backgroundColor = 'black';
  }, 300);
}

function addEventListeners() {
  allOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const optionString = option.textContent;
      let optionValue;

      if (optionString) {
        optionValue = parseInt(optionString);
        checkAnswer(optionValue);
      }

      fetchData(urlString);
    });
  });
  allSettings.forEach((setting) => {
    setting.addEventListener('change', () => {
      const type = setting.id;
      const checked = setting.checked;

      (settings as any)[type] = checked;
      urlString = getUrlString(settings);
      fetchData(urlString);
    });
  });
}

function updateOptions() {
  allOptions.forEach((option, index) => {
    const optionValue = data.options[index];
    if (optionValue != null) {
      option.textContent = optionValue.toString();
    }
  });
}

async function fetchData(urlString: string) {
  try {
    const response = await fetch(
      `http://localhost:5288/get-arithmetic-${urlString}`
    );

    if (!response.ok) {
      setData(false);
      throw new Error('Network response was not ok');
    } else {
      data = await response.json();

      problemElement.innerHTML = `${data.firstNumber} ${data.operation} ${data.secondNumber}`;

      updateOptions();
      setData(true);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

addEventListeners();
setSettingsSwitches();
fetchData(urlString);
