import Photo from "../models/Photo.js";

let id = 1;

const createPhotos = () => {
    let initialPhotos = [
        new Photo(
            id++,
            "Cows in the Winter",
            "Ramtaniya - Golan Heights",
            "Alon Malimsky",
            "450&#8362",
            "../../public/assets/imgs/cowsWinter.jpg",
            "10.12.2022"
        ),
        new Photo(
            id++,
            "Abandoned Fortress",
            "Nimrod Fortress - Golan Heigths",
            "Yoram Arbel",
            "500&#8362",
            "../../public/assets/imgs/nimrodFortress.jpg",
            "09.11.2022"
        ),

        new Photo(
            id++,
            "Valley in the Sky",
            "Glacier Natioanl Park - Montana",
            "Yael Malimsky",
            "1500&#8362",
            "../../public/assets/imgs/glacierValley.jpg",
            "12.07.2022"
        ),

        new Photo(
            id++,
            "St. Mary Lake at Noon",
            "Into the Sun rd. - Glacier NAtional Park",
            "Eddy Bauer",
            "750&#8362",
            "../../public/assets/imgs/stMaryLake.jpg",
            "15.07.2022"
        ),

        new Photo(
            id++,
            "Sedona Sunset",
            "Shnebly rd. - Arizona",
            "Boris Hill",
            "575&#8362",
            "../../public/assets/imgs/sedonaSunset.jpg",
            "15.04.2022"
        ),

        new Photo(
            id++,
            "A Different Dead Sea",
            "Stansbury Island - Utah",
            "Moshe Bochnick",
            "665&#8362",
            "../../public/assets/imgs/stansburyIsland.jpg",
            "21.05.2022"
        )
    ];
    return initialPhotos;
};

const setPhotosInitailData = () => {
    let initialPhotoArr = localStorage.getItem("photos");
    if (initialPhotoArr) {
        return;
    }
    localStorage.setItem("photos", JSON.stringify(createPhotos()));
};

setPhotosInitailData();

