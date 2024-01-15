document.addEventListener("DOMContentLoaded", function () {
    const displayEl = document.getElementById("display");
    const opDisplayEl = document.getElementById("operation-display");
    let currentInput = "";

    function updateDisplay() {
        displayEl.textContent = currentInput;
    }

    const numButtons = document.querySelectorAll(".num");
    const operatorButtons = document.querySelectorAll(".operator");

    numButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const btnValue = btn.dataset.value;
            currentInput += btnValue;
            updateDisplay();
        });
    });

    operatorButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const btnOp = btn.dataset.value;
            let lastEl = currentInput[currentInput.length - 1];

            if (btnOp === "." && !lastEl) {
                currentInput += "0" + btnOp;
            } else if (btnOp === "." && lastEl === ".") {
                // Do nothing if there's already a decimal point
            } else if (lastEl === "+" || lastEl === "*" || lastEl === "/" || lastEl === "-") {
                // If the last character is an operator, don't add another operator.
            } else {
                opDisplayEl.textContent = displayEl.textContent;
                displayEl.textContent = "";
                currentInput += btnOp;
            }
            updateDisplay();
        });
    });

    const decimalBtn = document.getElementById("decimal-point");
    decimalBtn.addEventListener("click", function () {
        if (!currentInput.includes(".") || currentInput[currentInput.length - 1] != ".") {
            currentInput += ".";
            updateDisplay();
        }
    });

    const equalToBtn = document.getElementById("equal-to");
    equalToBtn.addEventListener("click", function () {
        try {
            const result = Number(eval(currentInput)).toFixed(2);
            opDisplayEl.textContent = currentInput;
            displayEl.textContent = result;
            currentInput = result.toString();
        } catch (error) {
            opDisplayEl.textContent = "Error";
            displayEl.textContent = "";
            currentInput = "";
        }
    });

    const plusMinusEl = document.getElementById("plus-minus");
    plusMinusEl.addEventListener("click", function () {
        // Toggle the sign using the unary minus operator directly on currentInput
        if (currentInput !== "") {
            currentInput = -parseFloat(currentInput);
            displayEl.textContent = currentInput;
        }
    });

    const percentageEl = document.getElementById("percentage");
    percentageEl.addEventListener("click", function () {
        // Convert the input to a percentage
        if (currentInput !== "") {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
        }
    });

    const clearEntryEl = document.getElementById("clear-entry");
    clearEntryEl.addEventListener("click", function () {
        // Clear the current entry
        displayEl.textContent = "";
        currentInput = "";
    });

    const clearEl = document.getElementById("clear");
    clearEl.addEventListener("click", function () {
        // Clear both the display and the operation display
        displayEl.textContent = "";
        opDisplayEl.textContent = "";
        currentInput = "";
    });

    const backspaceEl = document.getElementById("backspace");
    backspaceEl.addEventListener("click", function () {
        // Remove the last character from the current input
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    });

    const onebyxEl = document.getElementById("onebyx");
    onebyxEl.addEventListener("click", function () {
        // Divide the number by 1
        if (currentInput !== "") {
            currentInput = (1 / parseFloat(currentInput)).toString();
            updateDisplay();
        }
    });

    const squareEl = document.getElementById("square");
    squareEl.addEventListener("click", function () {
        // Get the square of the number
        if (currentInput !== "") {
            currentInput = (parseFloat(currentInput) ** 2).toString();
            updateDisplay();
        }
    });

    const sqrtEl = document.getElementById("sqrt");
    sqrtEl.addEventListener("click", function () {
        // Get the square root of the number
        if (currentInput !== "") {
            currentInput = Math.sqrt(parseFloat(currentInput)).toString();
            updateDisplay();
        }
    });

    // theme functionality
    // Declare luffy outside the event listener
    let luffy = true;

    const toggleTheme = document.getElementById("toggle-theme");
    toggleTheme.addEventListener("click", () => {
        let videoEl = document.getElementById("my-video");

        if (luffy === true) {
            videoEl.src = "./zoro.webm";
            luffy = !luffy;
        } else {
            videoEl.src = "./luffy.webm";
            luffy = !luffy; // Toggle the value after setting the new source
        }
        // videoEl.onload();
    });

    //dark mode function 
    let isDark = false;
    const toggleColorTheme = document.getElementById("toggle-color-mode");

    toggleColorTheme.addEventListener("click", () => {
        // Get all elements with the class "btn"
        let btns = document.querySelectorAll('.btn');

        // Toggle between "dark" and "light" classes
        btns.forEach(function (element) {
            if (isDark) {
                element.classList.remove("light");
                element.classList.add("dark");
                displayEl.classList.remove("light");
                displayEl.classList.add("dark");
                opDisplayEl.classList.remove("light");
                opDisplayEl.classList.add("dark");
                toggleColorTheme.innerText = "light mode";
            } else {
                element.classList.remove("dark");
                element.classList.add("light");
                displayEl.classList.remove("dark");
                displayEl.classList.add("light");
                opDisplayEl.classList.remove("dark");
                opDisplayEl.classList.add("light");
                toggleColorTheme.innerText = "dark mode";
            }
        });

        // Toggle the theme state
        isDark = !isDark;
    });



    updateDisplay();
});
