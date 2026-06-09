const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  signUp,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
} = require("../controllers/Profile");

const { auth } = require("../middlewares/auth");

// ==================== AUTH ROUTES ====================

// Signup
router.post("/signup", signUp);

// Login
router.post("/login", login);

// Send OTP
router.post("/sendOTP", sendOTP);

// Change Password (Logged-in User)
router.post("/changePassword", auth, changePassword);

// Forgot Password - Generate Reset Token
router.post("/reset-password-token", resetPasswordToken);

// Reset Password
router.post("/reset-password", resetPassword);

// ==================== PROFILE ROUTES ====================

// Update Profile
router.put("/updateProfile", auth, updateProfile);

// Delete Account
router.delete("/deleteProfile", auth, deleteAccount);

// Get User Details
router.get("/getUserDetails", auth, getAllUserDetails);

// Update Profile Picture
//router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;