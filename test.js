// const user = {
//   id,
//   fullname,
//   username,
//   password,
//   avatar,
//   bio,
//   following,
//   followers,
// };

// const tweet = {
//  id,
//   author,
//   content,
//   Comment,
//   retweet,
//   like,
//   parent,
// };
import { setData } from "./utilities/localStorage.js";
const userArr = [
  {
    id: "user_0",
    fullName: "Mariem Hady",
    username: "mariemhady",
    password: "mariem12345",
    avatar: "./img/mariem.jpg",
    bio: "Supervisor ITI",
    following: ["user_1", "user_5"],
    followers: ["user_2", "user_4", "user_7"],
    retweet: [],
  },
  {
    id: "user_1",
    fullName: "Nehal Hassan",
    username: "nehal_hassan",
    password: "nehal12345",
    avatar: "",
    bio: "ITI student G3",
    following: ["user_6", "user_8", "user_9"],
    followers: ["user_0", "user_2", "user_4", "user_7"],
    retweet: [],
  },
  {
    id: "user_2",
    fullName: "Ahmed Shaaban",
    username: "ahmedshaaban",
    password: "shaaban12345",
    avatar: "./img/shaaban.jpg",
    bio: "ITI student G3",
    following: ["user_0", "user_1"],
    followers: ["user_3"],
    retweet: [],
  },
  {
    id: "user_3",
    fullName: "Fady Gamil",
    username: "fadygamil",
    password: "fady12345",
    avatar: "./img/fady.jpg",
    bio: "ITI student G3",
    following: ["user_4"],
    followers: [],
    retweet: [],
  },
  {
    id: "user_4",
    fullName: "Dina Emad",
    username: "dinaemad",
    password: "dina123456",
    avatar: "",
    bio: "",
    following: ["user_0", "user_1"],
    followers: ["user_3"],
    retweet: [],
  },
  {
    id: "user_5",
    fullName: "Ibrahim Sobhy",
    username: "ibrahimsobhy",
    password: "ibrahim12345",
    avatar: "./img/ibrahim.jpg",
    bio: "",
    following: ["user_6"],
    followers: ["user_0"],
    retweet: [],
  },
  {
    id: "user_6",
    fullName: "Abanoub Samy",
    username: "abanoubsamy",
    password: "abanoub12345",
    avatar: "",
    bio: "I'm a student in ITI now!",
    following: ["user_7"],
    followers: ["user_1", "user_5"],
    retweet: [],
  },
  {
    id: "user_7",
    fullName: "Hussain Mohamed",
    username: "hussainmohamed",
    password: "hussain12345",
    avatar: "",
    bio: "",
    following: ["user_0", "user_1"],
    followers: ["user_6", "user_8"],
    retweet: [],
  },
  {
    id: "user_8",
    fullName: "Khaled Gomaa",
    username: "khaled_gomaa",
    password: "khaled12345",
    avatar: "./img/khaled.jpg",
    bio: "",
    following: ["user_7"],
    followers: ["user_1", "user_9"],
    retweet: [],
  },
  {
    id: "user_9",
    fullName: "Rawan Ramadan",
    username: "rawan_ramadan",
    password: "rawan12345",
    avatar: "",
    bio: "",
    following: ["user_8"],
    followers: ["user_1"],
    retweet: [],
  },
];

const tweetArr = [
  {
    id: "tweet_0",
    author: "user_0",
    text: "It was another great opportunity to introduce learners in the #ALXIntroToSWE program to Object Oriented Programming",
    comment: [],
    retweet: [],
    like: [],
    parent: "",
  },
  {
    id: "tweet_1",
    author: "user_2",
    text: "You don't have to be a genius to code, but you do have to be willing to learn and put in the effort. The journey is worth it.",
    comment: [],
    retweet: [],
    like: [],
    parent: "",
  },
  {
    id: "tweet_2",
    author: "user_0",
    text: "If anyone would know about aliens, it probably would be me",
    comment: [],
    retweet: [],
    like: [],
    parent: "",
  },
  {
    id: "tweet_3",
    author: "user_3",
    text: "Learning is a treasure that will follow its owner everywhere. - Chinese Proverb. ",
    comment: [],
    retweet: [],
    like: [],
    parent: "",
  },
  {
    id: "tweet_4",
    author: "user_6",
    text: "What are your honest thoughts on Twitter rebranding to 𝕏?",
    comment: [],
    retweet: [],
    like: [],
    parent: "",
  },
];
const counter = { userCount: 0, tweetCount: 0 };

userArr.forEach((user) => {
  setData("user_" + counter.userCount, user);
  counter.userCount++;
});
tweetArr.forEach((tweet) => {
  setData("tweet_" + counter.tweetCount, tweet);
  counter.tweetCount++;
});
counter.tweetCount--;
counter.userCount--;
setData("counter", counter);

