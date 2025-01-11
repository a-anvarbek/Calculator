// Calculator project

const display = document.getElementById('enter-answer');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';

// Add event listeners for button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;

        if (button.classList.contains('clear')) {
            clearDisplay();
        } else if (button.classList.contains('equals')) {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(buttonValue)) {
            setOperator(buttonValue);
        } else {
            appendNumber(buttonValue);
        }
    });
});

// Add event listener for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key === 'Escape') {
        clearDisplay(); // Clear display when "Escape" is pressed
    } else if (key === 'Enter' || key === '=') {
        calculateResult(); // Calculate result when "Enter" or "=" is pressed
    } else if (['+', '-', '*', '/'].includes(key)) {
        setOperator(key); // Set operator for arithmetic keys
    } else if (key === '.') {
        appendNumber(key); // Append decimal point
    } else if (!isNaN(key)) {
        appendNumber(key); // Append numbers
    }
});

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay(currentInput);
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculateResult();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    if (previousInput === '' || currentInput === '' || operator === '') return;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }

    updateDisplay(result);
    previousInput = '';
    currentInput = result.toString();
    operator = '';
}

function updateDisplay(value) {
    display.textContent = value;
}
