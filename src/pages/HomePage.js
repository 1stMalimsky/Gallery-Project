import { initializePhotosListDisplay, updateListDisplay } from "../components/PhotoListDisplay.js";
import { initializePhotosGalleryDisplay, updateGalleryDisplay } from "../components/PhotoGalleryDisplay.js"

import "../initialData/initialDataPhotos.js";
import checkBussinessAccountStatus from "../utils/BussinesAccountStatusCheck.js";
import initPopup from "../components/Popup.js";


let isBusinessAccount;
let photoArr, storagePhotoArr;
let defaultDisplay;

let listDisplayDiv;
let galleryDisplayDiv;
let carouselDisplayDiv;
let listDisplayBtn;
let galleryDisplayBtn;
let carouselDisplayBtn;

window.addEventListener("load", () => {

    photoArr = localStorage.getItem("photos");
    if (!photoArr) {
        return;
    }
    photoArr = JSON.parse(photoArr);
    storagePhotoArr = [...photoArr];
    isBusinessAccount = checkBussinessAccountStatus();
    initializePhotosListDisplay(photoArr, isBusinessAccount, deletePhoto, selectedPhotoPopup);
    initializePhotosGalleryDisplay(photoArr);
    elementsDefinition();
    activateButtons();
});

const elementsDefinition = () => {
    listDisplayDiv = document.getElementById("listDisplayDiv");

    galleryDisplayDiv = document.getElementById("galleryDisplayDiv");

    carouselDisplayDiv = document.getElementById("carouselDisplayDiv");

    listDisplayBtn = document.getElementById("homeListDisplayBtn");

    galleryDisplayBtn = document.getElementById("homeGalleryDisplayBtn");

    carouselDisplayBtn = document.getElementById("homeCarouselDisplayBtn");
    defaultDisplay = listDisplayDiv;
    displayHandler(listDisplayDiv);
}

const activateButtons = () => {
    listDisplayBtn.addEventListener("click", () => {
        displayHandler(listDisplayDiv);
    });

    galleryDisplayBtn.addEventListener("click", () => {
        displayHandler(galleryDisplayDiv);
    });

    document.getElementById("homeDisplaySearch").addEventListener("input", (ev) => {
        let regex = new RegExp("^" + ev.target.value, "i");
        photoArr = storagePhotoArr.filter((item) => {
            let reg = regex.test(item.title);
            return reg;
        });
        displayUpdate(photoArr);
    });

}

const displayUpdate = () => {
    updateGalleryDisplay(photoArr);
    updateListDisplay(photoArr);
}

const displayHandler = (chosenDisplay) => {
    defaultDisplay.classList.remove("d-block");
    defaultDisplay.classList.add("d-none");

    chosenDisplay.classList.add("d-block");
    chosenDisplay.classList.remove("d-none");
}

const sortItems = (photoArr, asc = true) => {
    const sortedArr = [...photoArr];
    if (asc) {
        sortedArr.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        sortedArr.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sortedArr;
};

const saveToLocalStorage = (arrToSave) => {
    localStorage.setItem("photos", JSON.stringify(arrToSave));
};

const editPhotoSubmit = () => {
    saveToLocalStorage(photoArr);
    displayUpdate(photoArr);
}

const selectedPhotoPopup = (id) => {
    let selectedPhoto = photoArr.find((item) => item.id === +id);
    if (!selectedPhoto) {
        return;
    }
    initPopup(selectedPhoto, editPhotoSubmit);
};

const deletePhoto = (id) => {
    id = +id;
    storagePhotoArr = storagePhotoArr.filter((item) => item.id !== id
    );
    saveToLocalStorage(storagePhotoArr);
    photoArr = photoArr.filter((item) => item.id !== id);
    displayUpdate(photoArr);
};


document.getElementById("sortAsc").addEventListener("click", () => {
    photoArr = sortItems(photoArr, true);
    displayUpdate(photoArr);
});

document.getElementById("sortDec").addEventListener("click", () => {
    photoArr = sortItems(photoArr, false);
    displayUpdate(photoArr);
});

