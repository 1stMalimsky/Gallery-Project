const addBtnsEventListener = (buttonIdKeyword, functionAction) => {
    let btns = document.querySelectorAll(`[id^=${buttonIdKeyword}]`);
    for (let btn of btns) {
        btn.addEventListener("click", functionAction);
    };
}

const clearBtnsEventListener = (buttonIdKeyword, functionAction) => {
    let btns = document.querySelectorAll(`[id^=${buttonIdKeyword}]`);
    for (let btn of btns) {
        btn.removeEventListener("click", functionAction);
    };
}

export { addBtnsEventListener, clearBtnsEventListener };