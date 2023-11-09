import { ArithmeticQuestion } from "./types";

let loader = document.querySelector(".loader") as HTMLElement;

let backgroundElement = document.querySelector(".container") as HTMLElement;
let questionElement = document.querySelector(".question") as HTMLElement;
let problemElement = document.querySelector(".problem") as HTMLElement;
let allOptions = document.querySelectorAll(".option");

let data: ArithmeticQuestion = {
  operation: "",
  firstNumber: 0,
  secondNumber: 0,
  answer: 0,
  options: [],
};

function checkOption(option: number, answer: number) {
  if (option === answer) {
    return true;
  } else {
    return false;
  }
}

function setData(showData: boolean) {
  if (showData) {
    questionElement.style.display = "block";
    loader.style.display = "none";
  } else {
    questionElement.style.display = "none";
    loader.style.display = "block";
  }
}

function checkAnswer(optionValue: number) {
  const isCorrect = optionValue === data.answer;
  if (isCorrect) {
    backgroundElement.style.backgroundColor = "green";
  } else {
    backgroundElement.style.backgroundColor = "red";
  }
  setTimeout(() => {
    backgroundElement.style.backgroundColor = "black";
  }, 300);
}

function addEventListeners() {
  allOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const optionString = option.textContent;
      let optionValue;

      if (optionString) {
        optionValue = parseInt(optionString);
        checkAnswer(optionValue);
      }

      fetchData();
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

async function fetchData() {
  try {
    const response = await fetch("http://localhost:5288/get-arithmetic-mn");

    if (!response.ok) {
      setData(false);
      throw new Error("Network response was not ok");
    } else {
      data = await response.json();

      problemElement.innerHTML = `${data.firstNumber} ${data.operation} ${data.secondNumber}`;

      updateOptions();
      setData(true);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

addEventListeners();
fetchData();
