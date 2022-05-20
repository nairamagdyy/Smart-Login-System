var inputName = document.getElementById("registerName");
var inputEmail = document.getElementById("registerEmail");
var inputPassword = document.getElementById("registerPassword");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var forLogin = document.getElementById("login");
var currentUserName = document.getElementById("welcome");
var forLogout = document.getElementById("logout");
var successMessage = document.getElementById("success");
var notvalidMessage = document.getElementById("notValid");
var inputsRequired = document.getElementById("Required");
var inCorrectEmail = document.getElementById("inCorrect");

// console.log(inputEmail,inputName,inputPassword,successMessage,notvalidMessage);
//  localStorage.clear();
let users;

if (localStorage.getItem("AllUsers") != null) {
    users = JSON.parse(localStorage.getItem("AllUsers"));

}
else {
    users = [];
}

function signup() {
    if (inputName.value == "" || inputEmail.value == "" || inputPassword.value == "") {
        inputsRequired.classList.replace("d-none", "d-block");
        successMessage.classList.replace("d-block", "d-none");
        notvalidMessage.classList.replace("d-block", "d-none");
    }
    else {
        if (validation()) {
            var user = {
                name: inputName.value,
                email: inputEmail.value,
                password: inputPassword.value
            }
            users.push(user);
            localStorage.setItem("AllUsers", JSON.stringify(users));
            successMessage.classList.replace("d-none", "d-block");
            notvalidMessage.classList.replace("d-block", "d-none");
            inputsRequired.classList.replace("d-block", "d-none");
        }
        else {
            notvalidMessage.classList.replace("d-none", "d-block");
            successMessage.classList.replace("d-block", "d-none");
            inputsRequired.classList.replace("d-block", "d-none");
        }
    }

}

function validation() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() == inputEmail.value.toLowerCase()) {
            return false;
        }
    }
    return true;
}

function login() {
    if (loginEmail.value == "" || loginPassword.value == "") {
        inputsRequired.classList.replace("d-none", "d-block");
        inCorrectEmail.classList.replace("d-block", "d-none");
    }
    else {

        for (var i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() == loginEmail.value.toLowerCase() &&
                users[i].password.toLowerCase() == loginPassword.value.toLowerCase()) {
                localStorage.setItem('currentUser', users[i].name);
                forLogin.href = "home.html"
                return true;
            }
        }
        inCorrectEmail.classList.replace("d-none", "d-block");
        inputsRequired.classList.replace("d-block", "d-none");
    }
}

function displayName() {
    var userName = localStorage.getItem('currentUser');
    currentUserName.innerHTML = `Welcome ${userName}`
}

function logout() {
    localStorage.removeItem('currentUser');
    forLogout.href = "login.html";
}
