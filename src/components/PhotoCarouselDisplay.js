const carouselDiv = document.getElementById("innerCarousel");
let photoArr;

const initializePhotosCarouselDisplay = (photoArrFromHomepage) => {
    updateCarouselDisplay(photoArrFromHomepage);
};

const updateCarouselDisplay = (photoArrFromHomepage) => {
    photoArr = photoArrFromHomepage;
    createCarouselDisplay();
};

const createPhotoCarouselItem = (title, imgUrl) => {

    return `<div class="carousel-item">
                                    <img src="${imgUrl}" class="d-block w-100" alt="${title}">
                                </div>`
};


const createCarouselDisplay = () => {
    let outputStr = "";
    for (let photo of photoArr) {
        outputStr += createPhotoCarouselItem(
            photo.title,
            photo.imgUrl,
        )
    }

    carouselDiv.innerHTML = outputStr;
    carouselDiv.querySelector('.carousel-item').classList.add('active')
}

export { initializePhotosCarouselDisplay, updateCarouselDisplay };


