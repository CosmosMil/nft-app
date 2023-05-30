
const checkForToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("There is a token");
    return token
  } else {
    console.log("There is no token");
   return null
  }
};

export default checkForToken
