import styleAllDropDownMenus from "./dropDownMenu.js";
import styleHeader from "./header.js";

export default function stylePage() {
    console.log("stylePage")
    styleAllDropDownMenus();
    styleHeader();
    console.log("go on styling!");
}