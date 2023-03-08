import Photo from "../models/Photo.js";
import getNextPhotoId from "../utils/getNextPhotoId.js";
import isValidUrl from "../validation/validateUrl.js";
import validate from "../validation/validate.js";

const editSubmitBtn = document.getElementById("editSubmitBtn");
const editCancelBtn = document.getElementById("editCancelBtn");
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
let titleInputOk = false;
let creditInputOk = false;
let altInputOk = false;
let priceInputOk = false;
let urlInputOk = false;

const initPopup = (selectedPhotoFromHomePage, editPhotoFromHomePage) => {

    if (selectedPhotoFromHomePage) {
        selectedPhoto = selectedPhotoFromHomePage;
        editPhotoSubmit = editPhotoFromHomePage;
        editSubmitBtn.classList.remove("d-none");
        addNewPhotobtn.classList.add("d-none");

        document.getElementById("editPhotoTitle").classList.remove("d-none");
        document.getElementById("addNewPhotoTitle").classList.add("d-none");

    }
    else {
        selectedPhoto = new Photo(getNextPhotoId(), "", "", "", "", "", "");
        addNewPhoto = editPhotoFromHomePage;
        editSubmitBtn.classList.add("d-none");
        addNewPhotobtn.classList.remove("d-none");

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
    checkTitleInput();
    checkUrlInput();
    checkAltInput();
    checkCreditInput();
    checkPriceInput();
    showPhotoPopup();
};

window.addEventListener("load", () => {

    editPopupWindow.addEventListener("click", (ev) => {
        if (
            ev.target.id == "editPopupWindow" ||
            ev.target.id == "editCancelBtn"
        ) {
            hidePhotoPopup();
        }
    });

    checkTitleInput();
    checkUrlInput();
    checkAltInput();
    checkCreditInput();
    checkPriceInput();
});
editTitleInput.addEventListener("input", () => {
    checkTitleInput();
});
editAlternativeInput.addEventListener("input", () => {
    checkAltInput();
});
editCreditInput.addEventListener("input", () => {
    checkCreditInput();
});

editPriceInput.addEventListener("input", () => {
    checkPriceInput();
});
editUrlInput.addEventListener("input", () => {
    checkUrlInput();
});



const validateTextInput = (value) => {
    const reg = new RegExp("^[A-Za-z0-9-\\s]{0,}$", "g");
    return validate(reg, value, 2, 50).map((err) => `${err}`);
};

const validateNumberInput = (value) => {
    const numRegex = new RegExp("^[1-9][0-9]*$");
    return validate(numRegex, value, 1, 50).map((err) => `${err}`);
}

const checkPriceInput = () => {
    let priceInputErrArr = validateNumberInput(editPriceInput.value);

    if (priceInputErrArr.length > 0) {
        editPriceInput.classList.add("is-invalid");
        priceInputOk = false;
    }
    else {
        editPriceInput.classList.remove("is-invalid");
        priceInputOk = true;
    }
    editPhotoButtonEnabler();
    addPhotoButtonEnabler();

}

const checkTitleInput = () => {
    let titleInputErrArr = validateTextInput(editTitleInput.value);

    if (titleInputErrArr.length > 0) {
        editTitleInput.classList.add("is-invalid");
        titleInputOk = false;
    }
    else {
        editTitleInput.classList.remove("is-invalid");
        titleInputOk = true;
    }
    editPhotoButtonEnabler();
    addPhotoButtonEnabler();
}

const checkAltInput = () => {
    let altInputErrArr = validateTextInput(editAlternativeInput.value);

    if (altInputErrArr.length > 0) {
        editAlternativeInput.classList.add("is-invalid");
        altInputOk = false;
    }
    else {
        editAlternativeInput.classList.remove("is-invalid");
        altInputOk = true;
    }
    editPhotoButtonEnabler();
    addPhotoButtonEnabler();
}

const checkCreditInput = () => {
    let creditInputErrArr = validateTextInput(editCreditInput.value);

    if (creditInputErrArr.length > 0) {
        editCreditInput.classList.add("is-invalid");
        creditInputOk = false;
    }
    else {
        editCreditInput.classList.remove("is-invalid");
        creditInputOk = true;
    }
    editPhotoButtonEnabler();
    addPhotoButtonEnabler();
}

const checkUrlInput = () => {
    let url = editUrlInput.value;
    if (isValidUrl(url) || url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png")) {
        imgUrlDisplay.src = url;
        imgPreviewErrAlert.classList.add("d-none")
        urlInputOk = true;
    }
    else {
        imgUrlDisplay.alt = "";
        imgUrlDisplay.src = url;
        imgPreviewErrAlert.classList.remove("d-none")
        imgPreviewErrAlert.innerHTML = "Image URL is invalid. Please try another URL"
        urlInputOk = false;
    }
    editPhotoButtonEnabler();
    addPhotoButtonEnabler();
}

const editPhotoButtonEnabler = () => {
    (editSubmitBtn.disabled = !(urlInputOk && creditInputOk && altInputOk && titleInputOk && priceInputOk));
};

const addPhotoButtonEnabler = () =>
    (addNewPhotobtn.disabled = !(urlInputOk && creditInputOk && altInputOk && titleInputOk && priceInputOk));

addNewPhotobtn.addEventListener("click", () => {
    let date = new Date();

    selectedPhoto.id = getNextPhotoId();
    selectedPhoto.title = editTitleInput.value;
    selectedPhoto.imgUrl = editUrlInput.value;
    selectedPhoto.subtitle = editAlternativeInput.value;
    selectedPhoto.credit = editCreditInput.value;
    selectedPhoto.price = editPriceInput.value;
    selectedPhoto.createdAt = date.toDateString();
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
});


const showPhotoPopup = () => {
    editPopupWindow.classList.remove("d-none");
};

const hidePhotoPopup = () => {
    editPopupWindow.classList.add("d-none");
};

export default initPopup;