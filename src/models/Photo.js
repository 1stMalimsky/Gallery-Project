class Photo {
    id;
    title;
    subtitle;
    credit;
    price;
    imgUrl;
    createdAt;
    constructor(id, title, subtitle, credit, price, imgurl, createdAt) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.credit = credit;
        this.price = price;
        this.imgUrl = imgurl;
        this.createdAt = createdAt;
    }
}

export default Photo;