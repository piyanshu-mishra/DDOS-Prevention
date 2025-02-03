module.exports = (roles) => (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" })
    }
  
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access forbidden" })
    }
  
    if (req.user.role === "admin" && req.user.accessLevel === "restricted") {
      // Add any specific checks for restricted admin access here
    }
  
    next()
  }
  
  