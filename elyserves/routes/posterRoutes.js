const express = require("express");
const auth = require("../controllers/authCheck");

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
router.route('/recommends/:cat/:aid/:pid').get(getRecommends)

router.route("/poster/:posterId")
       .delete(auth, deletePoster)
       .get(getPoster);

router.route("/poster-edit/:posterId").patch(auth, editPoster)
router.route('/cart').get(auth,getCarts) 

router.route("/cartadd/:posterId")
       .patch(auth, addToCart)
router.route("/cartdelete/:cid")
       .delete(auth, removeFromCart)

//router.route( auth,'/ig-walls').post(createPosterIg) 
router.route('/pay').post(auth,pay)
//router.route('/order-details').get(auth,orderDetails)    
const multer = require('multer');

const fileFilter = (req, file, cb) => {
       console.log(file.mimetype)
       if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/png' ) {
              cb(null, true);
       } else {
              cb(null, false);
       }
}
const storage = multer.diskStorage({
       destination: function (req, file, cb) {
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

router.route('/publish-poster').post(auth, upload, createPoster)

module.exports = router;
