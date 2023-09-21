/*
1- show or hide create account and login forms
2- login form validation and set cookies if user sign in successfully
3-  create form validation and set cookies if user sign in successfully
*/
"use strict";
import { getAllData, getData, setData } from "../utilities/localStorage.js";
import { setCookie, getCookie } from "../utilities/cookies.js";

// get current user from cookies and export it to be reusable at any page
const cookieUser = {
  id: getCookie("userID"),
  username: getCookie("username"),
  password: getCookie("password"),
};
// get user data from local storage based on user ID that we get from cookies
// to check if the cookie username and cookie password are the same or not
// if yes ==> the user logged in
// if not or no cookie ==> redirect to login page

const currentUser = getData(cookieUser.id);

if (
  currentUser &&
  cookieUser.username === currentUser.username &&
  cookieUser.password === currentUser.password
) {
  window.location.href = "/home.html";
}

////////////   1- show or hide create account and login forms
const createBtn = document.getElementById("btnCreate");
const background = document.getElementById("overlay-background");
const createForm = document.getElementById("createForm");
const loginForm = document.getElementById("loginForm");
const exitIcons = document.querySelectorAll(".exit-icon");
const loginBtn = document.getElementById("btnSignin");
const createAccount = () => {
  background.setAttribute("style", "display:block;");
  createForm.setAttribute("style", "display:block;");
  loginForm.setAttribute("style", "display:none;");
};
const loginAccount = () => {
  background.setAttribute("style", "display:block;");
  loginForm.setAttribute("style", "display:block;");
  createForm.setAttribute("style", "display:none;");
};
const hideAll = () => {
  background.setAttribute("style", "display:none;");
  createForm.setAttribute("style", "display:none;");
  loginForm.setAttribute("style", "display:none;");
};
createBtn.addEventListener("click", createAccount);
loginBtn.addEventListener("click", loginAccount);
background.addEventListener("click", hideAll);

exitIcons.forEach((icon) => {
  icon.addEventListener("click", hideAll);
});

///////   2- login form validation and set cookies if user sign in successfully

// get all users from local storage
const userArr = getAllData("user");
const userName = document.querySelector("#loginUserName");
const password = document.querySelector("#loginPassword");
const singINBtn = document.querySelector("#singIn");
const invalid = document.getElementById("invalid");

function createCookies(userid) {
  setCookie("userID", userid, 7);
  setCookie("username", userName.value, 7);
  setCookie("password", password.value, 7);
  window.location.href = "/home.html";
}
function loginChecker() {
  // check if the username and password is correct
  for (var i = 0; i < userArr.length; i++) {
    if (
      userName.value === userArr[i].username &&
      password.value == userArr[i].password
    ) {
      createCookies(userArr[i].id);
      return;
    }
  }
  // if not correct ==> show error message
  invalid.setAttribute(
    "style",
    "display:block;text-align:center; color: red; font-weight: bold; margin-top:15px"
  );
  // hide error message when user try to edit useranme
  userName.addEventListener("focus", function () {
    invalid.setAttribute("style", "display:none");
  });
  // hide error message when user try to edit password

  password.addEventListener("focus", function () {
    invalid.setAttribute("style", "display:none");
  });
}

singINBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginChecker();
});

///////   3- create account form validation and set cookies if user sign up successfully
// getting fullname/ username/ and pass from new user

const fullname = document.getElementById("fullName");
const registerUserName = document.getElementById("registerUserName");
const registerPass = document.getElementById("registerPassword");
const createAccountBtn = document.querySelector("input#signUp");

// notifying the new user that the password is invalid
const invalidPass = document.getElementById("invalidPass");

const userNameErrorMsg = document.getElementById("invalidUserName");

const invalidFullName = document.getElementById("invalidFullName");
// regexp that checks validation of user's fullname and password
const expName = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
const expPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gi;
const expUsername = /^[a-zA-Z][a-zA-Z0-9_-]{3,}$/;

//checking if the full name is valid, checking if the password is valid , checking the username is available
var validFullname = false;
var validPass = false;
var validUSerName = false;
//checking if the full name is valid
fullname.addEventListener("focusout", () => {
  validFullname = expName.test(fullname.value);
  if (!validFullname) {
    // if not ==> show error
    invalidFullName.setAttribute(
      "style",
      "display:block;text-align:center; color: red; font-weight: bold; padding-bottom:5px"
    );
  }
});

// hide error when focusin
fullname.addEventListener("focusin", () => {
  invalidFullName.setAttribute("style", "display:none;");
});
//checking if the password  is valid
registerPass.addEventListener("focusout", () => {
  validPass = expPass.test(registerPass.value);
  // if not ==> show error
  if (!validPass) {
    invalidPass.setAttribute(
      "style",
      "display:block;text-align:center; color: red; font-weight: bold; padding-bottom:5px"
    );
  }
});
// hide error when focusin
registerPass.addEventListener("focusin", () => {
  invalidPass.setAttribute("style", "display:none;");
});

//checking if the password  is valid
registerUserName.addEventListener("focusout", () => {
  const verifyUserName = expUsername.test(registerUserName.value);
  for (var i = 0; i < userArr.length; i++) {
    //checking if the password  is available or not
    userNameErrorMsg.innerHTML = "Already used, try another user name";

    if (registerUserName.value === userArr[i].username) {
      // if not ==> show error
      userNameErrorMsg.setAttribute(
        "style",
        "display:block;text-align:center; color: red; font-weight: bold; padding-bottom:5px"
      );
      validUSerName = false;

      return;
    }
  }
  if (!verifyUserName) {
    // show error if username invalid format
    userNameErrorMsg.innerHTML = "invalid username format";
    userNameErrorMsg.setAttribute(
      "style",
      "display:block;text-align:center; color: red; font-weight: bold; padding-bottom:5px"
    );
    validUSerName = false;

    return;
  }
  validUSerName = true;
});
// hide error when focusin
registerUserName.addEventListener("focusin", () => {
  userNameErrorMsg.setAttribute("style", "display:none;");
});
const counter = getData("counter");
function valid() {
  if (validFullname && validPass && validUSerName) {
    counter.userCount++;
    var newUser = {
      id: "user_" + counter.userCount,
      fullName: fullname.value,
      username: registerUserName.value,
      password: registerPass.value,
      avatar: "",
      bio: "",
      following: [],
      followers: [],
      retweet: [],
    };
    // send user data and counter to local storage
    setData(newUser.id, newUser);
    setData("counter", counter);
    // set cookies and redirect user to home page
    setCookie("userID", newUser.id, 7);
    setCookie("username", newUser.username, 7);
    setCookie("password", newUser.password, 7);
    window.location.href = "/home.html";
  } else {
    alert("you should write a valid inputs");
  }
}

createAccountBtn.addEventListener("click", (e) => {
  e.preventDefault();
  valid();
});
