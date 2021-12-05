const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await users.login(username, password);
  if (user === null) {
    res.status(404).json({ error: "Invalid credentials" });
    return;
  }

  req.session.user = { id: user._id, username: user.username };
  if (user.form) {
    return res.redirect("/form/visualize?formId=" + user.form.toString());
  }
  return res.status(200).redirect("/form");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

router.get("/register", (req, res) => {
  res.render("entry/register", { title: "Register" });
});

router.post("/register", async (req, res) => {
  let { username, password, confirm_password } = req.body;
  let errors = [];
  if (!username) errors.push("Username is required");
  if (!password) errors.push("Password is required");
  if (!confirm_password) errors.push("Confirm password is required");
  if (password !== confirm_password) errors.push("Passwords do not match");
  if (errors.length > 0) {
    return res.render("entry/register", { title: "Register", errors: errors });
  }

  try {
    const create = await users.register(username, password);
    return res.redirect("/");
  } catch (error) {
    return res.render("entry/register", { title: "Register", errors: [error] });
  }
});

module.exports = router;
