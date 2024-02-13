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
    })
}

const operatorButtons = document.querySelectorAll(".operator");
for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener("click", () => {
        // if another operator was previously selected and a new one is immediately selected
        // then the old operator should be replaced with the new operator
        if ((!operator) || (operator && !operand2)) {
            operator = operatorButton.textContent;
        // there is already a complete expression to be evaluated
        // it needs to be evalated, stored in operand1, and shown on the display
        } else {
            operand1 = operate(operator, operand1, operand2);
            if (operand1 !== "") {
                operator = operatorButton.textContent;
                displayValue = operand1;
            } else {
                // tried to divide by zero, need to display ERROR message
                operator = "";
                displayValue = "ERROR";
            }
            operand2 = "";
            updateDisplay(displayValue);
        }
    })
}

const evaluate = document.querySelector("#evaluate");
evaluate.addEventListener("click", () => {
    // if there is an operator but no second operand, the second operand is equal to the first operand
    if (operator && !operand2) {
        operand1 = operate(operator, operand1, operand1);
        operator = "";
        operand2 = "";
        if (operand1 !== "") {
            displayValue = operand1;
        } else {
            // tried to divide by zero
            displayValue = "ERROR";
        }
        updateDisplay(displayValue);
    } else if (operand2) {
        operand1 = operate(operator, operand1, operand2);
        operator = "";
        operand2 = "";
        if (operand1 !== "") {
            displayValue = operand1;
        } else {
            // tried to divide by zero
            displayValue = "ERROR";
        }
        updateDisplay(displayValue);
    }
})

const allClear = document.querySelector("#allclear");
allClear.addEventListener("click", () => {
    operand1 = "";
    operator = "";
    operand2 = "";

    displayValue = "";
    updateDisplay(displayValue);
})

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return String(+a + +b);
            break;
        case "-":
            return String(+a - +b);
            break;
        case "*":
            return String(+a * +b);
            break;
        case "/":
            // should prevent division by zero
            if (b === "0") {
                return ""
            }
            return String(+a / +b);
            break;
    }
}

function updateDisplay(number) {
    display.textContent = number;
}