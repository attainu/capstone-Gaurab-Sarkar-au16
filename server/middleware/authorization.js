const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config/keys")

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token")

  if(!token) {
    return res.status(401).json({ message: "You donot have the right authorization" })
  }
  try{
    const decoded = jwt.verify(token, jwtSecret)
    console.log("decoded:", decoded)
    req.user = decoded.user
    next()
  }catch(error){
    res.status(401).json({message: "Invalid token"})
  }
}