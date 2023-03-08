import PAGES from "../models/PageModel.js";
import { pageChangeHandler } from "../routes/router.js";
import validateEmail from "../validation/emailValidation.js";
import validatePassword from "../validation/passwordValidation.js";

const loginEmailInput = document.getElementById("login-emailAddress");
const loginPasswordInput = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const signupLink = document.getElementById("login-signupLink");
const emailErrDiv = document.getElementById("loginEmailErrDiv");
const passwordErrDiv = document.getElementById("loginPasswordErrDiv");

let loginEmailCheck = false;
let loginPasswordCheck = false;

signupLink.addEventListener("click", () => {
    pageChangeHandler(PAGES.SIGNUP);
});

const loginEmailChecker = () => {
    let emailErrArr = validateEmail(loginEmailInput.value);
    if (emailErrArr.length > 0) {
        loginEmailInput.classList.add("is-invalid");
        emailErrDiv.classList.remove("d-none");
        emailErrDiv.innerHTML = "email is invalid.<br> You must enter a valid email address. example:<br> myemail@gmail.com";
        loginEmailCheck = false;

    }
    else {
        loginEmailInput.classList.remove("is-invalid");
        emailErrDiv.classList.add("d-none");
        loginEmailCheck = true;
    }
}

const loginPasswordChecker = () => {
    let passwordErrArr = validatePassword(loginPasswordInput.value);
    if (passwordErrArr.length > 0) {
        loginPasswordInput.classList.add("is-invalid");
        passwordErrDiv.classList.remove("d-none");
        passwordErrDiv.innerHTML = passwordErrArr.join("<br>") + "Password must contain: <br> - At least 6 characters <br> - Uppercase and lowercase letter <br> at least one sign";
        loginPasswordCheck = false;
    }

    else {
        loginPasswordInput.classList.remove("is-invalid");
        passwordErrDiv.classList.add("d-none");
        passwordErrDiv.classList.remove("is-invalid");
        loginPasswordCheck = true;
    }
}

loginEmailInput.addEventListener("input", () => {
    emailErrDiv.classList.add("d-none");
    loginEmailChecker();
    loginBtnEnabler();
}
);

loginPasswordInput.addEventListener("input", () => {
    emailErrDiv.classList.add("d-none");
    loginPasswordChecker();
    loginEmailChecker();
    loginBtnEnabler();
}
);

const loginBtnEnabler = () => (loginBtn.disabled = !(loginPasswordCheck && loginEmailCheck));


loginBtn.addEventListener("click", () => {
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
        emailErrDiv.classList.remove("d-none");
        emailErrDiv.innerHTML = "Your email doesn't exist. Please signup or login with a valid email";
        setTimeout(() => {
            emailErrDiv.classList.add("d-none");
        }, 2500);
        return;
    }
    let currentUser = users.find((item) => item.contact.email === loginEmailInput.value && item.password === loginPasswordInput.value);
    if (!currentUser) {
        emailErrDiv.classList.remove("d-none");
        emailErrDiv.innerHTML = "Incorrect email or password. Please try again";
        setTimeout(() => {
            emailErrDiv.classList.add("d-none");
        }, 2500);
        return;
    }
    localStorage.setItem("token", JSON.stringify({ id: currentUser.id, name: currentUser.name, email: currentUser.contact.email, businessAccount: currentUser.businessAccount }));
    document.getElementById("loginSuccessDiv").classList.remove("d-none");
    document.getElementById("loginSuccessDiv").innerHTML = `Log in successful! Welcome back ${currentUser.name.firstName} ${currentUser.name.lastName}`;
    setTimeout(() => {
        document.getElementById("loginSuccessDiv").classList.add("d-none");
    }, 2500);
    setTimeout(() => {
        location.reload();
    }, 2500);

});
