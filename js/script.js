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
        } else {
            operand2 += numberButton.textContent;
        }
    })
}

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
    // the number may either need to be updated or replaced with a new number
    // the append argument accounts for this
    if (append === true) {
        display.textContent += number;
    } else {
        display.textContent = number;
    }
}