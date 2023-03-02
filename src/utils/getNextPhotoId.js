const getnextPhotoId = () => {
    let nextPhotoId = localStorage.getItem("nextPhotoId");
    if (!nextPhotoId) {
        nextPhotoId = 1;
        return nextPhotoId;
    }
    nextPhotoId = +nextPhotoId;
    if (isNaN(nextPhotoId)) {
        nextPhotoId = 1;
    }
    return nextPhotoId;
};

export default getnextPhotoId;