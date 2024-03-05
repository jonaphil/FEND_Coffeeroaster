import styleAllDropDownMenus from "./dropDownMenu.js";
import styleHeader from "./scrollResponsiveHeader.js";

export default function stylePage() {
    console.log("stylePage")
    styleAllDropDownMenus();
    styleHeader();
    console.log("go on styling!");
}