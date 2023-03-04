import { clearBtnsEventListener, addBtnsEventListener, handleBuyBtnClick } from "../utils/BtnEventHandlers.js";

const galleryDiv = document.getElementById("photosGallery");
let photoArr;

const initializePhotosGalleryDisplay = (photoArrFromHomepage) => {
    updateGalleryDisplay(photoArrFromHomepage);
};

const updateGalleryDisplay = (photoArrFromHomepage) => {
    photoArr = photoArrFromHomepage;
    createGalleryDisplay();
};

const createPhotoGalleryItem = (photoId, title, subtitle, credit, price, imgUrl, createdAt) => {

    return ` <div class="card m-2" style="width: 18rem;box-shadow: 0.2rem 0.2rem 1px 1px rgba(0, 0, 0, 0.3)" id="galleryItem-${photoId}">
                            <img src="${imgUrl}" class="card-img-top" alt="${title}" id="galleryDisplayImg-${photoId}"> 
                            <div id="galleryDescription-${photoId}" class="galleryDescription ms-3 me-1">
                                <h3>${title}</h3>
                                <h6>${subtitle}</h6>
                                <h6>Credit: ${credit}</h6>
                                <h6>Price: ${price}&#8362</h6>
                                <h6>Created at: ${createdAt}</h6>
                            </div>
                            <div id="galleryBtnsDiv-${photoId}" class="d-flex galleryBtns me-3">
                                <button id="galleryBuyButton-${photoId}" class="btn btn-success m-1 galleryBtn"><i class="bi bi-bag-fill" ></i>
                                    Buy</button>
                            </div>
                        </div>`
};


const createGalleryDisplay = () => {
    let outputStr = "";
    clearBtnsEventListener("galleryBuyButton", handleBuyBtnClick);
    for (let photo of photoArr) {
        outputStr += createPhotoGalleryItem(
            photo.id,
            photo.title,
            photo.subtitle,
            photo.credit,
            photo.price,
            photo.imgUrl,
            photo.createdAt
        )
    }
    galleryDiv.innerHTML = outputStr;
    addBtnsEventListener("galleryBuyButton", handleBuyBtnClick);
}

export { initializePhotosGalleryDisplay, updateGalleryDisplay };


