require('../db/conn')
const dotenv = require('dotenv');
const AdminModel = require('../db/admin.model');
dotenv.config();
const router = require('express').Router()

router.delete('/image/:imgId', (req, res) => {
    const imgId = req.params.imgId
    const publicId = req.params.publicId
    
    AdminModel.updateOne({ 'images._id': imgId },{"$pull": { 
        "images": { "_id": imgId }
    }},
    function(err, response) {
        if (err) {
            res.send(err);
          } else {
                console.log(response)
          }
        })
})
router.delete('/video/:videoId', (req, res) => {
    const videoId = req.params.videoId
    AdminModel.updateOne({ 'video._id': videoId },{"$pull": { 
        "video": { "_id": videoId }
    }},
    function(err, response) {
        if (err) {
            res.send(err);
          } else {
                console.log(response)
          }
    })
})


module.exports = router;