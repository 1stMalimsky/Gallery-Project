import checkBusinessAccountStatus from "../utils/BusinessAccountStatusCheck.js";

let isConnected;
let isBusinessAccount;
const notConnectedNavbar = document.getElementById("navbar-notConnected");
const connectedNavbar = document.getElementById("navbar-connected");
const addNewPhoto = document.getElementById("addNewPhoto-link");


const initiateNavbar = () => {
    isConnected = checkIfConnected();
    isBusinessAccount = checkBusinessAccountStatus();
    if (!isConnected) {
        notConnectedNavbar.classList.remove("d-none");
        connectedNavbar.classList.add("d-none");
        addNewPhoto.classList.add("d-none");
    }

    else {
        notConnectedNavbar.classList.add("d-none");
        connectedNavbar.classList.remove("d-none");
        addNewPhoto.classList.remove("d-none");
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