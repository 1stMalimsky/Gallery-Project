import { clearBtnsEventListener, addBtnsEventListener } from "../utils/BtnEventHandlers.js";
import initPopup from "../components/Popup.js";


const listDiv = document.getElementById("photosList");
let photoArr;
let businessAccountStatus;
let deletePhoto;
let selectedPhotoPopup;

const initializePhotosListDisplay = (photoArrFromHomepage, businessAccountStatusFromHomepage, deletePhotoFromHomepage, SelectedPhotoPopupFromHomepage) => {
    businessAccountStatus = businessAccountStatusFromHomepage;
    updateListDisplay(photoArrFromHomepage);
    deletePhoto = deletePhotoFromHomepage;
    selectedPhotoPopup = SelectedPhotoPopupFromHomepage;
};

const updateListDisplay = (photoArrFromHomepage) => {
    photoArr = photoArrFromHomepage;
    createListDisplay();
};

const createPhotoListItem = (photoId, title, subtitle, credit, price, imgUrl, createdAt) => {
    let businessAccountBtns = `<button class="btn btn-warning m-1" id="listEditButton-${photoId}"><i class="bi bi-pencil-fill"></i> Edit Photo</button>
                            <button class="btn btn-danger m-1" id="listDeleteButton-${photoId}"><i class="bi bi-trash3-fill"></i> Delete Photo</button>`

    return `<div id="listItem-${photoId}" class="d-flex flex-wrap mb-3">
                            <img src=${imgUrl} alt="${title}" id="listDisplayImg"
                                style="width: 20em; margin-right: 2em;">
                            <div id="listDescription">
                                <h3>${title}</h3>
                                <h6>${subtitle}</h6>
                                <h6>Credit: ${credit}</h6>
                                <h6>Price: ${price}</h6>
                                <h6>Created at: ${createdAt}</h6>
                            </div>
                        </div>
                        <div id="listBtns" class="d-flex flex-md-column">
                            <button class="btn btn-success m-1"><i class="bi bi-bag-fill" id="listBuyButton-${photoId}"></i> Buy Now</button>
                            ${businessAccountStatus ? businessAccountBtns : ""}
                        </div>`
};


const getIdFromClick = (ev) => {
    let idFromEv = ev.target.id.split("-");
    if (!ev.target.id) {
        idFromEv = ev.target.parentElement.id.split("-");
    }
    return idFromEv[1];
};

const handleDeleteBtnClick = (ev) => {
    deletePhoto(getIdFromClick(ev));
};

const handleEditBtnClick = (ev) => {
    selectedPhotoPopup(getIdFromClick(ev));
};


const createListDisplay = () => {
    let outputStr = "";
    clearBtnsEventListener("listDeleteButton", handleDeleteBtnClick);
    clearBtnsEventListener("listEditButton", handleEditBtnClick);
    for (let photo of photoArr) {
        outputStr += createPhotoListItem(
            photo.id,
            photo.title,
            photo.subtitle,
            photo.credit,
            photo.price,
            photo.imgUrl,
            photo.createdAt
        )
    }
    listDiv.innerHTML = outputStr;
    addBtnsEventListener("listDeleteButton", handleDeleteBtnClick);
    addBtnsEventListener("listEditButton", handleEditBtnClick);
}

export { initializePhotosListDisplay, updateListDisplay };


