
const checkBussinessAccountStatus = () => {
    let loggedUser = localStorage.getItem("token");
    if (!loggedUser) {
        return false;
    }
    loggedUser = JSON.parse(loggedUser);
    return loggedUser.businessAccount;
}

export default checkBussinessAccountStatus;