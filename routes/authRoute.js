const express = require("express");
const authrouter = express.Router();

const passport = require("passport");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// const { verifyAdminOtp, verifyUserOTP } = require("../controllers/authController.verifyOTP");
const {
  verifyAdminLoginOTP,
  verifyUserOTP,
  verifyDeliveryOTP
} = require("../controllers/authController.verifyOTP");

const { redirectToGoogle, googleCallback } = require("../controllers/googleAuthController");
const authenticate = require("../middlewere/authenticate_middlewere");


// --------------------------------------------------------------------


// ✅ User Login (separate)
authrouter.post("/login/user", authController.loginUser);

// ✅ Admin + Delivery Login (combined)
authrouter.post("/login/staff", authController.loginStaff);

// --------------------------------------------------------------------
// 🔐 OTP VERIFICATION

authrouter.post("/verify-otp/user", verifyUserOTP);
authrouter.post("/verify-otp/admin", verifyAdminLoginOTP);
authrouter.post("/verify-otp/delivery", verifyDeliveryOTP);

// --------------------------------------------------------------------
// 📝 SIGNUP

authrouter.post("/signup/user", authController.signUpUser);
authrouter.post("/signup/delivery", authController.signUpDelivery);



// --------------------------------------------------------------------
// 👤 PROFILE

authrouter.get("/profile", authenticate, userController.getProfile);

authrouter.get("/me", authenticate, (req, res) => {
  res.json({ success: true, data: req.user });
});

// --------------------------------------------------------------------
// 🔑 PASSWORD

authrouter.post("/forgot-password", authController.forgotPassword);
authrouter.post("/reset-password", authController.resetPassword);

// --------------------------------------------------------------------


// --------------------------------------------------------------------
// 🔒 PROTECTED

authrouter.get("/protected", authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// --------------------------------------------------------------------
// 🚪 LOGOUT

authrouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
});

// ------------------------------------------------------------------------------

// 🌐 GOOGLE AUTH

authrouter.get("/google", redirectToGoogle);
authrouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);
// ------------------------------------------------------------------------------





module.exports = authrouter;
