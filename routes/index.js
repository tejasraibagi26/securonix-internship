const login = require("./user");
const form = require("./form");

const constructorMethod = (app) => {
  app.get("/", (req, res) => {
    res.render("entry/login", {
      title: "Login",
    });
  });

  app.use("/user", login);

  app.use("/form", form);
};

module.exports = constructorMethod;
