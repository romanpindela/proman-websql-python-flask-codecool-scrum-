let userRegistrationEmail = "";
let userRegistrationPassword = "";
let userRegistrationPasswordConfirmed = "";
let userRegistrationHashedPassword = "";
let registeringProcessSuccess = "false";

export const minPasswordLength = 6;
export const timeToShowHint = "5";
export let hintMessages = [];
let userRegistrationDataCorrect = true;

export const hintMessageType = {
    "errorConfirmation": "Passwords don't match.",
    "errorEmailTaken": "Email is already taken.",
    "errorEmptyEmail": "Email is empty.",
    "errorNotValidEmail": "Email is wrong. Enter Valid email.",
    "errorEmptyPassword": "Password can't be empty.",
    "errorMinPasswordLength": `Password's min. lenght is ${minPasswordLength}` ,
    "serverProblem": "Something wrong on server site",
    "connectionProblem": "Something wrong with establishing connection",
    "registrationDataCorrect": "Your registration data is correct."
}

export let registerButton = document.getElementById("registerButtonSubmit");


////////////////////////////////////////////
/// main module function ///////////////////
export function initRegisterButton(){
    registerButton.addEventListener("click", registerProcessLinkedToButton);

}

function registerProcessLinkedToButton(e){
    //console.log(e);
    getUserRegisterInput();
    checkUserRegistrationData();
}

function getUserRegisterInput(){
    userRegistrationEmail = document.getElementById("login").value;
    userRegistrationPassword = document.getElementById("password1").value;
    userRegistrationPasswordConfirmed = document.getElementById("password2").value;

}

function checkUserRegistrationData(){
    resetHintMessages();
    checkPasswordConfirmedMatchPassword();
    checkValidPasswordLength();
    checkValidEmail();
    checkNotEmptyEmail();
    if (userRegistrationDataCorrect == true){
        hintMessages.push(hintMessageType["registrationDataCorrect"]);
    }
    //console.log(hintMessages);
    showUserHintMessages();

}

function sendRegistrationDataToServer(){
    hashPasswordBeforeSend();
    prepareUserDataToSend();
    sendUserRegistrationData();
    confirmRegistrationStatus();
}



////////////////////////////////////////////
/// module subfunctions ///////////////////

function resetHintMessages(){
    userRegistrationDataCorrect = true;
    hintMessages = [];
}

function showUserHintMessages(){
    let hintMessagesDiv = document.getElementById("hintMessages");
    hintMessagesDiv.innerHTML = "";

    let cssClassStatus = "hintMessagesWrong";
    if (userRegistrationDataCorrect == true){
        cssClassStatus = "hintMessagesCorrect";
    }

    hintMessages.forEach((hint) => {
        let newHintDiv = document.createElement("div");
        newHintDiv.classList.add(cssClassStatus);
        newHintDiv.innerText = hint;
        hintMessagesDiv.appendChild(newHintDiv);
    });
}


function checkValidPasswordLength(){
    if (userRegistrationPassword.length < 6){
      userRegistrationDataCorrect = false;
    hintMessages.push(hintMessageType["errorMinPasswordLength"]);
    }
}

function checkValidEmail() {
    if ((userRegistrationEmail.indexOf("@") == -1) &&
        (userRegistrationEmail.indexOf(".") == -1)) {
        userRegistrationDataCorrect = false;
        hintMessages.push(hintMessageType["errorNotValidEmail"]);
    }
}
function checkPasswordConfirmedMatchPassword(){
    if (userRegistrationPassword !== userRegistrationPasswordConfirmed){
        userRegistrationDataCorrect = false;
        hintMessages.push(hintMessageType["errorConfirmation"]);
    }
}

function checkNotEmptyEmail(){
    if (userRegistrationEmail.length === 0){
        userRegistrationDataCorrect = false;
        hintMessages.push(hintMessageType["errorEmptyEmail"]);
    }
}


export function hashPasswordBeforeSend(){

}

export function prepareUserDataToSend(){

}

export function sendUserRegistrationData(){

}

function confirmRegistrationStatus(){

}
