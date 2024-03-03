function styleSingleDropDownMenu(menuObj) {
    const originMenu = menuObj;
    const parent = originMenu.parentNode;
    const optionsOriginal = originMenu.querySelectorAll("option");
    const options = Array.from(optionsOriginal);

    let selectedOption = options.findIndex((option) => option.selected === true);

    // define descriptor Line, befor the Hidden option is going to be kicked out of the list;
    const descriptorLine = () => {
        const r = options[selectedOption].innerHTML;
        return r;
    };
    
    // Is it maybe optional to cut out hidden options?
    const cutOutHiddenOptions = () => {
        let index = options.findIndex((option) => option.hidden === true);
        while (index >= 0 ) {
            options.splice(index, 1);
            index = options.findIndex((option) => option.hidden === true);
        };
    }
    
    // cutOutHiddenOptions();
    
    function openCloseList() {
        if (menuButtonOpener.classList.contains("open")) {
            menuOptionsList.classList.remove("open");
            menuOptionsListWrapper.classList.remove("open");
            menuButtonOpener.classList.remove("open");
            menuButtonLabel.classList.remove("open");
            menuButton.classList.remove("open");

        } else {
            menuOptionsList.classList.add("open");
            menuOptionsListWrapper.classList.add("open");
            menuButtonOpener.classList.add("open");
            menuButtonLabel.classList.add("open");
            menuButton.classList.add("open");

        }
    } 

    const menuWrapper = document.createElement("div");
    menuWrapper.className = "jsDropDownMenu__Wrapper";

    const menuButton = document.createElement("div");
    menuButton.className = "jsDropDownMenu__Button";

    const menuButtonLabel = document.createElement("div");
    menuButtonLabel.className = "jsDropDownMenu__Button__Label";
    const generateLabel = () => {
        menuButtonLabel.innerHTML = `<p>${descriptorLine()}</p>`;
    }; //FIXME: regenerate descriptorLine if there was a new element chosen.
    generateLabel();

    const menuButtonOpener = document.createElement("div");
    menuButtonOpener.className = "jsDropDownMenu__Button__Opener";
    menuButtonOpener.innerHTML = "<span>&#155</span>"; //Single right angle quotation (UTF+203A), used as an arrow for the drop-down-menu

    const menuOptionsListWrapper = document.createElement("div");
    menuOptionsListWrapper.className = "jsDropDownMenu__OptionsList__Wrapper"

    const menuOptionsList = document.createElement("div");
    menuOptionsList.className = "jsDropDownMenu__OptionsList";

    options.forEach((option, i) => {
        if (option.hidden !== true) {
            const selectElement = () => {
                selectedOption = i;
                console.log(selectedOption);
                generateLabel();
                openCloseList();
            }
            const element = document.createElement("div");
            const p = document.createElement("p");
            p.innerHTML = option.innerHTML;
            p.addEventListener("click", selectElement);
            //TODO: Insert keyboard controlls!;
            element.appendChild(p);
            menuOptionsList.appendChild(element);}
    })

    menuOptionsListWrapper.appendChild(menuOptionsList);

    // const test = document.createElement("p");
    // test.innerHTML = "Test";

    menuButtonOpener.addEventListener("click", openCloseList);
    menuButtonLabel.addEventListener("click", openCloseList);

    menuButton.appendChild(menuButtonLabel);
    menuButton.appendChild(menuButtonOpener);
    menuWrapper.appendChild(menuButton);
    menuWrapper.appendChild(menuOptionsListWrapper);

    parent.insertBefore(menuWrapper, originMenu);
    parent.removeChild(originMenu);

}

export default function styleAllDropDownMenus(classSelectorElement = ".jsDropDownMenu") {
    const menuElement = document.querySelectorAll(classSelectorElement);
    menuElement.forEach(styleSingleDropDownMenu);
}