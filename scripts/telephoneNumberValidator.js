const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const results = document.getElementById("results-div");

const validateRegex = /^(1)?(?: )?(\d{3}|[(]\d{3}[)])(?:[ -])?(\d{3})(?:[ -])?(\d{4})$/;

const validatePhoneNumber = () => validateRegex.test(userInput.value);

const addResult = () => {
    const resultCell = document.createElement("div");
    if (!userInput.value) {
        window.alert("Please provide a phone number");
        return;
    }
    else if (validatePhoneNumber()) {
        resultCell.innerText = `Valid US number: ${userInput.value}`;
    }
    else {
        resultCell.innerText = `Invalid US number: ${userInput.value}`;
    }

    results.appendChild(resultCell);
};

const clearResults = () => results.innerHTML = "";

checkButton.addEventListener("click", addResult);
clearButton.addEventListener("click", clearResults);