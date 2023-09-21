/*
1- show current tweet using tweet ID from url
2- current user can write a reply and send this tweet reply to local storage
3- show tweet reply bellow the parent tweet
*/

"use strict";
import { currentUser } from "./general.js";
import showTweets from "../utilities/showTweets.js";
import { getData, setData, getAllData } from "../utilities/localStorage.js";
let tweet;
const currenOrigin = window.location.origin;
const search = window.location.search;
if (search) {
  const tweetid = search.split("?")[1];
  tweet = getData(tweetid);
  if (!tweet) {
    // if tweet id is wrong ==> redirect to home page
    location.href = currenOrigin + "/home.html";
  }
} else {
  // if there is no tweet id ==> redirect to home page
  location.href = currenOrigin + "/home.html";
}
/////////// 1- show current tweet using tweet ID from url
const author = getData(tweet.author);
const tweetContainer = document.querySelector(".current-tweet");
const tweetHtml = showTweets(
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
tweetContainer.innerHTML = tweetHtml;

//////////// 2- current user can write a reply and send this tweet reply to local storage
// to send a reply to local storage we need to create object with specific keys (id, author, text, comment array, retweet array, like array, parent )

const replyContent = document.querySelector("#writeReply");
const submitBtn = document.querySelector("#replySubmit");

const tweetReply = () => {
  // get counter from local storage to set tweet id as a unique value
  const counter = getData("counter");
  counter.tweetCount++;
  // get reply text
  const replyText = replyContent.value;
  // user must write something to tweet
  if (replyText.length < 1) {
    alert("You should write something to tweet!!");
    return;
  }
  // create reply object to send to local storage
  const reply = {
    id: "tweet_" + counter.tweetCount,
    author: currentUser.id,
    text: replyText,
    comment: [],
    retweet: [],
    like: [],
    parent: tweet.id, // we link current tweet as a parent to this reply
  };
  // send tweet and new counter to local storage
  setData("counter", counter);
  setData(reply.id, reply);
  // add reply id to tweet comment array
  tweet.comment.push(reply.id);
  // send tweet updated data to local storage
  setData(tweet.id, tweet);
  window.location.reload();
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  tweetReply();
});

////////////  3- show tweet reply bellow
const replyContainer = document.querySelector(".tweet-reply-container");
// get all tweets fro mlocal storage
const allTweets = getAllData("tweet");
// filter them to get only tweets with parent id === current tweet id
const tweetReplyArr = allTweets.filter((t) => t.parent === tweet.id);
tweetReplyArr.forEach((reply) => {
  // get author reply from local storage
  const author = getData(reply.author);
  const html = showTweets(
    reply.id,
    reply.author,
    currentUser.id,
    author.avatar,
    author.fullName,
    author.username,
    reply.text,
    reply.comment,
    reply.retweet,
    reply.like
  );
  // show reply on tweet page
  replyContainer.innerHTML += html;
});
