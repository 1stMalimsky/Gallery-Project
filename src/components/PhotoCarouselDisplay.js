const carouselDiv = document.getElementById("innerCarousel");
let photoArr;

const initializePhotosCarouselDisplay = (photoArrFromHomepage) => {
    updateCarouselDisplay(photoArrFromHomepage);
};

const updateCarouselDisplay = (photoArrFromHomepage) => {
    photoArr = photoArrFromHomepage;
    createCarouselDisplay();
};

const createPhotoCarouselItem = (title, imgUrl, credit) => {

    return `<div class="carousel-item">
                                    <img src="${imgUrl}" class="img-fluid d-block" alt="${title}">
                                    <p>Photo taken by: ${credit}</p>
                                </div>`
};


const createCarouselDisplay = () => {
    let outputStr = "";
    for (let photo of photoArr) {
        outputStr += createPhotoCarouselItem(
            photo.title,
            photo.imgUrl,
            photo.credit
        )
    }

    carouselDiv.innerHTML = outputStr;
    carouselDiv.querySelector('.carousel-item').classList.add('active')
}

export { initializePhotosCarouselDisplay, updateCarouselDisplay };


