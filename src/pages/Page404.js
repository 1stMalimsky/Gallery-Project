import { pageChangeHandler } from "../routes/router.js";
import PAGES from "../models/PageModel.js";

document.getElementById("404backToHomepage").addEventListener("click", () => pageChangeHandler(PAGES.HOME));