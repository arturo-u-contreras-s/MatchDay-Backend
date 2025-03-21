/*
  Controller for authenticating users using Passport.js.
*/
const passport = require("../../config/passport");

const googleAuthRedirect = passport.authenticate("google", { scope: ["profile", "email"] });

const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) return res.status(500).json({ error: "Authentication failed", details: err });
    if (!user) return res.status(401).json({ error: "User not authenticated" });

    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

      console.log("User logged in:", req.user);
      console.log("Session ID:", req.sessionID);

      return res.json({ message: "Authentication successful" });
    });
  })(req, res, next);
};

const checkUserLoggedIn = (req, res) => {
  console.log('req.session: ', req.session);
  console.log('req.session.passport: ', req.session.passport);
  console.log('req.session.passport.user: ', req.session.passport.user);
  if (req.session && req.session.passport && req.session.passport.user) {
    res.status(200).json({ isAuthenticated: true, user: req.session.passport.user });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
}

const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });

    req.session.destroy((sessionErr) => {
      if (sessionErr) return res.status(500).json({ error: "Session destruction failed", details: sessionErr });

      res.clearCookie("connect.sid");
      return res.json({ message: "Logged out successfully" });
    });
  });
}

module.exports = {
  googleAuthRedirect,
  googleAuthCallback,
  checkUserLoggedIn,
  logout
};