const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const value = this.value;

        switch (value) {
            case 'C':
                currentInput = '';
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
                updateDisplay('0');
                break;
            case '=':
                if (operator && firstOperand !== null && currentInput) {
                    currentInput = calculate(firstOperand, currentInput, operator);
                    operator = null;
                    firstOperand = null;
                    waitingForSecondOperand = false;
                    updateDisplay(currentInput);
                }
                break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case '^':
                handleOperator(value);
                break;
            case '√':
                if (currentInput) {
                    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                    updateDisplay(currentInput);
                }
                break;
            default:
                handleNumber(value);
                break;
        }
    });
});

function handleNumber(number) {
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '' ? number : currentInput + number;
    }
    updateDisplay(currentInput);
}

function handleOperator(op) {
    if (firstOperand === null) {
        firstOperand = currentInput;
    } else if (operator) {
        currentInput = calculate(firstOperand, currentInput, operator);
        firstOperand = currentInput;
        updateDisplay(currentInput);
    }
    operator = op;
    waitingForSecondOperand = true;
}

function calculate(first, second, operator) {
    const a = parseFloat(first);
    const b = parseFloat(second);

    switch (operator) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return (a / b).toString();
        case '%':
            return (a % b).toString();
        case '^':
            return Math.pow(a, b).toString();
        default:
            return second;
    }
}

function updateDisplay(value) {
    display.value = value;
}
