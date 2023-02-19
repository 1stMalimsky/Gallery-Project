import { initializePhotosListDisplay, updateListDisplay } from "../components/PhotoListDisplay.js";
import "../initialData/initialDataPhotos.js";
import checkBussinessAccountStatus from "../utils/BussinesAccountStatusCheck.js";

let isBusinessAccount;
let photoArr;

window.addEventListener("load", () => {

    photoArr = localStorage.getItem("photos");
    if (!photoArr) {
        return;
    }
    photoArr = JSON.parse(photoArr);
    isBusinessAccount = checkBussinessAccountStatus();
    initializePhotosListDisplay(photoArr, isBusinessAccount);
});

const sortItems = (photoArr, asc = true) => {
    const sortedArr = [...photoArr];
    if (asc) {
        sortedArr.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        sortedArr.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sortedArr;
};

document.getElementById("sortAsc").addEventListener("click", () => {
    photoArr = sortItems(photoArr, true);
    updateListDisplay(photoArr);
});

document.getElementById("sortDec").addEventListener("click", () => {
    photoArr = sortItems(photoArr, false);
    updateListDisplay(photoArr);
});