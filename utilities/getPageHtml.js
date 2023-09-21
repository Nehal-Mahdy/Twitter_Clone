// function to get html code from other pages to avoid us duplicating the content
// ex: header and footer
const getPageHtml = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

export default getPageHtml;
