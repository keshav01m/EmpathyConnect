import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords do not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }
    //hash password here

    //https://avatar-placeholder.iran.liara.run/
    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePicture: newUser.profilePicture,
    });
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
export const login = (req, res) => {
  console.log("login");
};

export const logout = (req, res) => {
  console.log("logoutUSER");
};
