import { clearBtnsEventListener, addBtnsEventListener } from "../utils/BtnEventHandlers.js";

const listDiv = document.getElementById("photosList");
let photoArr;
let businessAccountStatus;

const initializePhotosListDisplay = (photoArrFromHomepage, businessAccountStatusFromHomepage) => {
    businessAccountStatus = businessAccountStatusFromHomepage;
    updateListDisplay(photoArrFromHomepage);
};

const updateListDisplay = (photoArrFromHomepage) => {
    photoArr = photoArrFromHomepage;
    createListDisplay();
};

const createPhotoListItem = (photoId, title, subtitle, credit, price, imgUrl, createdAt) => {
    let businessAccountBtns = `<button class="btn btn-warning m-1" id="listEditButton-${photoId}"><i class="bi bi-pencil-fill"></i> Edit Photo</button>
                            <button class="btn btn-danger m-1"><i class="bi bi-trash3-fill" id="listDeleteButton-${photoId}"></i> Delete Photo</button>`;
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


const createListDisplay = () => {
    let outputStr = "";
    //clearBtnsEventListener(listDeleteButton)
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
    //addBtnsEventListener(listDeleteButton)
}

export { initializePhotosListDisplay, updateListDisplay };


