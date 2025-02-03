const User = require("../models/User")
const Admin = require("../models/Admin")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
    })

    // Hash password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
        role: "user",
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
  }
}

exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password, accessLevel } = req.body

    // Check if admin already exists
    let admin = await Admin.findOne({ email })
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" })
    }

    // Create new admin
    admin = new Admin({
      username,
      email,
      password,
      accessLevel,
    })

    // Hash password
    const salt = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(password, salt)

    await admin.save()

    // Create and return JWT token
    const payload = {
      user: {
        id: admin.id,
        role: "admin",
        accessLevel: admin.accessLevel,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body

    let user
    if (role === "admin") {
      user = await Admin.findOne({ email })
    } else {
      user = await User.findOne({ email })
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
        role: role,
        accessLevel: role === "admin" ? user.accessLevel : undefined,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
  }
}

