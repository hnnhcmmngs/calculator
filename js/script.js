let operand1 = "";
let operator = "";
let operand2 = "";

let displayValue = "";

const display = document.querySelector("#display");

const numberButtons = document.querySelectorAll(".number");
for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        if (!operator) {
            operand1 += numberButton.textContent;
            displayValue = operand1;
            updateDisplay(displayValue);
        } else {
            operand2 += numberButton.textContent;
            displayValue = operand2;
            updateDisplay(displayValue);
        }
        console.log(operand1);
        console.log(operator);
        console.log(operand2);
    })
}

const operatorButtons = document.querySelectorAll(".operator");
for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener("click", () => {
        // if another operator was previously selected and a new one is immediately selected
        // then the old operator should be replaced with the new operator
        if ((!operator) || (operator && !operand2)) {
            operator = operatorButton.textContent;
        } else {
            operand1 = operate(operator, operand1, operand2);
            operator = operatorButton.textContent;
            operand2 = "";
            displayValue = operand1;
            updateDisplay(displayValue);
        }
        console.log(operand1);
        console.log(operator);
        console.log(operand2);
    })
}

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return +a + +b;
            break;
        case "-":
            return +a - +b;
            break;
        case "*":
            return +a * +b;
            break;
        case "/":
            return +a / +b;
            break;
    }
}

function updateDisplay(number) {
    display.textContent = number;
}