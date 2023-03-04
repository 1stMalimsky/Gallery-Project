import Photo from "../models/Photo.js";
import getNextPhotoId from "../utils/getNextPhotoId.js";
import isValidUrl from "../validation/validateUrl.js";

const editSubmitBtn = document.getElementById("editSubmitBtn");
const editPopupWindow = document.getElementById("editPopupWindow");
const editUrlInput = document.getElementById("editUrlInput");
const editTitleInput = document.getElementById("editTitleInput");
const editAlternativeInput = document.getElementById("editAlternativeInput");
const editCreditInput = document.getElementById("editCreditInput");
const editPriceInput = document.getElementById("editPriceInput");
const imgUrlDisplay = document.getElementById("editImgUrlDisplay");
const addNewPhotobtn = document.getElementById("addPhotoSubmitBtn");
const imgPreviewErrAlert = document.getElementById("imgPreviewErrAlert");

let selectedPhoto;
let editPhotoSubmit;
let addNewPhoto;

const initPopup = (selectedPhotoFromHomePage, editPhotoFromHomePage) => {

    if (selectedPhotoFromHomePage) {
        selectedPhoto = selectedPhotoFromHomePage;
        editPhotoSubmit = editPhotoFromHomePage;
        document.getElementById("editSubmitBtn").classList.remove("d-none");
        document.getElementById("addPhotoSubmitBtn").classList.add("d-none");

        document.getElementById("editPhotoTitle").classList.remove("d-none");
        document.getElementById("addNewPhotoTitle").classList.add("d-none");

    }
    else {
        selectedPhoto = new Photo(getNextPhotoId(), "", "", "", "", "", "");
        addNewPhoto = editPhotoFromHomePage;
        document.getElementById("editSubmitBtn").classList.add("d-none");
        document.getElementById("addPhotoSubmitBtn").classList.remove("d-none");

        document.getElementById("editPhotoTitle").classList.add("d-none");
        document.getElementById("addNewPhotoTitle").classList.remove("d-none");
    }
    editPhotoSubmit = editPhotoFromHomePage;
    editUrlInput.value = selectedPhoto.imgUrl;
    editTitleInput.value = selectedPhoto.title;
    editAlternativeInput.value = selectedPhoto.subtitle;
    editCreditInput.value = selectedPhoto.credit;
    editPriceInput.value = selectedPhoto.price;
    imgUrlDisplay.src = selectedPhoto.imgUrl;
    showPhotoPopup();
};

window.addEventListener("load", () => {

    editPopupWindow.addEventListener("click", (ev) => {
        if (
            ev.target.id == "editPopupWindow" ||
            ev.target.id == "editCancelBtn"
        ) {
            hidePhotoPopup();
            addNewPhotobtn.disabled = true;
            editSubmitBtn.disabled = true;
        }
    })


});

addNewPhotobtn.addEventListener("click", () => {

    selectedPhoto.id = getNextPhotoId();
    selectedPhoto.title = editTitleInput;
    selectedPhoto.imgUrl = editUrlInput.value;
    selectedPhoto.subtitle = editAlternativeInput.value;
    selectedPhoto.credit = editCreditInput.value;
    selectedPhoto.price = editPriceInput.value;
    selectedPhoto.createdAt = Date();
    addNewPhoto(selectedPhoto);
    hidePhotoPopup();
})

editSubmitBtn.addEventListener("click", () => {

    selectedPhoto.imgUrl = editUrlInput.value;
    selectedPhoto.title = editTitleInput.value;
    selectedPhoto.subtitle = editAlternativeInput.value;
    selectedPhoto.credit = editCreditInput.value;
    selectedPhoto.price = editPriceInput.value;
    editPhotoSubmit(selectedPhoto)
    hidePhotoPopup();
    editSubmitBtn.disabled = true;
});

editUrlInput.addEventListener("input", () => {
    let url = editUrlInput.value;
    if (isValidUrl(url) || url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png")) {
        console.log("img works");
        imgUrlDisplay.src = url;
        imgPreviewErrAlert.classList.add("d-none")
        editSubmitBtn.disabled = false;
    }
    else {
        console.log("img doesn't work");
        imgUrlDisplay.alt = "";
        imgUrlDisplay.src = url;
        imgPreviewErrAlert.classList.remove("d-none")
        imgPreviewErrAlert.innerHTML = "Image URL is invalid. Please try another URL"
        editSubmitBtn.disabled = true;
    }
});

const showPhotoPopup = () => {
    editPopupWindow.classList.remove("d-none");
};

const hidePhotoPopup = () => {
    editPopupWindow.classList.add("d-none");
};

export default initPopup;