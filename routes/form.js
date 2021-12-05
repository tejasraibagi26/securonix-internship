const express = require("express");
const router = express.Router();
const data = require("../data");
const formData = data.form;

router.get("/", async (req, res) => {
  const edit = req.query.edit || false;
  const formId = req.query.formId;
  if (edit) {
    const form = await formData.getData(formId);
    return res.render("pages/form", {
      title: "Edit Form",
      formData: form,
      loggedIn: req.session.user ? true : false,
      action: "/form/edit",
    });
  }
  res.render("pages/form", { title: "Form", action: "/form" });
});

router.post("/", async (req, res) => {
  const { define, use, manage } = req.body;
  const userId = req.session.user.id;
  const add = await formData.addData(define, manage, use, userId);
  req.session.user = {
    ...req.session.user,
    formId: add._id.toString(),
  };
  return res.redirect("/form/visualize");
});

router.post("/edit", async (req, res) => {
  const { define, use, manage } = req.body;
  const userId = req.session.user.id;

  const add = await formData.updateData(define, manage, use, userId);
  req.session.user = {
    ...req.session.user,
    formId: add,
  };

  return res.redirect("/form/visualize");
});

router.get("/visualize", async (req, res) => {
  const form = req.query.formId || req.session.user.formId;
  let formValues;
  formValues = await formData.getData(form);
  return res.render("pages/visuals", {
    title: "Visualize",
    data: formValues,
    loggedIn: req.session.user ? true : false,
    formId: form,
    username: req.session.user.username,
  });
});

module.exports = router;
