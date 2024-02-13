let operand1;
let operator;
let operand2;

let displayValue = "";

const display = document.querySelector("#display");

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return a + b;
            break;
        case "-":
            return a - b;
            break;
        case "*":
            return a * b;
            break;
        case "/":
            return a / b;
            break;
    }
}

function updateDisplay(number, append) {
    if (append === true) {
        display.textContent += number;
    } else {
        display.textContent = number;
    }
}