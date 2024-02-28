function styleSingleDropDownMenu(menuObj) {
    const originMenu = menuObj;
    const parent = originMenu.parentNode;
    const options = originMenu.querySelectorAll("option");

    const menuWrapper = document.createElement("div");
    menuWrapper.className = "jsDropDownMenu__Wrapper";

    const menuButton = document.createElement("div");
    menuButton.className = "jsDropDownMenu__Button";

    const menuButtonLabel = document.createElement("div");
    menuButtonLabel.className = "jsDropDownMenu__Button__Label";
    menuButtonLabel.innerHTML = `<p>${options[0].innerHTML}</p>`;

    const menuButtonOpener = document.createElement("div");
    menuButtonOpener.className = "jsDropDownMenu__Button__Opener";
    menuButtonOpener.innerHTML = "<span>&#155</span>"; //Single right angle quotation (UTF+203A), used as an arrow for the drop-down-menu

    const menuOptionsList = document.createElement("div");
    menuOptionsList.className = "jsDropDownMenu__OptionsList";

    options.forEach((option) => {
        const element = document.createElement("div");
        const p = document.createElement("p");
        p.innerHTML = option.innerHTML;
        element.appendChild(p);
        menuOptionsList.appendChild(element);
    })

    menuButton.appendChild(menuButtonLabel);
    menuButton.appendChild(menuButtonOpener);
    menuWrapper.appendChild(menuButton);
    menuWrapper.appendChild(menuOptionsList);

    parent.insertBefore(menuWrapper, originMenu);
    //parent.removeChild(originMenu);

}

export default function styleAllDropDownMenus(classSelectorElement = ".jsDropDownMenu") {
    const menuElement = document.querySelectorAll(classSelectorElement);
    menuElement.forEach(styleSingleDropDownMenu);
}