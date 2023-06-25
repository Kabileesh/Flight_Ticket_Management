const passport = require("passport");

const logOutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("Logged out successfully");
};

module.exports = logOutUser;