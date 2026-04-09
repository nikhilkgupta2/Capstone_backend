const jwt = require("jsonwebtoken");
const passport = require("passport");

const { successResponse, errorResponse } = require("../utils/apiResponce");


exports.redirectToGoogle = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
};

exports.googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect("http://localhost:5173/login");
    }
    const token = jwt.sign(
      {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role || "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.cookie("token", token, {
      httpOnly: true, 
      secure: false, 
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect("http://localhost:5173/");
  } catch (err) {
    res.redirect("http://localhost:5173/login");
  }
};
