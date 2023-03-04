import { pageChangeHandler } from "../routes/router.js";
import PAGES from "../models/PageModel.js";

const addBtnsEventListener = (buttonIdKeyword, functionAction) => {
    let btns = document.querySelectorAll(`[id^='${buttonIdKeyword}-']`);
    for (let btn of btns) {
        btn.addEventListener("click", functionAction);
    };
}

const clearBtnsEventListener = (buttonIdKeyword, functionAction) => {
    let btns = document.querySelectorAll(`[id^="${buttonIdKeyword}-"]`);
    for (let btn of btns) {
        btn.removeEventListener("click", functionAction);
    };
}

const handleBuyBtnClick = () => {
    pageChangeHandler(PAGES.PAGE404);
}

export { addBtnsEventListener, clearBtnsEventListener, handleBuyBtnClick };