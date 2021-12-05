//Require all modules
const express = require("express");
const public = express.static(__dirname + "/public");
const app = express();
const configRouter = require("./routes");
const { engine } = require("express-handlebars");
const session = require("express-session");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", public);
app.use(
  session({
    name: "AuthCookie",
    secret: "SecretValue",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

//Middleware function

app.use("/form", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  next();
});

app.use("/user/register", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/form/visualize?formId=" + req.session.user.formId);
  }
  next();
});

configRouter(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
