/* 
1- get search input 
*/
"use strict";
import { getAllData, getData } from "../utilities/localStorage.js";
import showUsers from "../utilities/showUsers.js";
import showTweets from "../utilities/showTweets.js";
import {
  currentUser,
  visitUserProfile,
  visitTweetPage,
  likeTweetsFunc,
} from "./general.js";
const searchText = document.querySelector(".search-header input");
const searchBtn = document.querySelector(".search-header .search");
const showUsersBtn = document.querySelector(".search-select #users");
const showUTweetsBtn = document.querySelector(".search-select #Tweets");
const searchResultContainer = document.querySelector(".search-result");
// get all users and tweets from local storage
const usersArr = getAllData("user");
const tweetsArr = getAllData("tweet");
let searchTweetResult = []; // array to store tweets that match the search
let searchUserResult = []; // array to store users that match the search
let uniqueTweets = []; // array to store unique tweets that match the search ==> remove duplicates
let uniqueUsers = []; // array to store unique users that match the search ==> remove duplicates

searchText.value = ""; // to clear search input on page load
searchBtn.addEventListener("click", () => {
  searchTweetResult = []; // array to store tweets that match the search
  searchUserResult = []; // array to store users that match the search
  uniqueTweets = []; // array to store unique tweets that match the search ==> remove duplicates
  uniqueUsers = [];
  searchResultContainer.innerHTML = "";
  // convert search text to lowercase array
  // to loop on every word and check if this word found at any array or user
  const searchArr = searchText.value.toLowerCase().split(" ");
  searchArr.forEach((word) => {
    checkTweets(word);
    checkUsers(word);
  });
  removeDuplicatesTweets(searchTweetResult);
  removeDuplicatesUsers(searchUserResult);
  // check users button to show users result first
  showUsersBtn.checked = true;
  if (showUsersBtn.checked) {
    usersResult();
  }
});
//  check which tweet that match the search
const checkTweets = (word) => {
  tweetsArr.forEach((tweet) => {
    const author = getData(tweet.author);
    if (
      author.fullName.toLowerCase().includes(word) ||
      author.username.toLowerCase().includes(word) ||
      author.bio.toLowerCase().includes(word) ||
      tweet.text.toLowerCase().includes(word)
    ) {
      searchTweetResult.push(tweet);
    }
  });
};
//  check which user that match the search
const checkUsers = (word) => {
  usersArr.forEach((user) => {
    if (
      user.fullName.toLowerCase().includes(word) ||
      user.username.toLowerCase().includes(word) ||
      user.bio.toLowerCase().includes(word)
    ) {
      searchUserResult.push(user);
    }
  });
};
//  remove duplicated tweets
const removeDuplicatesTweets = (tweets) => {
  tweets.forEach((tweet) => {
    if (!uniqueTweets.includes(tweet)) {
      uniqueTweets.push(tweet);
    }
  });
};
//  remove duplicated tweets
const removeDuplicatesUsers = (users) => {
  users.forEach((user) => {
    if (!uniqueUsers.includes(user)) {
      uniqueUsers.push(user);
    }
  });
};

// show users in search result container
const usersResult = () => {
  searchResultContainer.innerHTML = "";
  // if there is no users match the search ===> show error message
  if (!uniqueUsers.length) {
    searchResultContainer.style.paddingLeft = "20px";
    searchResultContainer.innerHTML =
      "<h3>no result found, try another search</h3>";
  } else {
    searchResultContainer.innerHTML = "";
    uniqueUsers.forEach((user) => {
      let btnClass = "followBtn";
      let btnText = "Follow";
      // check if current user follow this user or not
      if (currentUser.following.includes(user.id)) {
        btnClass = "followingBtn";
        btnText = "Following";
        // check if the current user showing in the list
      } else if (currentUser.id === user.id) {
        btnClass = "";
        btnText = "Edit Profile";
      }
      const data = showUsers(
        user.avatar,
        user.id,
        user.fullName,
        user.username,
        btnClass,
        btnText
      );
      searchResultContainer.innerHTML += data;
    });
    // run this function to be able to visit any user profile from search result
    visitUserProfile();
  }
};
// show tweets in search result container

const tweetResult = () => {
  searchResultContainer.innerHTML = "";
  // if there is no tweets match the search ===> show error message

  if (!uniqueTweets.length) {
    searchResultContainer.style.paddingLeft = "20px";
    searchResultContainer.innerHTML =
      "<h3>no result found, try another search</h3>";
  } else {
    searchResultContainer.innerHTML = "";
    uniqueTweets.forEach((tweet) => {
      const author = getData(tweet.author);
      const html = showTweets(
        tweet.id,
        tweet.author,
        currentUser.id,
        author.avatar,
        author.fullName,
        author.username,
        tweet.text,
        tweet.comment,
        tweet.retweet,
        tweet.like
      );
      searchResultContainer.innerHTML += html;
    });
    // run those function to be able to visist any tweet page, author page and like any tweet
    visitTweetPage();
    likeTweetsFunc();
    visitUserProfile();
  }
};

showUTweetsBtn.addEventListener("click", tweetResult);
showUsersBtn.addEventListener("click", usersResult);
