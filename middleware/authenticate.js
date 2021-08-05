const jwt = require("jsonwebtoken")
// const User = require("../db/admin.model.js")

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        // const rootUser = await User.findOne({ _id: verifyToken._id })
        !verifyToken ? req.isVerified = false : req.isVerified = true
        req.isVerified = true
        next()
    } catch (err) {
        // res.status(401).send("Unauthorized")
        req.isVerified = false
        console.log(err)
        next()
    }

}

module.exports = Authenticate