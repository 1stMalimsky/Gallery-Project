import validateName from "../validation/nameValidation.js";
import validateEmail from "../validation/emailValidation.js";
import validatePassword from "../validation/passwordValidation.js";

const profileFName = document.getElementById("profilePage-firstName");
const profileLName = document.getElementById("profilePage-lastName");
const profileFullNameErrAlerts = document.getElementById("profilePage-fullNameErrorAlerts");
const profileEmail = document.getElementById("profilePage-emailAddress");
const profilePassword = document.getElementById("profilePage-password");
const profileConfirmPassword = document.getElementById("profilePage-confirmPassword");
const editProfileBtn = document.getElementById("profilePage-btn");
const editProfileSuccessDiv = document.getElementById("profilePageSuccessDiv");
const businessCheckBox = document.getElementById("profilePage-businessCheckbox");

let profileUserNameCheck = false;
let profileUserEmailCheck = false;
let profileUserPasswordCheck = false;
let token = localStorage.getItem("token");
let users = localStorage.getItem("users");
let currentUserDetails;

window.addEventListener("load", () => {
    token = JSON.parse(token);
    users = JSON.parse(users);
    if (!users || !token) {
        return;
    }
    initProfileInfo()
    checkProfilePassowrdInput()
    profileFName.addEventListener("input", () => checkProfileNameInput());
    profileLName.addEventListener("input", () => checkProfileNameInput());

    profileEmail.addEventListener("input", () => checkProfileEmailInput());

    profilePassword.addEventListener("input", () => checkProfilePassowrdInput());
    profileConfirmPassword.addEventListener("input", () => checkProfilePassowrdInput());

    editProfileBtn.addEventListener("click", () => {
        editProfile()
    })
})

const initProfileInfo = () => {
    currentUserDetails = users.find(obj => obj.contact.email === token.email);
    profileFName.value = currentUserDetails.name.firstName;
    profileLName.value = currentUserDetails.name.lastName;

    document.getElementById("profilePage-state").value = currentUserDetails.address.state;
    document.getElementById("profilePage-country").value = currentUserDetails.address.country;
    document.getElementById("profilePage-city").value = currentUserDetails.address.city;
    document.getElementById("profilePage-street").value = currentUserDetails.address.street;
    document.getElementById("profilePage-houseNumber").value = currentUserDetails.address.houseNumber;
    document.getElementById("profilePage-zipcode").value = currentUserDetails.address.zipCode;

    profileEmail.value = currentUserDetails.contact.email;
    document.getElementById("profilePage-phoneNumber").value = currentUserDetails.contact.phone;

    if (currentUserDetails.businessAccount == true) {
        businessCheckBox.checked = true;
    }
    else {
        businessCheckBox.checked = false;
    }

}

const checkProfileEmailInput = () => {
    let emailErrArr = validateEmail(profileEmail.value);
    if (emailErrArr.length === 0) {
        profileEmail.classList.remove("is-invalid");
        document.getElementById("profile-contact-errorAlerts").classList.add("d-none");
        document.getElementById("profilePageErrDiv").classList.add("d-none");
        profileUserEmailCheck = true;
    } else {

        profileEmail.classList.add("is-invalid");
        document.getElementById("profile-contact-errorAlerts").classList.remove("d-none");
        document.getElementById("profile-contact-errorAlerts").innerHTML = "email is invalid.<br> You must enter a valid email address. example: myemail@gmail.com";
        document.getElementById("profilePageErrDiv").classList.add("d-none");
        profileUserEmailCheck = false;
    }
    editProfileButtonEnabler();
}

const checkProfileNameInput = () => {
    let firstNameArr = validateName(profileFName.value);
    let lastNameArr = validateName(profileLName.value);
    if (firstNameArr.length === 0 && lastNameArr.length === 0) {
        profileFName.classList.remove("is-invalid");
        profileLName.classList.remove("is-invalid");
        profileFullNameErrAlerts.classList.add("d-none");
        profileUserNameCheck = true;
    }
    if (firstNameArr.length > 0 && lastNameArr.length === 0) {
        profileFName.classList.add("is-invalid");
        profileLName.classList.remove("is-invalid");
        profileFullNameErrAlerts.classList.remove("d-none");
        profileFullNameErrAlerts.innerHTML = "Fisrt Name is" +
            firstNameArr.join("<br>");
        profileUserNameCheck = false;
    }
    if (lastNameArr.length > 0 && firstNameArr.length === 0) {
        profileLName.classList.add("is-invalid");
        profileFName.classList.remove("is-invalid");
        profileFullNameErrAlerts.classList.remove("d-none");
        profileFullNameErrAlerts.innerHTML = "Last Name is" +
            lastNameArr.join("<br>");
        profileUserNameCheck = false;
    }

    if (lastNameArr.length > 0 && firstNameArr.length > 0) {
        profileLName.classList.add("is-invalid");
        profileFName.classList.add("is-invalid");
        profileFullNameErrAlerts.classList.remove("d-none");
        profileFullNameErrAlerts.innerHTML =
            "Invalid <br> Names must start with and uppercase letter and be longer than 2 letters";
        profileUserNameCheck = false;
    }
    editProfileButtonEnabler();
}

const checkProfilePassowrdInput = () => {
    let passwordErrArr = validatePassword(profilePassword.value);

    if (passwordErrArr.length > 0) {
        profilePassword.classList.add("is-invalid");
        document.getElementById("profilePage-password-errorAlerts").classList.remove("d-none");
        document.getElementById("profilePage-password-errorAlerts").innerHTML = passwordErrArr.join("<br>") + "Password must contain: <br> - At least 6 characters <br> - Uppercase and lowercase letter <br> at least one sign";
        profileUserPasswordCheck = false;
    }

    if (profilePassword.value !== profileConfirmPassword.value) {
        profileConfirmPassword.classList.add("is-invalid")
        document.getElementById("profilePage-password-errorAlerts").classList.remove("d-none");
        document.getElementById("profilePage-password-errorAlerts").innerHTML = "Passwords don't match<br>";
        profileUserPasswordCheck = false;
    }

    if (passwordErrArr.length == 0 && profilePassword.value === profileConfirmPassword.value) {
        profilePassword.classList.remove("is-invalid");
        profileConfirmPassword.classList.remove("is-invalid");
        document.getElementById("profilePage-password-errorAlerts").classList.add("d-none");
        document.getElementById("profilePage-password-errorAlerts").classList.remove("is-invalid");
        profileUserPasswordCheck = true;
    }

    checkProfileNameInput();
    checkProfileEmailInput();
    editProfileButtonEnabler();
}

const editProfileButtonEnabler = () =>
    (editProfileBtn.disabled = !(profileUserNameCheck && profileUserEmailCheck && profileUserPasswordCheck));


const editProfile = () => {

    let userToEdit = users.find(item => currentUserDetails.id == item.id);

    userToEdit.name.firstName = document.getElementById("profilePage-firstName").value;
    token.name.firstName = document.getElementById("profilePage-firstName").value;
    userToEdit.name.lastName = document.getElementById("profilePage-lastName").value;
    token.name.lastName = document.getElementById("profilePage-lastName").value;

    userToEdit.address.state = document.getElementById("profilePage-state").value;
    userToEdit.address.country = document.getElementById("profilePage-country").value;
    userToEdit.address.city = document.getElementById("profilePage-city").value;
    userToEdit.address.street = document.getElementById("profilePage-street").value;
    userToEdit.address.houseNumber = document.getElementById("profilePage-houseNumber").value;
    userToEdit.address.zipCode = document.getElementById("profilePage-zipcode").value;

    userToEdit.contact.email = document.getElementById("profilePage-emailAddress").value;
    token.email = document.getElementById("profilePage-emailAddress").value;
    userToEdit.contact.phone = document.getElementById("profilePage-phoneNumber").value;
    userToEdit.password = document.getElementById("profilePage-password").value;

    if (businessCheckBox.checked) {
        userToEdit.businessAccount = true;
        token.businessAccount = true;
    }
    else {
        userToEdit.businessAccount = false;
        token.businessAccount = false;
    }

    users = users.map(user => {
        if (user.id === userToEdit.id) {
            user === userToEdit;
        }
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("token", JSON.stringify(token));

        editProfileSuccessDiv.classList.remove("d-none");
        editProfileSuccessDiv.innerHTML = "Edit Successful!";
        setTimeout(() => {
            editProfileSuccessDiv.classList.add("d-none");
            location.reload();
        }, 2500);
    });
}
