const rootStyle = document.querySelector(":root").style;
const displayModeButton = document.getElementById("display-mode-button");
const inputField = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const backgroundColorDark = "rgb(20, 20, 20)";
const backgroundColorLight = "rgb(220, 220, 220)";
const secondaryColorDark = "rgb(40, 40, 40)";
const secondaryColorLight = "rgb(180, 180, 180)";
const textColorDark = "white";
const textColorLight = "black";

if (localStorage.getItem("darkMode") === undefined) {
    localStorage.setItem("darkMode", true);
}

let darkMode = localStorage.getItem("darkMode");

const switchDisplayMode = () => {
    displayModeButton.classList.toggle("fa-sun");
    displayModeButton.classList.toggle("fa-moon");

    // Switch to dark mode
    if (darkMode) {
        darkMode = false;

        rootStyle.setProperty("--background-color", backgroundColorLight);
        rootStyle.setProperty("--secondary-color", secondaryColorLight);
        rootStyle.setProperty("--text-color", textColorLight);
    }
    // Switch to light mode
    else {
        darkMode = true;

        rootStyle.setProperty("--background-color", backgroundColorDark);
        rootStyle.setProperty("--secondary-color", secondaryColorDark);
        rootStyle.setProperty("--text-color", textColorDark);
    }

    localStorage.setItem("darkMode", darkMode);
};

let input;
let result = "";

const validateInput = () => {
    if (parseInt(inputField.value)) {
        input = parseInt(inputField.value);

        if (input <= 0) {
            output.innerText = "Please enter a number greater than or equal to 1";
            return false;
        }
        else if (input >= 4000) {
            output.innerText = "Please enter a number less than or equal to 3999";
            return false;
        }

        return true;
    }
    else {
        output.innerText = "Please enter a valid number";

        return false;
    }
}

const romanTeens = (number, one, five, ten) => {
    switch (number) {
        case 10:
            return ten;
        case 9:
            return one + ten;
        case 8:
            return five + one + one + one;
        case 7:
            return five + one + one;
        case 6:
            return five + one;
        case 5:
            return five;
        case 4:
            return one + five;
        case 3:
            return one + one + one;
        case 2:
            return one + one;
        case 1:
            return one;
    }
}

const convertToRoman = () => {
    if (!validateInput()) return;

    if (input > 1000) {
        result += romanTeens(Math.floor(input / 1000), "M", "", "");
        input -= Math.floor(input / 1000) * 1000;
    }

    if (input > 100) {
        result += romanTeens(Math.floor(input / 100), "C", "D", "M");
        input -= Math.floor(input / 100) * 100;
    }

    if (input > 10) {
        result += romanTeens(Math.floor(input / 10), "X", "L", "C");
        input -= Math.floor(input / 10) * 10;
    }

    if (input > 1) {
        result += romanTeens(input, "I", "V", "X");
        input -= input;
    }

    console.log(input);

    output.innerText = result;
    result = "";
};

displayModeButton.addEventListener("click", switchDisplayMode);
convertBtn.addEventListener("click", convertToRoman);