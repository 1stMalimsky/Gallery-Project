import { clearBtnsEventListener, addBtnsEventListener, handleBuyBtnClick } from "../utils/BtnEventHandlers.js";
import getIdFromClick from "../utils/getIdFromClick.js";

const galleryDiv = document.getElementById("photosGallery");

const imgDiv = document.getElementById("imgExpandPopup");

const expandWrapper = document.getElementById("expandWrapper");




let photoArr;

const initializePhotosGalleryDisplay = (photoArrFromHomepage) => {
    updateGalleryDisplay(photoArrFromHomepage);
};

const updateGalleryDisplay = (photoArrFromHomepage) => {
    photoArr = photoArrFromHomepage;
    createGalleryDisplay();
};

const createPhotoGalleryItem = (photoId, title, credit, price, imgUrl) => {

    return ` <div class="card m-2" style="width: 18rem;box-shadow: 0.2rem 0.2rem 1px 1px rgba(0, 0, 0, 0.3)" id="galleryItem-${photoId}">
                            <img src="${imgUrl}" class="card-img-top" alt="${title}" id="galleryDisplayImg-${photoId}"> 
                            <div id="galleryDescription-${photoId}" class="galleryDescription ms-3 me-1">
                                <h3>${title}</h3>
                                <h6>Credit: ${credit}</h6>
                                <h6>Price: ${price}&#8362</h6>
                            </div>
                            <div id="galleryBtnsDiv-${photoId}" class="d-flex galleryBtns me-3">
                                <button id="galleryBuyButton-${photoId}" class="btn btn-success m-1 galleryBtn"><i class="bi bi-bag-fill" ></i>
                                    Buy</button>
                            </div>
                        </div>`
};


const createExpandItem = (id, title, subtitle, credit, price, imgUrl, createdAt) => {
    return `
    <img class="img-fluid" src="${imgUrl}" alt="${title}" id="galleryDisplayImg-${id}">
                <div id="expandInfo">
                    <h3>${title}</h3>
                    <h6>${subtitle}</h6>
                    <h6>Credit: ${credit}</h6>
                    <h6>Price: ${price}&#8362</h6>
                    <h6>Created at: ${createdAt}</h6>
                </div>`
}

const createExpandDisplay = (id) => {
    if (!photoArr) {
        return;
    }
    imgDiv.addEventListener("click", (ev) => {
        if (
            ev.target.id == "imgExpandPopup" ||
            ev.target.id == "closeBtn"
        ) {
            expandWrapper.classList.remove("expand");
            expandWrapper.classList.add("collapse");
            setTimeout(() => imgDiv.classList.add("d-none"), 300);

        }
    })
    let clickedPhoto = photoArr.find((photo) => photo.id === +id)
    expandWrapper.innerHTML = createExpandItem(
        clickedPhoto.id,
        clickedPhoto.title,
        clickedPhoto.subtitle,
        clickedPhoto.credit,
        clickedPhoto.price,
        clickedPhoto.imgUrl,
        clickedPhoto.createdAt
    );

    imgDiv.classList.remove("d-none");
}

const createGalleryDisplay = () => {
    let outputStr = "";
    clearBtnsEventListener("galleryBuyButton", handleBuyBtnClick);
    clearBtnsEventListener("galleryDisplayImg", (ev) => {
        createExpandDisplay(getIdFromClick(ev));
    });

    for (let photo of photoArr) {
        outputStr += createPhotoGalleryItem(
            photo.id,
            photo.title,
            photo.credit,
            photo.price,
            photo.imgUrl,

        )
    }
    galleryDiv.innerHTML = outputStr;
    addBtnsEventListener("galleryBuyButton", handleBuyBtnClick);
    addBtnsEventListener("galleryDisplayImg", (ev) => {
        createExpandDisplay(getIdFromClick(ev));
        expandWrapper.classList.add("expand");
        expandWrapper.classList.remove("collapse");
    });

}

export { initializePhotosGalleryDisplay, updateGalleryDisplay };


