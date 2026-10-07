let display = document.getElementById("display");
let buttons = document.querySelectorAll("[data-value]");
let clearButton = document.getElementById("clear");
let backspaceButton = document.getElementById("backspace");
let equalsButton = document.getElementById("equals");

let expression = "";


// Number aur operator buttons
buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        let value = button.getAttribute("data-value");

        // Operator ko handle karna
        if (["+", "-", "*", "/"].includes(value)) {

            // Starting me operator allow nahi karna
            if (expression === "") {
                return;
            }

            // Do operators ek saath allow nahi karna
            let lastCharacter = expression[expression.length - 1];

            if (["+", "-", "*", "/"].includes(lastCharacter)) {
                return;
            }
        }

        expression += value;
        display.value = expression;
    });
});


// Clear button
clearButton.addEventListener("click", function () {

    expression = "";
    display.value = "";
});


// Backspace button
backspaceButton.addEventListener("click", function () {

    expression = expression.slice(0, -1);
    display.value = expression;
});


// Equals button
equalsButton.addEventListener("click", function () {

    if (expression === "") {
        return;
    }

    try {

        // Last character operator hai to calculation mat karo
        let lastCharacter = expression[expression.length - 1];

        if (["+", "-", "*", "/"].includes(lastCharacter)) {
            return;
        }

        let result = eval(expression);

        if (!Number.isFinite(result)) {
            display.value = "Error";
            expression = "";
            return;
        }

        display.value = result;
        expression = result.toString();

    } catch (error) {

        display.value = "Error";
        expression = "";
    }
});