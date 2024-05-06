const rootStyle = document.querySelector(":root").style;
const displayModeButton = document.getElementById("display-mode-button");

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
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);

    // Switch to dark mode
    if (darkMode) {
        rootStyle.setProperty("--background-color", backgroundColorLight);
        rootStyle.setProperty("--secondary-color", secondaryColorLight);
        rootStyle.setProperty("--text-color", textColorLight);
    }
    // Switch to light mode
    else {
        rootStyle.setProperty("--background-color", backgroundColorDark);
        rootStyle.setProperty("--secondary-color", secondaryColorDark);
        rootStyle.setProperty("--text-color", textColorDark);
    }
};

displayModeButton.addEventListener("click", switchDisplayMode);