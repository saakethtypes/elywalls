const express = require("express");
const auth = require("../controllers/authCheck");
const router = express.Router();
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
router.route("/register-artist").post(registerArtist);
router.route("/edit-profile").post(auth, editProfile);
router.route("/account").get(auth, getProfileUser);
router.route("/profile").get(auth, getProfileArtist);
router.route("/verify").post(verify);
router.route("/forgot-password").post(forgot);
router.route("/reset-password").post(resetPass);
router.route("/redirectlogin").get(redirect);
router.route("/confirmation/:utype/:token").get(confirmProfile);
router.route("/merge-customer").post(stripeMerge);
router.route("/get-cards").get(stripeCards);

module.exports = router;
