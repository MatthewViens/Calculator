const display       = document.querySelector(".output");
const numbers       = document.querySelectorAll(".number");
const operators     = document.querySelectorAll(".operator");
const clearButton   = document.querySelector(".clear");
const equalsButton  = document.querySelector(".equals");
const backButton    = document.querySelector(".back");

let current     = 0;
let operand     = 0;
let operator    = '';
let willClear   = false;
let equalsMode  = false;

function clear() {
  current = 0;
  operand = 0;
  operator = '';
  willClear = false;
  equalsMode = false;
  display.textContent = '0';
  numbers.forEach(function(button) {
    button.style.pointerEvents = 'auto';
  });
}

function equals() {
  if(!willClear) {
    operand = parseInt(display.textContent);
  }
  evaluate();
  numbers.forEach(function(button) {
    button.style.pointerEvents = 'none';
  });
  equalsMode = true;
}

function backspace() {
  display.textContent = display.textContent.slice(0, display.textContent.length - 1);
  if (display.textContent == '') {
    display.textContent = "0";
  }
}

function evaluate() {
  switch (operator) {
    case '+':
      current += operand;
      break;
    case '-':
      current -= operand;
      break;
    case 'x':
      current *= operand;
      break;
    case '÷':
      current /= operand;
      break;
    default:
      current = operand;
      willClear = true;
  }
  if (current.toString().length <= 6) {
    display.textContent = current;
  } else {
    display.textContent = 'Error';
  }
  backButton.style.pointerEvents = 'none';
  willClear = true;
}

function handleOperator(e) {
  numbers.forEach(function(button) {
    button.style.pointerEvents = 'auto';
  });
  if(equalsMode) {
    operand = 0;
  } else {
    operand = parseInt(display.textContent);
  }
  evaluate();
  operator = e.target.textContent;
}

numbers.forEach(function(button) {
  button.addEventListener('click', function() {
    if(display.textContent == "0" || willClear) {
      backButton.style.pointerEvents = 'auto';
      display.textContent = '';
      willClear = false;
    }
    if(display.textContent.toString().length < 6) {
      display.textContent += button.textContent;
    }
  })
});

operators.forEach(function(button) {
  button.addEventListener('click', handleOperator)
});

clearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', equals);
backButton.addEventListener('click', backspace);

