const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/read", async (req, res) => {
  let allUsers = await userModel.find();

  res.render("read", { users: allUsers });
});

app.post("/create", async (req, res) => {
  let { name, email, imageurl } = req.body;

  let createdUser = await userModel.create({
    name,
    email,
    imageurl,
  });

  res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
  let deteledUser = await userModel.findOneAndDelete({ _id: req.params.id });

  res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });

  res.render("edit", { user: user });
});

app.post("/update/:id", async (req, res) => {
  let { name, email, imageurl } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, imageurl },
    { new: true }
  );

  res.redirect("/read");
});

// app.get("/create", async (req, res) => {
//   let createduser = await userModel.create({
//     name: "bhuu",
//     username: "ms.bhuu",
//     email: "bhuu@gmail.com",
//   });

//   res.send(createduser);
// });

// app.get("/update", async (req, res) => {
//   let updateduser = await userModel.findOneAndUpdate(
//     { name: "bhuu" },
//     { email: "mallinenibhuu@gmail.com" },
//     { new: true }
//   );

//   res.send(updateduser);
// });

// app.get("/delete", async (req, res) => {
//   let users = await userModel.findOneAndDelete({ name: "bhuu" });

//   res.send(users);
// });

app.listen(3000);
