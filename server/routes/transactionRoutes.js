// const express = require("express");
// const router = express.Router();

// const Transaction = require("../models/Transaction");

// // Add Transaction
// router.post("/", async (req, res) => {
//   try {

//     const { type, amount, category } = req.body;

//     const transaction = await Transaction.create({
//       type,
//       amount,
//       category
//     });

//     res.status(201).json({
//       message: "Transaction Added",
//       transaction
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// });



// // Get All Transactions
// router.get("/", async (req, res) => {
//   try {

//     const transactions = await Transaction.find();

//     res.status(200).json(transactions);

//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// });


// // Delete Transaction
// router.delete("/:id", async (req, res) => {
//   try {

//     await Transaction.findByIdAndDelete(req.params.id);

//     res.json({
//       message: "Transaction Deleted"
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }
// });


// // Update Transaction
// router.put("/:id", async (req, res) => {

//   try {

//     const updatedTransaction =
//       await Transaction.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//       );

//     res.json({
//       message: "Transaction Updated",
//       updatedTransaction
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }
// });

// module.exports = router;

const express = require("express");

const router = express.Router();

const Transaction =
  require("../models/Transaction");

const protect =
  require("../middleware/authMiddleware");


// GET ALL USER TRANSACTIONS
router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const transactions =
        await Transaction.find({
          user: req.user.id
        });

      res.json(transactions);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);


// ADD TRANSACTION
router.post(
  "/",
  protect,
  async (req, res) => {

    try {

      const {
        type,
        amount,
        category
      } = req.body;

      const transaction =
        await Transaction.create({

          user: req.user.id,

          type,
          amount,
          category
        });

      res.status(201).json(
        transaction
      );

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);


// DELETE
router.delete(
  "/:id",
  protect,
  async (req, res) => {

    try {

      await Transaction.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);


// UPDATE
router.put(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const updated =
        await Transaction.findByIdAndUpdate(

          req.params.id,

          req.body,

          { new: true }

        );

      res.json(updated);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

module.exports = router;