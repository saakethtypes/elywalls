const express = require("express");
const auth = require("../controllers/authCheck");
const sharp = require("sharp");
const getStream = require('get-stream')

const router = express.Router();
const {
       getPostersAll,
       getPostersGraphic,
       getPostersPhotoshop,
       getPostersPhotography,
       getPostersTextography,
       getPostersPopular,
       getPostersLatest,
       getArtistPopular,
       getArtist,
       getPoster,
       getCarts,
       getOrders,
       getOrder,
       getRecommends,
       createPoster,
       deletePoster,
       editPoster,
       admirePoster,
       unadmirePoster,
       admireArtist,
       unadmireArtist,
       addToCart,
       cartQuantity,
       removeFromCart,
       getPostersAdmired,
       getArtistsAdmired,
       pay,
       getSales,
       getHeros
       //   orderDetails,
       //   createPosterIg
} = require("../controllers/posterController");

router.route('/all').get(getPostersAll)
router.route('/latest').get(getPostersLatest)
router.route('/popular').get(getPostersPopular)
router.route('/graphic-design').get(getPostersGraphic)
router.route('/photoshop').get(getPostersPhotoshop)
router.route('/photography').get(getPostersPhotography)
router.route('/textography').get(getPostersTextography)
router.route('/topartists').get(getArtistPopular)
router.route('/profile/:auname/').get(getArtist)
router.route('/admired-posters').get(auth,getPostersAdmired)
router.route('/admired-artists').get(auth,getArtistsAdmired)
router.route('/:aid/admireA').patch(auth,admireArtist)
router.route('/:aid/unadmireA').delete(auth,unadmireArtist)
router.route('/unadmireP/:posterId').patch(auth, unadmirePoster)
router.route('/admireP/:posterId').patch(auth, admirePoster)
router.route('/saveQuantity/:cartId').patch(auth, cartQuantity)
router.route('/orders').get(auth,getOrders)
router.route('/recommends/:cat/:aid/:pid').get(getRecommends)
router.route('/order/:oid').get(getOrder)
router.route('/sales/:aid').get(getSales)

router.route("/poster/:posterId")
       .delete(auth, deletePoster)
       .get(getPoster);

router.route("/poster-edit/:posterId").patch(auth, editPoster)
router.route('/cart').get(auth,getCarts) 
router.route('/heros').get(getHeros) 

router.route("/cartadd/:posterId")
       .patch(auth, addToCart)
router.route("/cartdelete/:cid")
       .delete(auth, removeFromCart)

//router.route( auth,'/ig-walls').post(createPosterIg) 
router.route('/pay').post(auth,pay)
//router.route('/order-details').get(auth,orderDetails)    
const multer = require('multer');

const fileFilter = (req, file, cb) => {
       if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/png' ) {
              cb(null, true);
       } else {
              cb(null, false);
       }
}
const storage = multer.diskStorage({
       destination: function (req, file, cb) {
              //resized operations
              cb(null, '../elyreacts/src/assets/postersDb');
       },
       filename: function (req, file, cb) {
              let ext = String(file.mimetype).split("/")
              ext = ext[1]
              cb(null, String(file.originalname) + 
              String(new Date().getTime())+"."+ext )
       }
})

const upload = multer({
       storage: storage,
       fileFilter: fileFilter
}).single('posterImg')

const fileFilterResized = (req, file, cb) => {
       if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/png' ) {
       cb(null, true)
       } else {
              cb(null, false);
       }
}

const storageResized = multer.diskStorage({
       destination:  function (req, file, cb) {
       console.log("s resizing..")
       const buffer =  getStream(file.stream)
        file = sharp(buffer)
        .resize(10, 20)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        console.log(file)

        cb(null, '../elyreacts/src/assets/postersDb');
       },
       filename: function (req, file, cb) {
              let ext = String(file.mimetype).split("/")
              ext = ext[1]
              cb(null, String(file.originalname) + 
              String(new Date().getTime())+"."+ext )
       }
})

const uploadResized = multer({
       storage: storageResized,
       fileFilter: fileFilterResized
}).single('posterImg')



router.route('/publish-poster').post(auth, upload, createPoster)

module.exports = router;
