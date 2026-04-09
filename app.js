require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectSQL, sequelize } = require("./config/sql");
const connectDB = require("./config/db");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoute = require("./routes/authRoute");
const userroute = require("./routes/UserRoute")

// -----------------------------------------------------------------------
// !Database Connect 
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const startServer = async () => {
  try {
    await connectSQL(); 
    await sequelize.sync();
    console.log("Tables synced");
  } catch (err) {
    console.error(err);
  }
};
startServer();
connectDB();

// -----------------------------------------------------------------------
// ! All Routes

app.use("/api/payment", paymentRoutes);
app.use('/auth', authRoute);
app.use('/user' , userroute) ; 


app.get("/", (req, res) => {
  res.send("Server running...");
});

// -----------------------------------------------------------------------

// ! Listen 
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});