document.addEventListener("DOMContentLoaded", function () {
    const billInput = document.getElementById("billTotal");
    const tipSlider = document.getElementById("tip");
    const currencySelect = document.getElementById("currency");
    const tipPercentageDisplay = document.getElementById("tip-percentage");
    const tipAmountDisplay = document.getElementById("tip-amount");
    const totalWithTipDisplay = document.getElementById("total-with-tip");
    const errorMessage = document.getElementById("error-message");

    function calculateTip() {
        let billValue = parseFloat(billInput.value);
        let tipPercentage = parseInt(tipSlider.value);
        let selectedCurrency = currencySelect.options[currencySelect.selectedIndex];
        let conversionRate = parseFloat(selectedCurrency.getAttribute("data-rate"));
        let currencySymbol = selectedCurrency.value === "USD" ? "$" : selectedCurrency.textContent.split(" ")[2];

        if (isNaN(billValue) || billValue < 0) {
            errorMessage.textContent = "Please enter a valid positive number.";
            tipAmountDisplay.value = "";
            totalWithTipDisplay.value = "";
            return;
        } else {
            errorMessage.textContent = "";
        }

        // Calculate tip in USD and then convert
        let tipAmountUSD = billValue * (tipPercentage / 100);
        let totalWithTipUSD = billValue + tipAmountUSD;

        // Convert to selected currency
        let tipAmountConverted = tipAmountUSD * conversionRate;
        let totalWithTipConverted = totalWithTipUSD * conversionRate;

        // Display the results in the selected currency
        tipAmountDisplay.value = `${currencySymbol}${tipAmountConverted.toFixed(2)}`;
        totalWithTipDisplay.value = `${currencySymbol}${totalWithTipConverted.toFixed(2)}`;
        tipPercentageDisplay.textContent = tipPercentage + "%";
    }

    // Event listeners
    billInput.addEventListener("input", calculateTip);
    tipSlider.addEventListener("input", calculateTip);
    currencySelect.addEventListener("change", calculateTip);
});
