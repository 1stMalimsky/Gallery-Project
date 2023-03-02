import isValidUrl from "../../src/validation/validateUrl.js";

const input = document.getElementById("input");

input.addEventListener("input", () => {
    checkUrl()
})

const checkUrl = () => {
    let url = input.value;
    let result = isValidUrl(url);
    console.log(result);
}