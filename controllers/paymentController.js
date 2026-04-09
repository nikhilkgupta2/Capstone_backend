const razorpay = require("../config/razorpay");
const verifySignature = require("../utils/verifySignature");
const Payment = require("../models/Payment");

// ✅ Create Order
exports.createOrder = async (req, res) => {
  try {

    const { userId , amountrs} = req.body;
    console.log(`userId:${userId} , amount:${amountrs}`)
    const options = {
      amount: amountrs,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    console.log(order);
    // ✅ Save order in DB
    await Payment.create({
      userId,
      orderId: order.id,
      amount: order.amount,
      status: "created",
    });

    res.json(order);
  } catch (error) {
    console.log("error Printed at the controller")
    res.status(500).json({ error: error.message });
  }
};

// exports.createOrder = async (req, res) => {
//   try {
//     const { amount, userId } = req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ error: "Invalid amount" });
//     }

//     const options = {
//       amount: amount * 100, // 🔥 convert ₹ → paise
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);

//     // Save in DB
//     await Payment.create({
//       userId,
//       orderId: order.id,
//       amount: options.amount,
//       status: "created",
//     });

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Verify Payment
// exports.verifyPayment = async (req, res) => {
//   try {
//     const isValid = verifySignature(req.body);

//     if (isValid) {
//       const { razorpay_order_id, razorpay_payment_id } = req.body;

//       // ✅ Update DB
//       await Payment.findOneAndUpdate(
//         { orderId: razorpay_order_id },
//         {
//           paymentId: razorpay_payment_id,
//           status: "success",
//         }
//       );

//       res.json({ status: "success" });
//     } else {
//       res.status(400).json({ status: "failed" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


exports.verifyPayment = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔥 DEBUG

    const isValid = verifySignature(req.body);

    console.log("Is Valid:", isValid); // 🔥 DEBUG

    if (isValid) {
      res.json({ status: "success" });
    } else {
      res.status(400).json({ status: "failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};