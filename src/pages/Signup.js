import PAGES from "../models/PageModel.js"
import validateEmail from "../validation/emailValidation.js";
import validateName from "../validation/nameValidation.js";
import validatePassword from "../validation/passwordValidation.js";
import { User, Name, Contact, Address } from "../models/User.js";
import { pageChangeHandler } from "../routes/router.js";

//Name inputs
const firstNameInput = document.getElementById("signup-fisrtName");
const lastNameInput = document.getElementById("signup-lastName");

//Address inputs
const stateInput = document.getElementById("signup-state");
const countryInput = document.getElementById("signup-country");
const cityInput = document.getElementById("signup-city");
const streetInput = document.getElementById("signup-street");
const houseNumberInput = document.getElementById("signup-houseNumber");
const zipcodeInput = document.getElementById("signup-zipcode");

//Contact details input
const emailInput = document.getElementById("signup-emailAddress");
const phoneNumberInput = document.getElementById("signup-phoneNumber");

//Password inputs
const passwordInput = document.getElementById("signup-password");
const passwordConfirmInput = document.getElementById("signup-confirmPassword");

//Bussines user checkbox
const bussinessCheckbox = document.getElementById("signup-businessCheckbox");

// Signup button
const signupBtn = document.getElementById("signup-btn");

let userNameCheck = false;
let emailCheck = false;
let passwordCheck = false;

window.addEventListener("load", () => {

    if (firstNameInput.value !== "") {
        () => {
            checkNameInput();
        }
        if (lastNameInput.value !== "") {
            checkNameInput();
        }
    }

    if (emailInput.value !== "") {
        () => {
            checkEmailInput();
        }
    }

    if (passwordInput !== "") {
        () => {
            checkPassowrdInput();
        }
    }
});

firstNameInput.addEventListener("input", () => {
    checkNameInput();
});

lastNameInput.addEventListener("input", () => {
    checkNameInput();
});

emailInput.addEventListener("input", () => {
    checkEmailInput();
});

passwordInput.addEventListener("input", () => {
    checkPassowrdInput();
})
passwordConfirmInput.addEventListener("input", () => {
    checkPassowrdInput();
})

const checkNameInput = () => {
    let firstNameArr = validateName(firstNameInput.value);
    let lastNameArr = validateName(lastNameInput.value);
    if (firstNameArr.length === 0 && lastNameArr.length === 0) {
        firstNameInput.classList.remove("is-invalid");
        lastNameInput.classList.remove("is-invalid");
        document.getElementById("fullnameErrorAlerts").classList.add("d-none");
        userNameCheck = true;
    }
    if (firstNameArr.length > 0 && lastNameArr.length === 0) {
        firstNameInput.classList.add("is-invalid");
        lastNameInput.classList.remove("is-invalid");
        document.getElementById("fullnameErrorAlerts").classList.remove("d-none");
        document.getElementById("fullnameErrorAlerts").innerHTML = "Fisrt Name is" +
            firstNameArr.join("<br>");
        userNameCheck = false;
    }
    if (lastNameArr.length > 0 && firstNameArr.length === 0) {
        lastNameInput.classList.add("is-invalid");
        firstNameInput.classList.remove("is-invalid");
        document.getElementById("fullnameErrorAlerts").classList.remove("d-none");
        document.getElementById("fullnameErrorAlerts").innerHTML = "Last Name is" +
            lastNameArr.join("<br>");
        userNameCheck = false;
    }

    if (lastNameArr.length > 0 && firstNameArr.length > 0) {
        lastNameInput.classList.add("is-invalid");
        firstNameInput.classList.add("is-invalid");
        document.getElementById("fullnameErrorAlerts").classList.remove("d-none");
        document.getElementById("fullnameErrorAlerts").innerHTML =
            "Invalid <br> Names must start with and uppercase letter and be longer than 2 letters";
        userNameCheck = false;
    }
    signupButtonEnabler();
}

const checkEmailInput = () => {
    let emailErrArr = validateEmail(emailInput.value);
    if (emailErrArr.length === 0) {
        emailInput.classList.remove("is-invalid");
        document.getElementById("contact-errorAlerts").classList.add("d-none");
        document.getElementById("signupErrDiv").classList.add("d-none");
        emailCheck = true;
    } else {

        emailInput.classList.add("is-invalid");
        document.getElementById("contact-errorAlerts").classList.remove("d-none");
        document.getElementById("contact-errorAlerts").innerHTML = "email is invalid.<br> You must enter a valid email address. example: myemail@gmail.com";
        document.getElementById("signupErrDiv").classList.add("d-none");
        emailCheck = false;
    }
    signupButtonEnabler();
}

const checkPassowrdInput = () => {
    let passwordErrArr = validatePassword(passwordInput.value);

    if (passwordErrArr.length > 0) {
        passwordInput.classList.add("is-invalid");
        document.getElementById("password-errorAlerts").classList.remove("d-none");
        document.getElementById("password-errorAlerts").innerHTML = passwordErrArr.join("<br>") + "Password must contain: <br> - At least 6 characters <br> - Uppercase and lowercase letter <br> at least one sign";
        passwordCheck = false;
    }

    else if (passwordInput.value !== passwordConfirmInput.value) {
        passwordConfirmInput.classList.add("is-invalid")
        document.getElementById("password-errorAlerts").classList.remove("d-none");
        document.getElementById("password-errorAlerts").innerHTML = "Passwords don't match<br>";
        passwordCheck = false;
    }

    else if (passwordErrArr.length == 0 && passwordInput.value === passwordConfirmInput.value) {
        passwordInput.classList.remove("is-invalid");
        passwordConfirmInput.classList.remove("is-invalid");
        document.getElementById("password-errorAlerts").classList.add("d-none");
        document.getElementById("password-errorAlerts").classList.remove("is-invalid");
        passwordCheck = true;
    }
    checkEmailInput()
    signupButtonEnabler();
}

const signupButtonEnabler = () =>
    (signupBtn.disabled = !(userNameCheck && emailCheck && passwordCheck));


signupBtn.addEventListener("click", () => {
    if (!(userNameCheck && emailCheck && passwordCheck)) {
        return;
    }
    let users = localStorage.getItem("users");
    let nextUserId = localStorage.getItem("nextUserId");
    let businessCheckbox = document.getElementById("signup-businessCheckbox");
    let businessAccount = false;
    nextUserId = +nextUserId;
    let newUser = new User(
        nextUserId++,
        new Name(firstNameInput.value, lastNameInput.value),
        new Contact(emailInput.value, phoneNumberInput.value),
        new Address(stateInput.value, countryInput.value, cityInput.value, streetInput.value, houseNumberInput.value, zipcodeInput.value),
        passwordInput.value,
        businessAccount
    );

    localStorage.setItem("nextUserId", nextUserId + "");
    if (!users) {
        let users = [newUser];
        if (businessCheckbox.checked) {
            newUser.businessAccount = true;
        }
        localStorage.setItem("users", JSON.stringify(users));
    }
    else {
        users = JSON.parse(users);
        if (businessCheckbox.checked) {
            newUser.businessAccount = true;
        }
        for (let user of users) {
            if (user.contact.email == emailInput.value) {
                document.getElementById("signupErrDiv").classList.remove("d-none");
                document.getElementById("signupErrDiv").innerHTML = "Email already exists";
                return;
            }
        }
        users = [...users, newUser];
        localStorage.setItem("users", JSON.stringify(users));
        // pageChangeHandler(PAGES.LOGIN);
    }
});

