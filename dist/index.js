"use strict";
const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let firstOperand = null;
let operator = null;
let shouldResetScreen = false;
function updateScreen(value) {
    if (calculatorScreen) {
        calculatorScreen.value = value;
    }
}
function clearScreen() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    shouldResetScreen = false;
    updateScreen('');
}
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateScreen(currentInput);
}
function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    if (number === '.' && currentInput.includes('.'))
        return;
    currentInput += number;
    updateScreen(currentInput);
}
function chooseOperator(selectedOperator) {
    if (currentInput === '')
        return;
    if (firstOperand !== null) {
        calculate();
    }
    firstOperand = parseFloat(currentInput);
    operator = selectedOperator;
    shouldResetScreen = true;
}
function calculate() {
    if (operator === null || firstOperand === null)
        return;
    const secondOperand = parseFloat(currentInput);
    let result;
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    updateScreen(result.toString());
    currentInput = result.toString();
    firstOperand = null;
    operator = null;
}
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.textContent;
        switch (action) {
            case 'clear':
                clearScreen();
                break;
            case 'delete':
                deleteLast();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                chooseOperator(value);
                break;
            case 'equals':
                calculate();
                break;
            default:
                appendNumber(value);
                break;
        }
    });
});
