require('../db/conn')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const AdminModel = require('../db/admin.model')
const router = require('express').Router()
const maxAge = 3 * 24 * 60 *60
const  createToken =  async(id)=>{
    return await jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: maxAge})
}


router.post('/login', async (req, res) => {
    try {
        const name = req.body.name
        const password = req.body.password
        const user = await AdminModel.findOne({ name })
        console.log(req.body)
        console.log(password)
        if ( user) {
            if (password == user.password) {
                const token = await createToken(user._id)
                res.status(202).cookie("jwt", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true,
                    path: '/',
                    sameSite: "strict"
                    // maxAge: maxAge * 1000
                }).json("cookie being initialized")
                // res.status(200).json("Logged In")
            } else {
                res.status(400).json("Password are not correct")
            }
        } else {
            res.status(401).json("Username is wrong")
        }
    } catch (err) {
       console.log(err)
    }
})


// router.post('/register', async (req, res) => {
//     try {
//         const name = req.body.name
//         const password = req.body.password
    
//         const registerAdmin = new AdminModel({
//             name,
//             password,
//         })
//         const RegisteredAdmin = await registerAdmin.save()
//         console.log(RegisteredAdmin)
        
//     } catch (err) {
//         console.log(err)
//     }
// })


module.exports = router;