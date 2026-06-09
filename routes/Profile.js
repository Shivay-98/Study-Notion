const express = require("express");
const router = express.Router();

const { auth, isInstructor } = require("../middlewares/auth");

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
} = require("../controllers/Profile");

// ================= PROFILE ROUTES =================

// Update Profile
router.put("/updateProfile", auth, updateProfile);

// Delete Account
router.delete("/deleteProfile", auth, deleteAccount);

// Get User Details
router.get("/getUserDetails", auth, getAllUserDetails);

// // Update Display Picture
// router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// // Get Enrolled Courses
// router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// // Instructor Dashboard
// router.get(
//   "/instructorDashboard",
//   auth,
//   isInstructor,
//   instructorDashboard
// );

module.exports = router;