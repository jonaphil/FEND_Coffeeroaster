function styleSingleDropDownMenu(menuObj) {
    const originMenu = menuObj;
    const parent = originMenu.parentNode;
    const optionsOriginal = originMenu.querySelectorAll("option");
    const options = Array.from(optionsOriginal);

    // TODO: having a function to generate that List, work on it and then it can be used in the java-script generated form.
    let selectedOption = options.findIndex((option) => option.selected === true);

    // define descriptor Line, befor the Hidden option is going to be kicked out of the list;
    const descriptorLine = () => {
        const r = options[selectedOption].innerHTML;
        return r;
    };
        
    function openCloseList() {
            menuOptionsList.classList.toggle("open");
            menuOptionsListWrapper.classList.toggle("open");
            menuButtonOpener.classList.toggle("open");
            menuButtonLabel.classList.toggle("open");
            menuButton.classList.toggle("open");
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

    const selectElement = (index) => {
        selectedOption = index;
        originMenu.selectedIndex = index;
        console.log(selectedOption);
        generateLabel();
        openCloseList();
    }

    options.forEach((option, i) => {
        if (option.hidden !== true) {
            const element = document.createElement("div");
            const p = document.createElement("p");
            p.innerHTML = option.innerHTML;
            p.addEventListener("click", selectElement.bind(null, i));
            //TODO: Insert keyboard controlls!;
            element.appendChild(p);
            menuOptionsList.appendChild(element);}
    })

    menuOptionsListWrapper.appendChild(menuOptionsList);

    menuButtonOpener.addEventListener("click", openCloseList);
    menuButtonLabel.addEventListener("click", openCloseList);

    menuButton.appendChild(menuButtonLabel);
    menuButton.appendChild(menuButtonOpener);
    menuWrapper.appendChild(menuButton);
    menuWrapper.appendChild(menuOptionsListWrapper);

    parent.insertBefore(menuWrapper, originMenu);
    originMenu.classList.add("jsDropDownMenu__Hidden-part");
}

export default function styleAllDropDownMenus(classSelectorElement = ".jsDropDownMenu") {
    const menuElement = document.querySelectorAll(classSelectorElement);
    if (menuElement.length !== 0) {
        menuElement.forEach(styleSingleDropDownMenu);
    }
}
