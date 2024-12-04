import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth User & Get token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //below we are using the method specified in the model
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      employeeID: user.employeeID,
      grade: user.grade,
      jobTitle: user.jobTitle,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400); //client error
    throw new error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    console.log("We getting here A:A:A:A:");
  } else {
    res.status(400);
    console.log("NONONON");
    throw new Error("Invalid user data");
  }
});

// @desc Logout user and / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) }); //clearing the cookie and seeting it to nothing

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc Get users
// @route GET /api/users/profile
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400); //client error
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.jobTitle = req.body.jobTitle || user.jobTitle;
    user.employeeID = req.body.employeeID || user.employeeID;
    user.grade = req.body.grade || user.grade;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser._name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      jobTitle: updatedUser.jobTitle,
      employeeID: updatedUser.employeeID,
      grade: updatedUser.grade,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //isAdmin to be handled later. Will probably be from an admin register route where only admins can set this when creating a user

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400); //client error
    throw new error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addUser,
};
