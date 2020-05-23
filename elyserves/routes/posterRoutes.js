const express = require("express");
const auth = require("../controllers/authCheck");

const router = express.Router();
const {
       getPostersAll,
       getPostersGraphic,
       getPostersPhotoshop,
       getPostersPhotography,
       getPostersTextography,
       getPostersInstafamous,
       getPostersLatest,
       getPostersTopSelling,
       getPostersFeatured,
       getArtist,
       getPoster,
       createPoster,
       deletePoster,
       editPoster,
       admirePoster,
       unadmirePoster,
       admireArtist,
       unadmireArtist,
       addToCart,
       removeFromCart,
       getPostersAdmired,
       getArtistsAdmired,
       //   buy,
       //   orderDetails,
       //   createPosterIg
//TODO ask user to describe in tags of what is in the picture to rename the file like that 
//TODO a maybe todo - to search by tag create a new field for every new tag and if feild exists 
//append poster into that else create new feild and append poster, in TAGS model
//TODO buy and orderdetails from stripe, createposterig from ig oauth
              //add functionality to buy for poster purchases
              //used for top sales
} = require("../controllers/posterController");

router.route('/all').get(getPostersAll)
router.route('/featured').get(getPostersFeatured)
router.route('/latest').get(getPostersLatest)
router.route('/instafamous').get(getPostersInstafamous)
router.route('/popular').get(getPostersTopSelling)
router.route('/graphic-design').get(getPostersGraphic)
router.route('/photoshop').get(getPostersPhotoshop)
router.route('/photography').get(getPostersPhotography)
router.route('/textography').get(getPostersTextography)
router.route('/:auname/').get(getArtist)
router.route('/admired-posters').get(auth,getPostersAdmired)
router.route('/admired-artists').get(auth,getArtistsAdmired)
router.route('/:aid/admireA').patch(auth,admireArtist)
router.route('/:aid/unadmireA').delete(auth,unadmireArtist)
router.route('/:posterId/unadmireP').patch(auth, unadmirePoster)
router.route('/:posterId/admireP').patch(auth, admirePoster)

router.route("/poster/:posterId")
       .delete(auth, deletePoster)
       .put(auth, editPoster)
       .get(getPoster)
router.route("/cart/:posterId")
       .patch(auth, addToCart)
router.route("/cart/:cid")
       .delete(auth, removeFromCart)

//router.route( auth,'/ig-walls').post(createPosterIg) 
//router.route('/buy').post(auth,buy)
//router.route('/order-details').get(auth,orderDetails)    
const multer = require('multer');

const fileFilter = (req, file, cb) => {
       if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
              cb(null, true);
       } else {
              cb(null, false);
       }
}
const storage = multer.diskStorage({

       destination: function (req, file, cb) {
              cb(null, '../elyreacts/Poster Database');
       },
       filename: function (req, file, cb) {
              cb(null, String(new Date().getTime()) +
                     "-" + String(new Date().getUTCDate())
                     + "-" + String(new Date().getUTCMonth()) + "  " +
                     String(file.originalname))
       }
})
const upload = multer({
       storage: storage,
       limits: { fileSize: 1024 * 1024 * 5 },
       fileFilter: fileFilter
})

router.route('/publishposter').post(auth, upload.single('posterImg'), createPoster)

module.exports = router;
