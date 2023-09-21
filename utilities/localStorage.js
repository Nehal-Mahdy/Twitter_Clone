// get data from local storage
export const getData = (key) => {
  const storedData = localStorage.getItem(key);
  const data = JSON.parse(storedData);
  return data;
};

// send data to local storage
export const setData = (key, data) => {
  const updatedData = JSON.stringify(data);
  localStorage.setItem(key, updatedData);
};

// get all data like (all users) or (all tweets)
// for all users ==> getAllData('user')
// for all tweets ==> getAllData('tweet')
export const getAllData = (type) => {
  const data = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(type)) {
      const item = JSON.parse(localStorage.getItem(key));
      data.push(item);
    }
  }
  return data;
};
