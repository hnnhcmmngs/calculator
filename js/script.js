let operand1 = "";
let operator = "";
let operand2 = "";

let displayValue = "";
const display = document.querySelector("#display");
updateDisplay(displayValue);

const numberButtons = document.querySelectorAll(".number");
for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        // prevent leading 0s from being added to number
        if (numberButton.textContent === "0" && +displayValue === 0 && !displayValue.includes(".")) {
            displayValue = "0";
        } else if (operator === "") {
            if ((!operand1.includes("-") && operand1.length < 9) || (operand1.includes("-") && operand1.length < 10)) {
                operand1 += numberButton.textContent;
                displayValue = operand1;
            }  
        } else {
            if ((!operand2.includes("-") && operand2.length < 9) || (operand2.includes("-") && operand2.length < 10)) {
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
        } else if (display.textContent !== "ERROR") {
            operand1 = "0";
            operator = operatorButton.textContent;
            updateDisplay(displayValue);
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
        // or if current number is too long already
        if (((!operand1.includes("-") && operand1.length < 9) || (operand1.includes("-") && operand1.length < 10)) && !operand1.includes(".")) { 
            if (operand1 === "") {
                operand1 += "0";
            }
            operand1 += ".";
            displayValue = operand1;
        }  
    } else {
        if (((!operand2.includes("-") && operand2.length < 9) || (operand2.includes("-") && operand2.length < 10)) && !operand2.includes(".")) {
            if (operand2 === "") {
                operand2 += "0";
            }
            operand2 += ".";
            displayValue = operand2;
        }
    }
    updateDisplay(displayValue);
})

const sign = document.querySelector("#sign");
sign.addEventListener("click", () => {
    // do not apply sign to value of 0
    if (+displayValue !== 0) {
        if (operand1 !== "") {
            if (operator === "") {
                // number is already negative, remove negative sign
                if (operand1[0] === "-") {
                    operand1 = operand1.slice(1);
                // string is positive, add negative sign
                } else {
                    operand1 = "-" + operand1;
                }
                displayValue = operand1;
            } else if (operand2 !== "") {
                if (operand2[0] === "-") {
                    operand2 = operand2.slice(1);
                } else {
                    operand2 = "-" + operand2;
                }
                displayValue = operand2;
            }
        // negate result from previous expression
        } else if (displayValue !== "") {
            if (displayValue[0] === "-") {
                operand1 = displayValue.slice(1);
            } else {
                operand1 = "-" + displayValue;
            }
            displayValue = operand1;
        }
        updateDisplay(displayValue);
    }
})

const percent = document.querySelector("#percent");
percent.addEventListener("click", () => {
    if (operand1 !== "") {
        if (operator === "") {
            operand1 = String(operand1 / 100);
            displayValue = operand1;
        // if only one operand and an operator, apply the percentage to the operand and multiply by operand
        // store this value in second operand
        // e.g if 9 + % is typed, then the second operand is 9 * 0.09 = 0.81 and the new expression is 9 + 0.81
        } else if (operator !== "" && operand2 === "") {
            operand2 = String(operand1 * (operand1 / 100));
            displayValue = operand2;
        } else {
            operand2 = String(operand2 / 100);
            displayValue = operand2;
        }
        updateDisplay(displayValue);
    // percent of result from previous expression
    } else if (displayValue !== "") {
        operand1 = String(displayValue / 100);
        displayValue = operand1;
        updateDisplay(displayValue);
    }
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
    let negative = false;
    let toDisplay;
    number = String(number);
    if (number === "") {
        display.textContent = "0";
    } else if ((!number.includes("-") && number.length > 9) || (number.includes("-") && number.length > 10)) {
        if (number[0] === "-") {
            number = number.slice(1);
            negative = true;
        }
        // convert large integer to exponential form or else it will overflow on the display
        // convert very small decimal to exponential form or else it will overflow on the display
        if (Math.abs(+number) >= 1000000000 || Math.abs(+number) < 0.0000001) {
            toDisplay = Number.parseFloat(number).toExponential(4);
            let n = 3;
            while (toDisplay.length > 9 && n > 0) {
                toDisplay = Number.parseFloat(number).toExponential(n);
                n--;
            }
        // round the fractional part to fit within 9 digits
        } else {
            numComps = number.split(".");
            toDisplay = Number.parseFloat(number).toFixed(Math.max(0, 9 - (numComps[0].length + 1)));
        }
        if (negative) {
            toDisplay = "-" + toDisplay;
        }
        display.textContent = toDisplay;
    } else {
        display.textContent = number;
    }
}