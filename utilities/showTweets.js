// function to show tweet block to the site to prevent repeating code
const showTweets = (
  tweetId, // tweet id
  userID, // ID for tweet author
  currentUserID, // curent user id
  avatar, // user avatar
  fullName, // user full name
  userName, // username
  text, // tweet content
  comment, // array of comments
  retweet, // array of retweets
  like // array of likes
) => {
  if (!avatar) {
    avatar = "./img/avatar.png";
  }
  const tweet = `<div class="tweet-wrapper" data-tweetid='${tweetId}'>
  <img src="${avatar}" alt="user avatar" class="user-avatar" data-userid='${userID}'/>
  <div class="tweet-container">
    <div class="tweet-header">
      <h4 class="user-fullname" data-userid='${userID}'>${fullName}</h4>
      <span class="user-name">@${userName}</span>
      <i data-tweetid='${tweetId}' class="fa-solid fa-pen-to-square ${
    userID === currentUserID ? "edit" : ""
  }"></i>
      <i data-tweetid='${tweetId}' class="fa-solid fa-trash ${
    userID === currentUserID ? "trash" : ""
  }"></i>
    </div>
    <div class="tweet-content" data-tweetid='${tweetId}'>${text}</div>
    <div class="tweet-footer">
      <i class="fa-regular fa-comment comment" data-tweetid='${tweetId}'><span>${
    comment.length
  }</span></i>
     <!-- <i class="fa-solid fa-retweet retweet" data-tweetid='${tweetId}'><span>${
    retweet.length
  }</span></i> -->
      <i class="fa-regular fa-heart like" data-tweetid='${tweetId}'><span>${
    like.length
  }</span></i>
      <!-- <i class="fa-solid fa-upload"><span></span></i> -->
    </div>
  </div>
</div>`;
  return tweet;
};
// export the function to use it at  any page
export default showTweets;
