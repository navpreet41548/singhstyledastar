require('../db/conn')
const dotenv = require('dotenv');
const AdminModel = require('../db/admin.model');
dotenv.config();
const router = require('express').Router()
const authenticate = require("../middleware/authenticate.js")

router.get("/image", authenticate,(req, res) => {           
  res.send(req.isVerified)
})
router.get("/video", authenticate,(req, res) => {
  res.send(req.isVerified)
})

router.post('/image/:id', (req, res) => {
    const userId = req.params.id 
    AdminModel.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { images:[{
            url: req.body.url,
            id: req.body.id
        }] } }, 
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
              console.log( "images" + result)
              res.redirect('/')
          }
        }
      );
})
router.post('/video/:id', (req, res) => {
    const userId = req.params.id
    AdminModel.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { video:[{
            url: req.body.url,
            id: req.body.id
        }] } }, 
        function(err, result) {
          if (err) {
            res.status(500).json(err);
          } else {
            console.log("video" + result)
            res.json(result)
          }
        }
      );
})

router.get("/logout",(req, res) => {
  console.log("hello from logout page")
  res.clearCookie("jwt", {path:'/'})
  res.status(200).send("User Logout")
})

module.exports = router;