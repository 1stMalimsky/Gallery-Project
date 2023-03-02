const isValidUrl = (url) => {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.href === url;

    } catch (error) {
        return false;
    }
}

export default isValidUrl;