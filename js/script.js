let operand1 = "";
let operator = "";
let operand2 = "";

let displayValue = "";

const display = document.querySelector("#display");

const numberButtons = document.querySelectorAll(".number");
for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        if (operator === "") {
            if (operand1.length < 10) {
                operand1 += numberButton.textContent;
                displayValue = operand1;
            }  
        } else {
            if (operand2.length < 10) {
                operand2 += numberButton.textContent;
                displayValue = operand2;
            }
        }
        updateDisplay(displayValue);
    })
}

const operatorButtons = document.querySelectorAll(".operator");
for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener("click", () => {
        // if an expression was previoulsy evaluated, the result of that expression can be used in a new expression
        if (operand1 === "" && displayValue !== "") {
            operand1 = displayValue;
            operator = operatorButton.textContent;
        } 
        if (operand1 !== "") {
            // if another operator was previously selected and a new one is immediately selected
            // then the old operator should be replaced with the new operator
            if (operator === "" || (operator !== "" && operand2 === "")) {
                operator = operatorButton.textContent;
            // there is already a complete expression to be evaluated
            // it needs to be evalated, stored in operand1, and shown on the display
            } else {
                displayValue = operate(operator, operand1, operand2);
                if (displayValue !== "ERROR") {
                    operand1 = displayValue;
                    operator = operatorButton.textContent;
                    operand2 = "";
                    updateDisplay(displayValue);
                } else {
                    // tried to divide by zero
                    operand1 = "";
                    operator = "";
                    operand2 = "";
                    updateDisplay(displayValue);
                    displayValue = "";
                }
            }
        }
    })
}

const evaluate = document.querySelector("#evaluate");
evaluate.addEventListener("click", () => {
    if (operator !== "") {
        // if there is an operator but no second operand, the second operand is equal to the first operand
        if (operand2 === "") {
            displayValue = operate(operator, operand1, operand1);
        } else if (operand2 !== "") {
            displayValue = operate(operator, operand1, operand2);
        }
        operand1 = "";
        operator = "";
        operand2 = "";
        updateDisplay(displayValue);
        if (displayValue === "ERROR") {
            displayValue = "";
        }
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

const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", () => {
    if (operator === "") {
        // do not add decimal to current number if current number already has decimal
        if (operand1.length < 10 && !operand1.includes(".")) { 
            operand1 += ".";
            displayValue = operand1;
        }  
    } else {
        if (operand2.length < 10 && !operand2.includes(".")) {
            operand2 += ".";
            displayValue = operand2;
        }
    }
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
                return "ERROR"
            }
            return String(+a / +b);
            break;
    }
}

function updateDisplay(number) {
    display.textContent = number;
}