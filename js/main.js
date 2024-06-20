var signUpSection = document.querySelector("#signUpSec");
var signInSection = document.querySelector("#signInSec");
var signUpSpan = document.querySelector("#signUpSec span");
var signInSpan = document.querySelector("#signInSec span");
var home = document.querySelector("#homePage");
var innerElementBox = document.querySelector("#innerBox");
var removeAllUser = document.querySelector("#removeUser");
var enter;
var helloUserName;

if(localStorage.getItem("Enter")){
  enter = JSON.parse(localStorage.getItem("Enter"));
}

if(localStorage.getItem("helloUser")){
  helloUserName = JSON.parse(localStorage.getItem("helloUser"));
}

signInSpan.addEventListener("click", toSignUp);
function toSignUp() {
  signUpSection.classList.remove("d-none");
  signInSection.classList.add("d-none");
  clearInput();
}

signUpSpan.addEventListener("click", toLogin);
function toLogin() {
  signUpSection.classList.add("d-none");
  signInSection.classList.remove("d-none");
  clearInput();
}

if(helloUserName) {
  innerElementBox.innerHTML = `<h2 class="text-center p-5">Welcome `+helloUserName+`</h2>`;
}

if(enter) {
  home.classList.remove("d-none");
  signInSection.classList.add("d-none");
} else {
  home.classList.add("d-none");
  signInSection.classList.remove("d-none");
}
// =====================================================
// =====================================================
var nameInput = document.querySelector("#uName");
var emailInput = document.querySelector("#uEmail");
var passInput = document.querySelector("#uPassword");
var signUpButton = document.querySelector("#signUpBut");
var messageAlertSignUp = document.querySelector("#messageSignUp");
var messageAlertLogin = document.querySelector("#messageLogin");
var emailInputLogin = document.querySelector("#emailUse");
var passInputLogin = document.querySelector("#passwordUse");
var messageAlertLogin = document.querySelector("#messageLogin");
var signInButton = document.querySelector("#signInBut");
var logOut = document.querySelector("#LogOutBut");
var namePattern = /^[\w\s]{3,50}$/;
var emailPattern = /^[\w]+@[a-zA-Z]{3,}\.[a-zA-Z]{2,}$/;
var passPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*-_]{6,16}$/;
var nExist;
var eExist;

var userList = [];
if (localStorage.getItem("User")) {
  userList = JSON.parse(localStorage.getItem("User"));
}

signUpButton.addEventListener("click", signUp);
function signUp() {
  if (
    valid(namePattern, nameInput) &&
    valid(emailPattern, emailInput) &&
    valid(passPattern, passInput)
  ) {
    nameExists();
    emailExists();
    if (nExist == true) {
      messageAlertSignUp.innerHTML = `<p class='text-danger'>name already exists</p>`;
    } else if (eExist == true) {
      messageAlertSignUp.innerHTML = `<p class='text-danger'>email already exists</p>`;
    } else {
      var user = {
        name: nameInput.value,
        email: emailInput.value,
        pass: passInput.value,
      };
      userList.push(user);
      localStorage.setItem("User", JSON.stringify(userList));
      messageAlertSignUp.innerHTML = `<p class = 'text-success'>Success</p>`;
      clearInput();
      toLogin();
    }
  } else if (
    nameInput.value == "" &&
    emailInput.value == "" &&
    passInput.value == ""
  ) {
    messageAlertSignUp.innerHTML = `<p class='text-danger'>All inputs is required</p>`;
  } else {
    messageAlertSignUp.innerHTML = `<p class='text-danger'>Something Wrong</p>`;
  }
}

function clearInput() {
  nameInput.value = "";
  emailInput.value = "";
  passInput.value = "";
  nameInput.classList.remove("is-valid");
  emailInput.classList.remove("is-valid");
  passInput.classList.remove("is-valid");
  nameInput.classList.remove("is-invalid");
  emailInput.classList.remove("is-invalid");
  passInput.classList.remove("is-invalid");
  messageAlertSignUp.innerHTML = `<p></p>`;
  emailInputLogin.value = "";
  passInputLogin.value = "";
  messageAlertLogin.innerHTML = `<p></p>`;
  emailInputLogin.classList.remove("is-valid");
  passInputLogin.classList.remove("is-valid");
  emailInputLogin.classList.remove("is-invalid");
  passInputLogin.classList.remove("is-invalid");
}
// ===================================
// =========== START VALID ===========
// ===================================
nameInput.addEventListener("change", function () {
  var pattern = namePattern;
  valid(pattern, nameInput);
});
emailInput.addEventListener("change", function () {
  var pattern = emailPattern;
  valid(pattern, emailInput);
});
passInput.addEventListener("change", function () {
  var pattern = passPattern;
  valid(pattern, passInput);
});
emailInputLogin.addEventListener("change", function () {
  var pattern = emailPattern;
  valid(pattern, emailInputLogin);
});
passInputLogin.addEventListener("change", function () {
  var pattern = passPattern;
  valid(pattern, passInputLogin);
});

function valid(pattern, field) {
  if (pattern.test(field.value)) {
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");
    return true;
  } else {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }
}

function nameExists() {
  for (var i = 0; i < userList.length; i++) {
    if (nameInput.value == userList[i].name) {
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
      nExist = true;
    } else {
      nExist = false;
    }
  }
}

function emailExists() {
  for (var i = 0; i < userList.length; i++) {
    if (emailInput.value == userList[i].email) {
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
      eExist = true;
    } else {
      eExist = false;
    }
  }
}
// ===================================
// ============ END VALID ============
// ===================================

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// =============== (LOGIN) ===============
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
signInButton.addEventListener("click", login)
function login() {
  if (emailInputLogin.value == "" && passInputLogin.value == "") {
    messageAlertLogin.innerHTML = `<p class='text-danger'>All inputs is required</p>`;
  } else if (valid(emailPattern, emailInputLogin) && valid(passPattern, passInputLogin)) {
    for (var i = 0; i < userList.length; i++) {
      if (emailInputLogin.value == userList[i].email) {
        emailInputLogin.classList.add("is-valid");
        emailInputLogin.classList.remove("is-invalid");
        if(passInputLogin.value == userList[i].pass) {
          enter = true;
          helloUserName = userList[i].name;
          localStorage.setItem("Enter", JSON.stringify(enter));
          localStorage.setItem("helloUser", JSON.stringify(helloUserName));
          messageLogin.innerHTML = `<p class='text-success'>Right Password</p>`;
          passInputLogin.classList.add("is-valid");
          passInputLogin.classList.remove("is-invalid");
          home.classList.remove("d-none")
          signInSection.classList.add("d-none")
          innerElementBox.innerHTML = `<h2 class="text-center p-5">Welcome `+userList[i].name+`</h2>`;
        } else {
          passInputLogin.classList.add("is-invalid");
          passInputLogin.classList.remove("is-valid");
          messageLogin.innerHTML = `<p class='text-danger'>Wrong Password</p>`;
        }
        return true;
      } else {
        emailInputLogin.classList.add("is-invalid");
        emailInputLogin.classList.remove("is-valid");
        messageLogin.innerHTML = `<p class='text-danger'>email not exists</p>`;
      }
    }
  } else {
    messageLogin.innerHTML = `<p class='text-danger'>Something Wrong</p>`;
  }
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ============= (log Out) =============
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
logOut.addEventListener("click", function() {
  home.classList.add("d-none");
  signInSection.classList.remove("d-none");
  enter = false;
  localStorage.setItem("Enter", JSON.stringify(enter));
})
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ============= (Remove All User) =============
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
removeAllUser.addEventListener("click", function() {
  userList.splice(0,userList.length);
  localStorage.setItem("User", JSON.stringify(userList));
})