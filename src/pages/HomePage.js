import { initializePhotosListDisplay, updateListDisplay } from "../components/PhotoListDisplay.js";
import "../initialData/initialDataPhotos.js";
import checkBussinessAccountStatus from "../utils/BussinesAccountStatusCheck.js";
import initPopup from "../components/Popup.js";


let isBusinessAccount;
let photoArr, storagePhotoArr;

window.addEventListener("load", () => {

    photoArr = localStorage.getItem("photos");
    if (!photoArr) {
        return;
    }
    photoArr = JSON.parse(photoArr);
    storagePhotoArr = [...photoArr];
    isBusinessAccount = checkBussinessAccountStatus();
    initializePhotosListDisplay(photoArr, isBusinessAccount, deletePhoto, selectedPhotoPopup);
    definebuttons();
    displayDivDefinition();
});

const displayDivDefinition = () => {
    const listDisplayDiv = document.getElementById("listDisplayDiv");

    const galleryDisplayDiv = document.getElementById("galleryDisplayDiv");

    const carouselDisplayDiv = document.getElementById("carouselDisplayDiv");
}

const definebuttons = () => {
    const homepageListDisplayBtn = document.getElementById("homeListDisplay");

    const homepageGalleryDisplayBtn = document.getElementById("homeGalleryDisaply");

    const homepageCarouselDisplayBtn = document.getElementById("homeCarouselDisplay");

    const sortAscBtn = document.getElementById("sortAsc");

    const sortDecBtn = document.getElementById("sortDec");
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
    updateListDisplay(photoArr);
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
    updateListDisplay(photoArr);
    //updateDisplays();
};


document.getElementById("sortAsc").addEventListener("click", () => {
    photoArr = sortItems(photoArr, true);
    updateListDisplay(photoArr);
});

document.getElementById("sortDec").addEventListener("click", () => {
    photoArr = sortItems(photoArr, false);
    updateListDisplay(photoArr);
});

