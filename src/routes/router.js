import PAGES from "../models/PageModel.js";

const HOME = document.getElementById(PAGES.HOME);
const ABOUT = document.getElementById(PAGES.ABOUT);
const SIGNUP = document.getElementById(PAGES.SIGNUP);
const LOGIN = document.getElementById(PAGES.LOGIN);
const PROFILE = document.getElementById(PAGES.PROFILE);
const PAGE404 = document.getElementById(PAGES.PAGE404);

const pageChangeHandler = (pageToDisplay) => {

    HOME.classList.remove("d-block");
    ABOUT.classList.remove("d-block");
    SIGNUP.classList.remove("d-block");
    LOGIN.classList.remove("d-block");
    PROFILE.classList.remove("d-block");
    PAGE404.classList.remove("d-block");
    HOME.classList.add("d-none");
    ABOUT.classList.add("d-none");
    SIGNUP.classList.add("d-none");
    LOGIN.classList.add("d-none");
    PROFILE.classList.add("d-none");
    PAGE404.classList.add("d-none");


    switch (pageToDisplay) {

        case (PAGES.HOME):
            HOME.classList.remove("d-none");
            break;

        case (PAGES.ABOUT):
            ABOUT.classList.remove("d-none");
            break;

        case (PAGES.SIGNUP):
            SIGNUP.classList.remove("d-none");
            break;

        case (PAGES.LOGIN):
            LOGIN.classList.remove("d-none");
            break;

        case (PAGES.PROFILE):
            PROFILE.classList.remove("d-none");
            break;

        default:
            PAGE404.classList.remove("d-none");
            break;
    }
}

export { pageChangeHandler }; 
