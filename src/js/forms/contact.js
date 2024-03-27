
function nameIsValid(name) {
    const realName = name.trim();
    if (realName.length >= 1) {
        return true;
    } else {
        return false;
    }
}


function emailIsValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function messageIsValid(message) { 
    const realMessage = message.trim();
    if (realMessage.length > 0) {
        return true;
    } else {
        return false;
    }

}

function showError(node) {
    if (!node.classList.contains("error")) {
        node.classList.add("error");
    }
}

export default function generateContactForm() {
    const contactForm = document.querySelector("form.contact-form");
    const nameInput = contactForm.querySelector("input#name");
    const emailInput = contactForm.querySelector("input#email");
    const phoneInput = contactForm.querySelector("input#phone");
    const concern = contactForm.querySelector(".contact-form__concern");
    const messageInput = contactForm.querySelector("textarea#message");
    const dataProtectionCheck = contactForm.querySelector("input#accept-dataprotection");

    const requiredFields = contactForm.querySelectorAll("[required]");


    const evaluateInput = () => {
        requiredFields.forEach((node) => {
            node.classList.contains("error") ? node.classList.remove("error") : 0;
            switch (node.id) {
                case 'name':
                    nameIsValid(node.value) ? 0 : showError(node);
                    break;
                case 'email':
                    emailIsValid(node.value) ? 0 : showError(node);
                    break;
                case 'message':
                    messageIsValid(node.value) ? 0 : showError(node);
                    break;
                case 'concern':
                    parseInt(node.value) !== 0 ? 0 : showError(node);
                    break;
                case 'accept-dataprotection':
                    node.checked ? 0 : showError(node);
                    break;
            }
        })
    }

    const submitInput = (event) => {
        console.log("trying to submit");
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const checkbox = dataProtectionCheck;
        const concernValue = concern.value;
        const message = messageInput.value.trim();

        let error = false;

        if (
            !nameIsValid(name) || !emailIsValid(email) || concernValue === 0 || 
            !messageIsValid(message) || checkbox.checked === false
        ) {
            error = true;
        } else {
            error = false;
        }
       
        if (!error) {
            contactForm.submit();
        } else {
            alert("Please fill out the form correctly!\n\nLook at the hints.");
            evaluateInput();
        }
    }

    contactForm.addEventListener("submit", submitInput);
}
