const container = document.querySelector(".container");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

const buttons = [
    'AC', '+/-', '%', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '←', '0', '.', '='
];

function createButtons() {

    const buttonBox = document.createElement('div');
    buttonBox.classList.add('button-box');

    buttonBox.style.display = 'flex';
    buttonBox.style.flexWrap = 'wrap';

    buttons.forEach(buttonText => {
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.classList.add('button');
        buttonBox.appendChild(button);
    });

    const topRowButtons = ['AC', '+/-', '%',];
    buttonBox.childNodes.forEach(button => {
        if (topRowButtons.includes(button.textContent)) {
            button.classList.add('top-row-button');
        }
    });

    const rightRowButtons = ['÷', '×', '-', '+', '='];
    buttonBox.childNodes.forEach(button => {
        if (rightRowButtons.includes(button.textContent)) {
            button.classList.add('right-row-button');
        }
    });

    return buttonBox;
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            throw new Error("Unknown operator");
    }
}

function addButtonListeners(buttonBox) {

    let currentValue = '';
    let operator = '';
    let newState = false;

    buttonBox.childNodes.forEach(button => {
        button.addEventListener('click', () => {
            const display = document.querySelector('.display');
            let buttonText = button.textContent;

            buttonText = buttonText.replace('×', '*').replace('÷', '/')

            if (buttonText === 'AC') {
                display.textContent = '';
                currentValue = '';
            } else if (buttonText === '←') {
                display.textContent = display.textContent.slice(0, -1);
            } else if (buttonText === '.') {
                if (!display.textContent.includes('.')) {
                    display.textContent += '.';
                }
            } else if (buttonText === '+/-') {
                if (display.textContent.startsWith('-')) {
                    display.textContent = display.textContent.slice(1);
                } else {
                    display.textContent = '-' + display.textContent;
                }
            } else if (buttonText === '%') {
                display.textContent = (parseFloat(display.textContent) / 100).toString();
            } else if (['/', '*', '+', '-'].includes(buttonText)) {
                currentValue = parseFloat(display.textContent);
                operator = buttonText;
                display.textContent = '';
            } else if (buttonText === '=') {
                const secondValue = parseFloat(display.textContent);
                if (operator) {
                    display.textContent = operate(currentValue, secondValue, operator);
                    currentValue = parseFloat(display.textContent);
                    newState = true;
                    operator = '';
                }
            } else {
                if (newState) {
                    display.textContent = '';
                    newState = false;
                }
                display.textContent += buttonText;
            }
        });
    });
}

function addKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
        const display = document.querySelector('.display');
        let key = e.key;        

        const keyMap = {
            'Enter': '=',
            'Escape': 'AC',
            'Backspace': '←',
            '/': '÷',
            '*': '×'
        };

        key = keyMap[key] || key;

        if (!buttons.includes(key)) {
            return;
        }

        const button = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent === key);

        if (button) {
            button.click();
        }
    });
}


function makeCalculator() {

    const calculator = document.createElement('div');
    calculator.classList.add('calculator');

    const display = document.createElement('div');
    display.classList.add('display');
    calculator.appendChild(display);

    buttonBox = createButtons();
    addButtonListeners(buttonBox);

    addKeyboardListeners();

    calculator.appendChild(buttonBox);
    container.appendChild(calculator);
}

makeCalculator();