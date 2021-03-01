const userRegistrationEmail = "";
const userRegistrationPassword = "";
const userRegistrationPasswordConfirmed = "";
const userRegistrationHashedPassword = "";
const registeringProcessSuccess = "false";

export const minPasswordLenghtSigns = 6;
export const timeToShowHint = "5";
export const hintMessages = [];

export const hintMessageType = {
    "errorConfirmation": "Passwords don't match.",
    "errorEmailTaken": "Email is already taken.",
    "errorEmptyPassword": "Password can't be empty.",
    "errorPasswordIsTooEasy": "Password's too easy. Min.  signs",
    "serverProblem": "Something wrong on server site",
    "connectionProblem": "Something wrong with establishing connection"
}

export let registerButton = document.getElementById("registerButtonSubmit");
registerButton.hi

export function initRegisterButton(registerButton){
    registerButton.addEventListener("click", registerProcessLinkedToButton);
}



function registerProcessLinkedToButton(e){
    console.log(e);

}


function getUserRegisterInput(){

}

function selfCheckPasswordIsConfirmedByUser(){

}


export function hashPasswordBeforeSend(){

}

export function prepareUserDataToSend(){

}

export function sendUserRegistrationData(){

}

function confirmRegistrationStatus(){

}

export function showHints(){

}