const getIdFromClick = (ev) => {
    let idFromEv = ev.target.id.split("-");
    if (!ev.target.id) {
        idFromEv = ev.target.parentElement.id.split("-");
    }
    return idFromEv[1];
};

export default getIdFromClick;