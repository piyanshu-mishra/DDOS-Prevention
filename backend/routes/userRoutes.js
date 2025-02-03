const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

// Example protected route for all authenticated users
router.get("/profile", authMiddleware, roleMiddleware(["user", "admin"]), (req, res) => {
  res.json({ message: "Profile accessed", user: req.user })
})

// Example protected route for admin users only
router.get("/admin-dashboard", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Admin dashboard accessed" })
})

module.exports = router

