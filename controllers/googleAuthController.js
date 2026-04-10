const jwt = require("jsonwebtoken");
const passport = require("passport");

const { successResponse, errorResponse } = require("../utils/apiResponce");


exports.redirectToGoogle = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
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
      sameSite: "lax", // ✅ CORRECT for localhost
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("printing till here")
    res.send(`
  <script>
    window.location.href = "http://localhost:5173/oauth-success";
  </script>
`);
  } catch (err) {
    console.log("cathihg error")
    res.redirect("http://localhost:5173/login");
  }
};
