// function to show user block to the site to prevent repeating code
const showUsers = (
  avatar, // user avatar
  id, // user id
  fullName, // full name
  userName, // user name
  btnClass, // button class will be *followingBtn* (for following) || *followBtn* (for follow)
  btnText // button text it will be Follow or Following
) => {
  if (!avatar) {
    avatar = "./img/avatar.png";
  }
  const user = `<div class="userContainer" data-userid= '${id}'>
  <div class="user-info" data-userid= '${id}'>
    <img src="${avatar}" alt="user avatar" class="user-avatar"  data-userid= '${id}'/>
    <div class="user">
      <h4 class="user-fullname" data-userid= '${id}'>${fullName}</h4>
      <h5 class="user-name">@${userName}</h5>
    </div>
  </div>
  <button class="follow-ing-btn ${btnClass}"  data-userid= '${id}'>${btnText}</button>
</div>`;
  return user;
};
// export the function to use it at  any page
export default showUsers;
