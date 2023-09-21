//&Cookies Library

//?Set Cookie Function
export function setCookie(cookiename, cookieval, expdays) {
  if (expdays) {
    var date = new Date();
    date.setTime(date.getTime() + expdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + date.toUTCString();
    document.cookie =
      encodeURIComponent(cookiename) +
      "=" +
      encodeURIComponent(cookieval) +
      ";" +
      expires; //persistant cookie
  } else {
    document.cookie =
      encodeURIComponent(cookiename) + "=" + encodeURIComponent(cookieval); //session cookie
  }
}

//?Get Cookie Function
export function allCookiesList() {
  var cookiesArr = []; // an empty array for pushing on it keys and values
  var cookies = document.cookie.split(";"); //array for spliting cookies at semicolon , cookies is not collection like images[] and forms[]
  for (
    var i = 0;
    i < cookies.length;
    i++ //this loop for pushing cookies into cookies array by spliting before and after assignment operator
  ) {
    var key = cookies[i].split("=")[0].trim();
    var value = cookies[i].split("=")[1];
    cookiesArr[key] = value;
  }
  return cookiesArr;
}

//?Get All Cookies List Function
export function getCookie(cookiename) {
  //as the previous function but with (cookiename) parameter to return one by name
  var cookiesArr = allCookiesList();
  return cookiesArr[cookiename]; //return from array after we pushed on it all cookies the wanted cookie by its name
}

//?Delete Cookie Function
export function deleteCookie(cookiename, cookieval, expdays) {
  //as setcookie function but with subtraction of time
  if (expdays) {
    var date = new Date();
    date.setTime(date.getTime() - expdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + date.toUTCString();
    document.cookie =
      encodeURIComponent(cookiename) +
      "=" +
      encodeURIComponent(cookieval) +
      ";" +
      expires; //persistant cookie
  } else {
    document.cookie =
      encodeURIComponent(cookiename) + "=" + encodeURIComponent(cookieval); //session cookie
  }
}

//?Has Cookie Function
export function hasCookie(cookiename) {
  if (getCookie(cookiename) != undefined) {
    return true;
  } else {
    return false;
  }
}
