import { initializePhotosListDisplay, updateListDisplay } from "../components/PhotoListDisplay.js";
import { initializePhotosGalleryDisplay, updateGalleryDisplay } from "../components/PhotoGalleryDisplay.js"
import { initializePhotosCarouselDisplay, updateCarouselDisplay } from "../components/PhotoCarouselDisplay.js"
import "../initialData/initialDataPhotos.js";
import checkBusinessAccountStatus from "../utils/BusinessAccountStatusCheck.js";
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
    isBusinessAccount = checkBusinessAccountStatus();
    initializePhotosListDisplay(photoArr, isBusinessAccount, deletePhoto, selectedPhotoPopup);
    initializePhotosGalleryDisplay(photoArr);
    initializePhotosCarouselDisplay(photoArr);
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
    defaultDisplay = carouselDisplayDiv;
    displayHandler(defaultDisplay);
}

const activateButtons = () => {
    listDisplayBtn.addEventListener("click", () => {
        displayHandler(listDisplayDiv);
    });

    galleryDisplayBtn.addEventListener("click", () => {
        displayHandler(galleryDisplayDiv);
    });

    carouselDisplayBtn.addEventListener("click", () => {
        displayHandler(carouselDisplayDiv)
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
    updateCarouselDisplay(photoArr);
}

const displayHandler = (chosenDisplay) => {
    if (chosenDisplay == carouselDisplayDiv) {
        document.getElementById("sortAsc").classList.add("d-none");
        document.getElementById("sortDec").classList.add("d-none");
        document.getElementById("homeDisplaySearch").classList.add("d-none");
    }
    else {
        document.getElementById("sortAsc").classList.remove("d-none");
        document.getElementById("sortDec").classList.remove("d-none");
        document.getElementById("homeDisplaySearch").classList.remove("d-none");
    }
    defaultDisplay.classList.remove("d-block");
    defaultDisplay.classList.add("d-none");

    chosenDisplay.classList.add("d-block");
    chosenDisplay.classList.remove("d-none");
    defaultDisplay = chosenDisplay;
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

const addNewPhotoPopup = () => {
    initPopup(undefined, addNewPhoto);
};

const addNewPhoto = (newPhoto) => {
    console.log("addNewPhoto activated");
    storagePhotoArr = [...storagePhotoArr, newPhoto];
    let nextPhotoId = +newPhoto.id + 1;
    localStorage.setItem("nextPhotoId", nextPhotoId + "");
    photoArr = [...storagePhotoArr];
    editPhotoSubmit();
};


document.getElementById("sortAsc").addEventListener("click", () => {
    photoArr = sortItems(photoArr, true);
    displayUpdate(photoArr);
});

document.getElementById("sortDec").addEventListener("click", () => {
    photoArr = sortItems(photoArr, false);
    displayUpdate(photoArr);
});

export { addNewPhotoPopup };