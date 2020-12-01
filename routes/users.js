const express = require("express");
const router = express.Router();
const user = require("../modals/UserModal");

router.get("/", (req, res) => {
  user
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.get("/edit/:id", (req, res) => {
  user
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/", async (req, res) => {
  const { firstName, lastName, age, gender } = req.body;
  try {
    const newUser = new user({
      firstName,
      lastName,
      age,
      gender,
    });

    const user1 = await newUser.save();

    res.json(user1);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error..!");
  }
});

router.put("/edit/:id", async (req, res) => {
  const { firstName, lastName, age, gender } = req.body;

  const contactFields = {};
  if (firstName) contactFields.firstName = firstName;
  if (lastName) contactFields.lastName = lastName;
  if (age) contactFields.age = age;
  if (gender) contactFields.gender = gender;

  try {
    let User = await user.findById(req.params.id);

    if (!User) return res.sendStatus(404).json({ msg: "user not found..." });
    User = await user.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(User);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error..!");
  }
});

router.delete("/:id", (req, res) => {
  user
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("User was deleted..."))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
