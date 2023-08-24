const asyncHandler = require("express-async-handler");
const UserSchema = require("../models/user.model");
const { generateJwtToken } = require("../utils/jwt.utils");
const { hashPassword, comparePassword } = require("../utils/bycrypt.utils");
const { USER } = require("../constants/user-roles.constants");
const jwt = require("jsonwebtoken");
const { createReward } = require("./reward.controller");

// @Description  - Register user
// @Route - POST /api/v1/auth/signup
// @Access - Public
const signUpUser = asyncHandler(async (req, res) => {
  try {
    //Check all the required fields are filled
    const { name, email, role, password } = req.body;
    const defaultRole = role || USER;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all fields..!!" });
      throw new Error("Please fill all fields..!!");
    }

    //Check the user already exist
    const userExist = await UserSchema.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "User already exist..!!" });
      throw new Error("User already exist..!!");
    }

    //Hashing the password
    const hashedPassword = await hashPassword(password);

    const userAvatarPlaceholder =
      "https://serc.si.edu/sites/default/files/styles/staff/public/website-gen/default-profile-picture.png";

    //Saving data to the database
    const registeredUser = await UserSchema.create({
      name: name,
      email: email,
      role: defaultRole,
      password: hashedPassword,
      userAvatar: {
        public_id: "",
        url: userAvatarPlaceholder,
      },
    });
    //Returning the user data in response
    if (registeredUser) {
      await createReward(registeredUser.id);
      res.status(201).json({
        _id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
        role: registeredUser.role,
        createdAt: registeredUser.createdAt,
        updatedAt: registeredUser.updatedAt,
      });
    } else {
      res.status(400).json({ message: "Invalid user data..!!" });
      throw new Error("Invalid user data..!!");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Login user
// @Route - POST /api/v1/auth/signin
// @Access - Public
const signInUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check for user email
    const user = await UserSchema.findOne({ email });

    if (!user) {
      res
        .status(400)
        .json({ message: "There is no user associated with this email..!!" });
      throw new Error("There is no user associated with this email..!!");
    }

    console.log("User : ", user);
    console.log("Password : ", password);
    console.log("User password : ", user.password);

    const isMatchPassword = await comparePassword(password, user.password);
    if (user && isMatchPassword) {
      const tokenData = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      res.json({
        token: generateJwtToken(tokenData),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          userAvatar: user.userAvatar.url,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid credentials..!!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get login user
// @Route - GET /api/v1/auth/logged-in-user
// @Access - Private
const getLoggedInUser = asyncHandler(async (req, res) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const user = await UserSchema.findById(userId);
    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      userAvatar: user.userAvatar.url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  signInUser,
  signUpUser,
  getLoggedInUser,
};
