import checkBusinessAccountStatus from "../utils/BusinessAccountStatusCheck.js";

let isConnected;
let isBusinessAccount;
let addNewPhotoPopup;

const addNewPhotoLink = document.getElementById("addNewPhoto-link")
const notConnectedNavbar = document.getElementById("navbar-notConnected");
const connectedNavbar = document.getElementById("navbar-connected");

window.addEventListener("load", () => {

    document.getElementById("logout-link").addEventListener("click", () => {
        localStorage.removeItem("token");
        location.reload();
    })
})

const initiateNavbar = (addNewPhotoFromHomePage) => {
    isConnected = checkIfConnected();
    isBusinessAccount = checkBusinessAccountStatus();
    addNewPhotoPopup = addNewPhotoFromHomePage;
    if (!isConnected) {
        notConnectedNavbar.classList.remove("d-none");
        connectedNavbar.classList.add("d-none");
        addNewPhotoLink.classList.add("d-none");
    }
    else {
        notConnectedNavbar.classList.add("d-none");
        connectedNavbar.classList.remove("d-none");
        addNewPhotoLink.classList.remove("d-none");
        addNewPhotoLink.addEventListener("click", () => addNewPhotoPopup())
    }
}

const checkIfConnected = () => {
    let token = localStorage.getItem("token");
    if (!token) {
        return false;
    }
    else {
        token = JSON.parse(token);
        return !!token;
    }
}

export default initiateNavbar;