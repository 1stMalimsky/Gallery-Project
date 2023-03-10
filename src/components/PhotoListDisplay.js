import { clearBtnsEventListener, addBtnsEventListener, handleBuyBtnClick } from "../utils/BtnEventHandlers.js";
import getIdFromClick from "../utils/getIdFromClick.js";

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


    let businessAccountBtns = `<button class="btn btn-warning m-1 listBtn" id="listEditButton-${photoId}"><i class="bi bi-pencil-fill"></i> Edit</button>
                            <button class="listBtn btn btn-danger m-1" id="listDeleteButton-${photoId}"><i class="bi bi-trash3-fill"></i> Delete</button>`

    return `<div id="listItem-${photoId}" class="d-flex flex-wrap justify-content-between mb-3 ms-1 listGenItem w-100" style="box-shadow: 0.2rem 0.2rem 1px 1px rgba(0, 0, 0, 0.5);">
                            <img src="${imgUrl}" alt="${title}" id="listDisplayImg-${photoId}" class="listImg ms-2">
                            <div id="listDescription-${photoId}" class="listDescription ms-3 me-1">
                                <h3>${title}</h3>
                                <h6>${subtitle}</h6>
                                <h6>Credit: ${credit}</h6>
                                <h6>Price: ${price}&#8362</h6>
                                <h6>Created at: ${createdAt}</h6>
                            </div>
                            <div id="listBtnsDiv-${photoId}" class="d-flex listBtns me-3">
                            <button id="listBuyButton-${photoId}" class="btn btn-success m-1 listBtn"><i class="bi bi-bag-fill" ></i> Buy</button>
                            ${businessAccountStatus ? businessAccountBtns : ""}
                            </div>
            </div>`
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
    clearBtnsEventListener("listBuyButton", handleBuyBtnClick);
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
    addBtnsEventListener("listBuyButton", handleBuyBtnClick);
}

export { initializePhotosListDisplay, updateListDisplay, handleBuyBtnClick };


