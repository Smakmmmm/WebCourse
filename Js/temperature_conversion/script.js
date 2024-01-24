document.addEventListener("DOMContentLoaded", function () {
    const celsiusField = document.getElementById("celsius-field");
    const centeredButton = document.getElementById("centered-button");

    const convertButton = document.getElementById("convert-button");

    convertButton.addEventListener("click", function () {
        let celsius = celsiusField.value;

        celsiusField.classList.remove("invalid");

        if (celsius.length === 0) {
            celsiusField.classList.add("invalid");
            centeredButton.classList.remove("first-click");
            return;
        }

        document.getElementById("input-celsius").innerHTML = celsius;

        celsius = Number(celsius);
        document.getElementById("result-fahrenheit").innerHTML = (32 + celsius * 9 / 5).toString();
        document.getElementById("result-kelvin").innerHTML = (celsius + 273.15).toString();
        celsiusField.value = "";

        centeredButton.classList.add("first-click");
    });

    celsiusField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            convertButton.click();
        }
    });
});