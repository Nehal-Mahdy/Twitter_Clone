/*
1- get current user from cookies
2- show current user data (avatar, full name, username)
3- show only five users to follow in right sidebar
4- edit current tweet
5- remove current tweet
6- visit user profile when clicking on user full name or user avatar
7- follow users and push them to current user following array then add current user tothe user followers array who current user follow
8- unfollow users and remove thee from current user followers array then remove current user from the user followers array  who current user unfollow
9- visit tweet page when clicking on tweet content then current user can comment on it
10- like a tweet and if user clicked again like will undo
11 - activate back button to visit the previous page
12- logout and redirect user to login page

*/
"use strict";
import getPageHtml from "../utilities/getPageHtml.js";
import { setData, getAllData, getData } from "../utilities/localStorage.js";
import { getCookie, deleteCookie } from "../utilities/cookies.js";
import showUsers from "../utilities/showUsers.js";
// fetch the header section and show it in the page
const headerContainer = document.querySelector("#headerContainer");
headerContainer.innerHTML = await getPageHtml("./utilities/header.html");

// fetch the right sidebar section and show it in the page
const sideBarContainer = document.querySelector("#sideBarContainer");
sideBarContainer.innerHTML = await getPageHtml("./utilities/sidebar.html");

////////     1- get current user from cookies

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

// current user object data
// this is the important line in the code
export const currentUser = getData(cookieUser.id);
if (
  !(
    currentUser &&
    cookieUser.username === currentUser.username &&
    cookieUser.password === currentUser.password
  )
) {
  window.location.href = "/";
}

////////   2- show current user data (avatar, full name, username)

const userAvatar = document.querySelectorAll(".current-user-img");
const userFullName = document.querySelectorAll(".current-user-name");
const userName = document.querySelectorAll(".current-user-username");

userAvatar.forEach((img) => {
  currentUser.avatar
    ? (img.src = currentUser.avatar)
    : (img.src = "./img/avatar.png");
});
userFullName.forEach((fullName) => {
  fullName.textContent = currentUser.fullName;
});
userName.forEach((userName) => {
  userName.textContent = "@" + currentUser.username;
});

////////  3- show only five users to follow in right sidebar

// show users to follow in right sidebar

const followUserContainer = document.querySelector(".follow-user-list");
const allUsers = getAllData("user"); // get all users from local storage
const usersWithoutCurrent = allUsers.filter(
  //remove the current user from the list and current user following too
  (u) => u.id !== currentUser.id && !currentUser.following.includes(u.id)
);
// show maximum five user to follow
for (let i = 0; i < 5; i++) {
  // to prevent error if usersWithoutCurrent less than five users
  if (!usersWithoutCurrent[i]) continue;
  const userItem = showUsers(
    usersWithoutCurrent[i].avatar,
    usersWithoutCurrent[i].id,
    usersWithoutCurrent[i].fullName,
    usersWithoutCurrent[i].username,
    "followBtn",
    "Follow"
  );
  followUserContainer.innerHTML += userItem;
}

// Users can edit thier own tweets only
// setTimeOut to wait until tweets showing on browser
setTimeout(() => {
  const editTweetBtns = document.querySelectorAll(".tweet-header .edit");
  const removeTweetBtns = document.querySelectorAll(".tweet-header .trash");
  // check if there is any tweet for the current user or not
  // to avoid error if there is no tweets
  if (editTweetBtns.length) {
    tweetEditor();
  }
  if (removeTweetBtns.length) {
    tweetRemove();
  }
}, 0);

//////////// 4- edit current tweet

const tweetEditor = () => {
  // fetch all edit buttons and make a loop for them
  // if it clicked then show pop up to edit the tweet
  // if user click outside the pop up or click on exit button ==> pop up will hide again
  const editTweetBtns = document.querySelectorAll(".tweet-header .edit");
  const background = document.getElementById("overlay-background");
  const exitBtn = document.querySelector("#tweetEdit .exit-icon");
  editTweetBtns.forEach((edit) => {
    edit.addEventListener("click", () => {
      showEditor(edit);
    });
    background.addEventListener("click", hideEditor);
    exitBtn.addEventListener("click", hideEditor);
  });
};
// function to show popup where edit the tweet
const showEditor = (edit) => {
  const currentTweet = getData(edit.dataset.tweetid);
  const background = document.getElementById("overlay-background");
  const editorForm = document.getElementById("tweetEdit");
  background.setAttribute("style", "display:block;");
  editorForm.setAttribute("style", "display:block;");
  editCurrentTweet(currentTweet);
};
// function to edit the tweet content
const editCurrentTweet = (tweet) => {
  const tweetTextUpdate = document.querySelector("#tweetEdit #writeTweet");
  const tweetUpdateBtn = document.querySelector("#tweetEdit .tweetSubmit");
  // show tweet text in the form to edit it
  tweetTextUpdate.value = tweet.text;
  tweetUpdateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // update tweet text and send it to local storage
    tweet.text = tweetTextUpdate.value;
    setData(tweet.id, tweet);
    hideEditor();
    location.reload();
  });
};
// function to hide popup where edit the tweet
const hideEditor = () => {
  const background = document.getElementById("overlay-background");
  const editorForm = document.getElementById("tweetEdit");
  background.setAttribute("style", "display:none;");
  editorForm.setAttribute("style", "display:none;");
};

//////////////// 5- remove current tweet
const tweetRemove = () => {
  const removeTweetBtns = document.querySelectorAll(".tweet-header .trash");
  removeTweetBtns.forEach((trash) => {
    trash.addEventListener("click", () => {
      const tweetID = trash.dataset.tweetid;
      // check if this tweet has a perant tweet or not
      // if yes ===> remove tweet id from parent tweet comment array
      const tweetObj = getData(tweetID);
      if (tweetObj.parent) {
        const parentTweet = getData(tweetObj.parent);
        // remove current tweet id from parent comment array
        parentTweet.comment.splice(parentTweet.comment.indexOf(tweetID), 1);
        setData(parentTweet.id, parentTweet);
      }
      // remove tweet from local storage
      localStorage.removeItem(tweetID);
      window.location.reload();
    });
  });
};

///////////  6- visit user profile when clicking on user full name or user avatar
// setTimeOut to wait until tweets showing on browser
setTimeout(() => {
  const userFullNameArr = document.querySelectorAll(".user-fullname");
  // check if there is any user showing on browser or not
  // to avoid error if there is no tweets
  if (userFullNameArr.length) {
    visitUserProfile();
  }
}, 0);

export const visitUserProfile = () => {
  const userFullNameArr = document.querySelectorAll(".user-fullname");
  const userAvatarArr = document.querySelectorAll(".user-avatar");

  // Loop for  all users full name
  userFullNameArr.forEach((fullname) => {
    // get current origin
    const currenOrigin = window.location.origin;
    fullname.addEventListener("click", () => {
      // check if current user clicks on his name or not
      if (currentUser.id === fullname.dataset.userid) {
        // if yes don't show ?user_id in url
        window.location.href = currenOrigin + "/user.html";
      } else {
        // if not send clicked userId in url
        window.location.href =
          currenOrigin + "/user.html?" + fullname.dataset.userid;
      }
    });
  });
  userAvatarArr.forEach((avatar) => {
    avatar.addEventListener("click", () => {
      const currenOrigin = window.location.origin;

      // check if current user clicks on his avatar or not
      if (currentUser.id === avatar.dataset.userid) {
        // if yes don't show ?user_id in url
        window.location.href = currenOrigin + "/user.html";
      } else {
        // if not send clicked userId in url
        window.location.href =
          currenOrigin + "/user.html?" + avatar.dataset.userid;
      }
    });
  });
};

////////     7- follow users and push them to current user following array then add current user tothe user followers array who current user follow
setTimeout(() => {
  const followBtns = document.querySelectorAll(".followBtn");
  // check if there is any user to follow showing on browser or not
  // to avoid error if there is no users
  if (followBtns.length) {
    followUserFunc();
  }
}, 0);
const followUserFunc = () => {
  // get all follow buttons and make a loop on it
  const followBtns = document.querySelectorAll(".followBtn");
  followBtns.forEach((follow) => {
    follow.addEventListener("click", () => {
      // when click on any follow button run followUser function
      followUser(follow);
    });
  });
};
const followUser = (follow) => {
  // get user id from follow button to know which user i will follow
  const userID = follow.dataset.userid;

  // add user id to current user following array
  currentUser.following.push(userID);
  const userToFollow = getData(userID);
  // add current user id to  user (i will follow) followers array

  userToFollow.followers.push(currentUser.id);
  // send updated data to local storage
  setData(currentUser.id, currentUser);
  setData(userID, userToFollow);
  // reload the page to show updated data
  window.location.reload();
};
//////// 8- unfollow users and remove thee from current user followers array then remove current user from the user followers array  who current user unfollow

setTimeout(() => {
  const unFollowBtns = document.querySelectorAll(".followingBtn");
  // check if there is any user to unfollow showing on browser or not
  // to avoid error if there is no users
  if (unFollowBtns.length) {
    unfollowUserFunc();
  }
}, 0);

const unfollowUserFunc = () => {
  const followingBtns = document.querySelectorAll(".followingBtn");
  followingBtns.forEach((following) => {
    following.addEventListener("mouseover", () => {
      unfollowUser(following);
    });
    //back to original color and text when mouse out
    following.addEventListener("mouseout", () => {
      following.textContent = "Following";
      following.style.backgroundColor = "rgb(15,20,25)";
    });
  });
};
const unfollowUser = (following) => {
  // change color and text when mouse over
  following.textContent = "Unfollow";
  following.style.backgroundColor = "darkRed";
  following.addEventListener("click", () => {
    // get user id from following button to know which user i will unfollow
    const userID = following.dataset.userid;
    // remove user id from current user following array
    currentUser.following.splice(currentUser.following.indexOf(userID), 1);
    const userToUnFollow = getData(userID);
    // remove current user id from  user (i will unfollow) followers array
    userToUnFollow.followers.splice(
      userToUnFollow.followers.indexOf(currentUser.id),
      1
    );
    // send updated data to local storage
    setData(currentUser.id, currentUser);
    setData(userID, userToUnFollow);
    // reload the page to show updated data
    window.location.reload();
  });
};

//////// 9- visit tweet page when clicking on tweet content then current user can comment on it
setTimeout(() => {
  const tweetTextArr = document.querySelectorAll(".tweet-content");
  // check if there is any tweets showing on browser or not
  // to avoid error if there is no tweets
  if (tweetTextArr.length) {
    visitTweetPage();
    likeTweetsFunc();
  }
}, 0);
export const visitTweetPage = () => {
  const currenOrigin = window.location.origin;
  //loop on all tweets showing on browser
  const tweetTextArr = document.querySelectorAll(".tweet-content");
  const tweetCommentBtns = document.querySelectorAll(".tweet-footer .comment");
  tweetTextArr.forEach((text) => {
    text.addEventListener("click", () => {
      // when clicking on any tweet redirect user to tweet page with clicked tweet ID on url
      window.location.href =
        currenOrigin + "/tweet.html?" + text.dataset.tweetid;
    });
  });
  tweetCommentBtns.forEach((commentBtn) => {
    commentBtn.addEventListener("click", () => {
      window.location.href =
        currenOrigin + "/tweet.html?" + commentBtn.dataset.tweetid;
    });
  });
};

/////////////  10- like a tweet and if user clicked again like will undo
export const likeTweetsFunc = () => {
  //get array for all like buttons
  const tweetLikeBtns = document.querySelectorAll(".tweet-footer .like");
  tweetLikeBtns.forEach((like) => {
    let tweetToLike = getData(like.dataset.tweetid);
    //check if the current user likes the tweet or not
    // if he liked ==> make color red
    if (tweetToLike.like.includes(currentUser.id)) {
      like.style.color = "red";
    }
    like.addEventListener("click", () => {
      tweetToLike = getData(like.dataset.tweetid);
      // after clicking like button ==> check if the current user founded in current tweet.like array
      if (tweetToLike.like.includes(currentUser.id)) {
        likeChecker(like, true);
      } else {
        likeChecker(like, false);
      }
    });
  });
};
const likeChecker = (like, isLike) => {
  //get span element for current tweet to update numbers of likes
  const likeCounter = document.querySelector(
    `.like[data-tweetid="${like.dataset.tweetid}"] span`
  );
  // get current tweet
  const tweetToLike = getData(like.dataset.tweetid);
  // if user already liked the tweet and clicked on like button
  if (isLike) {
    // make color black and decrese number of likes
    like.style.color = "black";
    likeCounter.innerHTML = `${Number(likeCounter.innerHTML) - 1}`;
    // and remove current user id from tweet.like array
    const updateTweetLikes = tweetToLike.like.filter(
      (e) => e !== currentUser.id
    );
    tweetToLike.like = updateTweetLikes;
    // then send updated tweet to local storage
    setData(like.dataset.tweetid, tweetToLike);
  } else {
    // if user clicked on tweet that he didn't like it
    // make color red and increase number of likes
    like.style.color = "red";
    likeCounter.innerHTML = `${Number(likeCounter.innerHTML) + 1}`;
    // add current user id to tweet.like array
    tweetToLike.like.push(currentUser.id);
    // then send updated tweet to local storage
    setData(like.dataset.tweetid, tweetToLike);
  }
};

///////  11 - activate back button to visit the previous page
setTimeout(() => {
  const backBtns = document.querySelectorAll(".page-title .back");
  // check if there is any back button showing on browser or not
  // to avoid error if there is no tweets
  if (backBtns.length) {
    backPage();
  }
}, 0);
const backPage = () => {
  const backBtns = document.querySelectorAll(".page-title .back");
  backBtns.forEach((back) => {
    back.addEventListener("click", () => {
      history.back();
    });
  });
};

/////// 12- logout and redirect user to login page
const signOut = document.querySelector(".sign-out");
signOut.addEventListener("click", () => {
  deleteCookie("userID", cookieUser.id, 10);
  deleteCookie("username", cookieUser.username, 10);
  deleteCookie("password", cookieUser.password, 10);
  window.location.href = "/";
});
