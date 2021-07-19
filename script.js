let btns = Array.from(document.querySelectorAll(".operator"));
let display = document.querySelector(".display");
let typed = document.querySelector(".pressed");
let outline = document.querySelector(".outline");
let neg = document.getElementById("negative");
let clear = document.getElementById("clear");

let nums = []; //buttons
let operators = []; //buttons
let numbers = []; // expression
let toBeOperated = [];
let currentDisplay = true;
let isNegative = false;
let negativeNums = [];
let displayHeight = 160;
let outlineHeight = 650;

clear.addEventListener('click', () => {
    clearAll();
});

function clearAll() {
    toBeOperated.splice(0, toBeOperated.length);
    typed.textContent = "";
    display.style.height = "160px";
    outline.style.height = "650px";
}
neg.addEventListener('click', () => {
    let temp = 0 - +typed.textContent;
    typed.textContent = temp;
    numbers.push(typed.textContent);

});

for (let i = 0; i < btns.length; i++) {
    if (btns[i].innerText === "+" || btns[i].innerText === "-" || btns[i].innerText === "*" || btns[i].innerText === "/" || btns[i].innerText === "=") {
        operators.push(btns[i]);
    }
    else (nums.push(btns[i]));
}

for (let i = 0; i < nums.length; i++) {
    nums[i].addEventListener('click', () => {
        if (typed.textContent === "Error") {
            typed.textContent = "";
            clearAll();
        }
        if (currentDisplay) {
            increaseSize(typed.textContent);
            typed.textContent = typed.textContent + nums[i].innerText;
            numbers.push(typed.textContent);
        }
        else {
            typed.textContent = "";
            increaseSize(typed.textContent);
            typed.textContent = typed.textContent + nums[i].innerText;
            numbers.push(typed.textContent);
            currentDisplay = true;
        }
    });
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', () => {
        typed.textContent = "";
        toBeOperated.push(numbers[numbers.length - 1]);
        toBeOperated.push(operators[i].innerText);
        intermediary(operators[i].innerText);
    });
}

function intermediary(sign) {
    numbers.splice(0, numbers.length);
    console.log(toBeOperated);
    if (toBeOperated.includes(undefined)) {
        typed.textContent = "Error";
    }
    if (toBeOperated.length === 4) {
        let result = operate(toBeOperated[1]);
        if (toBeOperated[1] == "/" && toBeOperated[2] == "0") {
            result = "Error";
        }
        else if (toBeOperated.includes(undefined)) {
            result = "Error";
        }
        if (toBeOperated.includes("=")) {
            currentDisplay = false;
            increaseSize(result.toString())
            typed.textContent = result.toString();
            toBeOperated.splice(0, toBeOperated.length);
        }
        else {
            increaseSize(result.toString());
            typed.textContent = result.toString();
            toBeOperated.splice(0, toBeOperated.length);
            toBeOperated.push(result.toString());
            toBeOperated.push(sign);
            currentDisplay = false;
        }
    }
}

function increaseSize(content) {
    if (content.length % 13 === 0 && content.length !== 0) {
        displayHeight = displayHeight + 60;
        outlineHeight = outlineHeight + 60;
        display.style.height = displayHeight + "px";
        outline.style.height = outlineHeight + "px";
    }
    else if (content.length < 13) {
        display.style.height = "160px";
        outline.style.height = "650px";
    }
}

function operate(sign) {
    if (sign === "+") {
        return add();
    }
    else if (sign === "-") {
        return subtract();
    }
    else if (sign === "*") {
        return multiply();
    }
    else if (sign === "/") {
        return divide();
    }
}

function add() {
    return +toBeOperated[0] + +toBeOperated[2];
}

function subtract() {
    return +toBeOperated[0] - +toBeOperated[2];
}

function multiply() {
    return +toBeOperated[0] * +toBeOperated[2];
}

function divide() {
    return +toBeOperated[0] / +toBeOperated[2];
}