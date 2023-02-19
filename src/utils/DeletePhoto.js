const deletePhoto = (id) => {
    id = +id;
    originalPropertiesArr = originalPropertiesArr.filter(
        (item) => item.id !== id
    );
    saveToLocalStorage(originalPropertiesArr);
    propertiesArr = propertiesArr.filter((item) => item.id !== id); //delete property by index
    updateDisplays();
};