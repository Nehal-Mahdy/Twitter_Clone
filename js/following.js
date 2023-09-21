/*
1- check the page show current user following or any other user following
2- show user following list and page title
*/
"use strict";
import { getData } from "../utilities/localStorage.js";
import { currentUser } from "./general.js";
import showUsers from "../utilities/showUsers.js";
const pageTitle = document.querySelector(".page-title h3");
const followingContainer = document.querySelector(".user-following-container");
//////////// 1- check the page show current user following or any other user following
let user = {};
const search = window.location.search;
// check if url contains user ID or not
// if contains user id ===> the page will show this user data
// if not ===> page will show current user data
if (search) {
  const userId = search.split("?")[1];
  user = getData(userId);
} else {
  user = currentUser;
}

///////// 2- show user following list and page title
pageTitle.textContent = user.fullName + " following";

user.following.forEach((id) => {
  let btnClass = "followBtn";
  let btnText = "Follow";
  // check if current user follow this user or not
  if (currentUser.following.includes(id)) {
    btnClass = "followingBtn";
    btnText = "Following";
  }
  // check if the current user showing in the list
  if (currentUser.id === id) {
    btnClass = "";
    btnText = "Edit Profile";
  }
  const u = getData(id);
  const data = showUsers(
    u.avatar,
    u.id,
    u.fullName,
    u.username,
    btnClass,
    btnText
  );
  followingContainer.innerHTML += data;
});
