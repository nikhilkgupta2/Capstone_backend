const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    console.log("token ---->", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;
    console.log("authentication successfully --->", req.user);

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid token",
    });
  }
};

module.exports = authenticate;
