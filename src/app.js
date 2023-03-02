import PAGES from "./models/PageModel.js";
import { pageChangeHandler } from "./routes/router.js";
import "./pages/Signup.js";
import "./pages/Login.js";
import "./pages/HomePage.js";
import "./pages/ProfilePage.js";
import "./initialData/initialDataPhotos.js";
import initiateNavbar from "./components/Navbar.js";
import { addNewPhotoPopup } from "./pages/HomePage.js";



const navLogoLink = document.getElementById("navBarLogoImg");

const navHomeLink = document.getElementById("home-page-link");

const navAboutLink = document.getElementById("about-page-link");

const navSignupLink = document.getElementById("signup-page-link");

const navLoginLink = document.getElementById("login-page-link");

const navProfileLink = document.getElementById("profile-page-link");

const navPage404 = document.getElementById("page-not-found-link");

const aboutSignupLink = document.getElementById("aboutSignupLink")

window.addEventListener("load", () => {
    initiateNavbar(addNewPhotoPopup);
    aboutSignupLink.addEventListener("click", () => pageChangeHandler(PAGES.SIGNUP));
})
navLogoLink.addEventListener("click", () => pageChangeHandler(PAGES.HOME));
navHomeLink.addEventListener("click", () => pageChangeHandler(PAGES.HOME));
navAboutLink.addEventListener("click", () => pageChangeHandler(PAGES.ABOUT));
navSignupLink.addEventListener("click", () => pageChangeHandler(PAGES.SIGNUP));
navLoginLink.addEventListener("click", () => pageChangeHandler(PAGES.LOGIN));
navProfileLink.addEventListener("click", () => pageChangeHandler(PAGES.PROFILE));
navPage404.addEventListener("click", () => pageChangeHandler(PAGES.PAGE404));


