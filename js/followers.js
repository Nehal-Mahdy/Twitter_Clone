/*
1- check the page show current user followers or any other user followers
2- show user followers list and page title
*/
"use strict";
import { getData } from "../utilities/localStorage.js";
import { currentUser } from "./general.js";
import showUsers from "../utilities/showUsers.js";
const pageTitle = document.querySelector(".page-title h3");
const followersContainer = document.querySelector(".user-follower-container");
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

///////// 2- show user followers list and page title
pageTitle.textContent = user.fullName + " followers";

user.followers.forEach((id) => {
  let btnClass = "followBtn";
  let btnText = "Follow";
  // check if current user follow this user or not
  if (currentUser.following.includes(id)) {
    btnClass = "followingBtn";
    btnText = "Following";
    // check if the current user showing in the list
  } else if (currentUser.id === id) {
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
  followersContainer.innerHTML += data;
});
