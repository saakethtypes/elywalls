const express = require("express");
const auth = require("../controllers/authCheck");
const router = express.Router();
const multer = require('multer');

const {registerUser,
        registerArtist,
        login,
        editProfile,
        confirmProfile,
        getProfileUser,
        verify,
        getProfileArtist,
        forgot,
        resetPass,
        redirect,
        stripeMerge,
        stripeCards} = require("../controllers/userController");

router.route("/register-buyer").post(registerUser);
router.route("/login").post(login); //res -> artist/user
router.route("/edit-profile").post(auth, editProfile);
router.route("/account").get(auth, getProfileUser);
router.route("/youraccount").get(auth, getProfileArtist);
router.route("/verify").post(verify);
router.route("/forgot-password").post(forgot);
router.route("/reset-password").post(resetPass);
router.route("/redirectlogin").get(redirect);
router.route("/confirmation/:utype/:token").get(confirmProfile);
router.route("/merge-customer").post(stripeMerge);
router.route("/get-cards").get(stripeCards);

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
              cb(null, '../elyreacts/src/assets/artistsDp');
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
}).single('artistDp')
router.route("/register-artist").post(upload,registerArtist);


module.exports = router;
