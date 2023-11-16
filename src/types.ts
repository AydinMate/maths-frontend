export interface ArithmeticQuestion {
  operation: string;
  firstNumber: number;
  secondNumber: number;
  answer: number;
  options: number[];
}

export interface Setting {
  multiplication: boolean;
  division: boolean;
  negative: boolean;
  [key: string]: boolean;
}
