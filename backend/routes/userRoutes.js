// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
// @route   POST /api/users
// @desc    Create a new user
router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, gender, country, dob } = req.body;

    // Create a new user
    const newUser = new User({ firstname, lastname, gender, country, dob });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      let errorMessages = [];

      // Loop through validation errors and format them
      Object.keys(error.errors).forEach((key) => {
        const errorMessage = error.errors[key].message;
        
        if (!errors[key]) {
          errors[key] = [];
        }
        
        errors[key].push(errorMessage);
        errorMessages.push(errorMessage);
      });

      const summaryMessage = `${errorMessages[0]} (and ${errorMessages.length - 1} more errors)`;

      return res.status(400).json({
        message: summaryMessage,
        errors, // Detailed validation errors
      });
    }

    res.status(400).json({
      message: "Error creating user",
      errors: { general: [error.message] }, // Send general error in array format
    });
  }
});


// @route   GET /api/users
// @desc    Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

// @route   PUT /api/users/:id
// @desc    Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const { firstname, lastname, gender, country, dob } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, gender, country, dob },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

module.exports = router;
