/*
1- show tweets in Home page
2- write a tweet and send it to local storage
*/
"use strict";
import { setData, getAllData, getData } from "../utilities/localStorage.js";
import showTweets from "../utilities/showTweets.js";
import { currentUser } from "./general.js";
/////// 1- show tweets in Home page
const tweetArr = getAllData("tweet");
const tweetsContainer = document.querySelector(".tweets-mainContainer");
tweetArr.forEach((tweet) => {
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
  tweetsContainer.innerHTML += html;
});

////////// 2- write a tweet and send it to local storage
// to send a tweet to local storage we need to create object with specific keys (id, author, text, comment array, retweet array, like array, parent )

const tweetContent = document.querySelector("#writeTweet");
const submitBtn = document.querySelector("#tweedAdd");

const tweetWrite = () => {
  // get counter from local storage to set tweet id as a unique value
  const counter = getData("counter");
  counter.tweetCount++;
  // get tweet text
  const tweetText = tweetContent.value;
  // user must write something to tweet
  if (tweetText.length < 1) {
    alert("You should write something to tweet!!");
    return;
  }
  // tweet object to send to local storage
  const tweet = {
    id: "tweet_" + counter.tweetCount,
    author: currentUser.id,
    text: tweetText,
    comment: [],
    retweet: [],
    like: [],
    parent: "",
  };
  // send tweet and new counter to local storage
  setData("counter", counter);
  setData(tweet.id, tweet);
  window.location.reload();
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  tweetWrite();
});
