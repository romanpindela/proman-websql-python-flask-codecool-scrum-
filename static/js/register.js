let userRegistrationEmail = "";
let userRegistrationPassword = "";
let userRegistrationPasswordConfirmed = "";
let userRegistrationHashedPassword = "";
let registrationSuccessStatus = "false";

export const minPasswordLength = 4;
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
    "registrationSuccessful": "Success! Your account is registered.",
    "registrationFailed": "Login already exist. Try again.",
    "registrationDataCorrect": "Your registration data is correct.",
}

let registerButton = document.getElementById("registerButtonSubmit");

initRegisterButton();

function initRegisterPage(){
    initRegisterButton();
}

////////////////////////////////////////////
/// main module function ///////////////////
export function initRegisterButton(){
    registerButton.addEventListener("click", registerProcessLinkedToButton);

}

function registerProcessLinkedToButton(e){
    //console.log(e);
    getUserRegisterInput();
    checkUserRegistrationData();
    setTimeout(sendRegistrationDataToServer, 1000);
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
    if (userRegistrationDataCorrect === true){
        sendUserRegistrationData();
    }else{

    }
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

function showServerRegistrationStatus(){
    hintMessages = [];
    if (registrationSuccessStatus === false){
        hintMessages.push(hintMessageType['registrationFailed'])
    }else{
        hintMessages.push(hintMessageType["registrationSuccessful"])
    }


    let hintMessagesDiv = document.getElementById("hintMessages");
    hintMessagesDiv.innerHTML = "";

    let cssClassStatus = "hintMessagesWrong";
        if (registrationSuccessStatus === true){
        cssClassStatus = "hintMessagesCorrect";
    }
    let newHintDiv = document.createElement("div");
        newHintDiv.classList.add(cssClassStatus);
        newHintDiv.innerText = hintMessages[0];
        hintMessagesDiv.appendChild(newHintDiv);
}


function checkValidPasswordLength(){
    if (userRegistrationPassword.length <= minPasswordLength){
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
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(userRegistrationPassword, salt, function (err, hash) {
            userRegistrationHashedPassword = hash;
            console.log(hash);
        });
    });
};


let urlRegister = "/register"
export function sendUserRegistrationData(){
    fetch(urlRegister,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            body: JSON.stringify({"login": userRegistrationEmail, "password": userRegistrationPassword })
            }
        )
        .then(response => response.json())
        .then(function (response){
            if (response['registration_success_status'] === "login exist"){
                registrationSuccessStatus = false;
            }else{
                registrationSuccessStatus = true;
            }
            showServerRegistrationStatus();
            console.log(response)
        })
}
