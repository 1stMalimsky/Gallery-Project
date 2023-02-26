const editSubmitBtn = document.getElementById("editSubmitBtn");
//const editCancelBtn = document.getElementById("editCancelBtn");

const editPopupWindow = document.getElementById("editPopupWindow");
const editUrlInput = document.getElementById("editUrlInput");
const editAlternativeInput = document.getElementById("editAlternativeInput");
const editCreditInput = document.getElementById("editCreditInput");
const editPriceInput = document.getElementById("editPriceInput");
const imgUrlDisplay = document.getElementById("editImgUrlDisplay");

let selectedPhoto;
let editPhotoSubmit;
const initPopup = (selectedPhotoFromHomePage, editPhotoFromHomePage) => {

    if (selectedPhotoFromHomePage) {
        selectedPhoto = selectedPhotoFromHomePage;
        editPhotoSubmit = editPhotoFromHomePage;
    }
    //else {    selectedProperty = new Property(getNextId(), "", 0, "", "");}
    //editPhoto = editPropertyFromHomePage;
    editUrlInput.value = selectedPhoto.imgUrl;
    editAlternativeInput.value = selectedPhoto.subtitle;
    editCreditInput.value = selectedPhoto.credit;
    editPriceInput.value = selectedPhoto.price;
    imgUrlDisplay.src = selectedPhoto.imgUrl;
    showEditPopup();
};

window.addEventListener("load", () => {

    editPopupWindow.addEventListener("click", (ev) => {
        if (
            ev.target.id == "editPopupWindow" ||
            ev.target.id == "editCancelBtn"
        ) {
            hideEditPopup();
        }
    });

    editSubmitBtn.addEventListener("click", () => {

        selectedPhoto.imgUrl = editUrlInput.value;
        selectedPhoto.subtitle = editAlternativeInput.value;
        selectedPhoto.credit = editCreditInput.value;
        selectedPhoto.price = editPriceInput.value;
        selectedPhoto.imgUrl = imgUrlDisplay.src;
        editPhotoSubmit(selectedPhoto)
        hideEditPopup();
    });
    editUrlInput.addEventListener("change", () => {
        imgUrlDisplay.src = editUrlInput.value;
    });
});




const showEditPopup = () => {
    editPopupWindow.classList.remove("d-none");
};

const hideEditPopup = () => {
    editPopupWindow.classList.add("d-none");
};


export default initPopup;