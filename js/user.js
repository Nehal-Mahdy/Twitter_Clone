/*
1- check the page show current user profile or any other profile
2- show user information
3- show user tweets or retweets
4- visit following page and followers page for the user
*/
"use strict";
import { getAllData, getData } from "../utilities/localStorage.js";
import { currentUser } from "./general.js";
import showTweets from "../utilities/showTweets.js";
const profileBtn = document.querySelector(".profile-page-btn");
const userFullName = document.querySelector(".Full-name");
const userUserName = document.querySelector(".user-name");
const userAvatar = document.querySelector(".user-profile-bg .profile-avatar");
const userBio = document.querySelector(".user-bio");
const following = document.querySelector(".following-count");
const followers = document.querySelector(".followers-count");
const pageTitle = document.querySelector(".page-title h2");
const tweetContainer = document.querySelector(".tweets-mainContainer");
const followingBtn = document.querySelector(".user-following");
const followersBtn = document.querySelector(".user-followers");

//////////// 1- check the page show current user profile or any other profile
let user = {};
const currenOrigin = window.location.origin;

const search = window.location.search;
// check if url contains user ID or not
// if contains user id ===> the page will show this user data
// if not ===> page will show current user data
if (search) {
  const userId = search.split("?")[1];
  user = getData(userId);
  // if user id is wrong redirect to home page
  if (!user) {
    location.href = currenOrigin + "/home.html";
  }
  // add userID to the button to link button with user
  profileBtn.setAttribute("data-userid", userId);
  //check if current user followed this user or not
  if (currentUser.following.includes(userId)) {
    profileBtn.textContent = "Following";
    profileBtn.classList.add("followingBtn");
  } else {
    profileBtn.textContent = "Follow";
    profileBtn.classList.add("followBtn");
  }
} else {
  user = currentUser;
  profileBtn.textContent = "Edit Profile";
}
////// 2- show user information

pageTitle.innerHTML = user.fullName + " profile";
userFullName.innerHTML = user.fullName;
userUserName.innerHTML = user.username;
userAvatar.src = user.avatar ? user.avatar : "./img/avatar.png";

userBio.innerHTML = user.bio;
following.innerHTML = user.following.length;
followers.innerHTML = user.followers.length;

////////// 3- show user tweets or retweets

// get all tweets from local storage and show only tweets for the user
const tweetsArr = getAllData("tweet");
tweetsArr.forEach((tweet) => {
  if (user.id === tweet.author) {
    const tweetHtml = showTweets(
      tweet.id,
      tweet.author,
      currentUser.id,
      user.avatar,
      user.fullName,
      user.username,
      tweet.text,
      tweet.comment,
      tweet.retweet,
      tweet.like
    );
    tweetContainer.innerHTML += tweetHtml;
  }
});

///////// 4- visit following page and followers page for the user
if (search) {
  followingBtn.href = "./following.html" + search;
  followersBtn.href = "./followers.html" + search;
}
