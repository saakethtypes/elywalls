const express = require("express");
const auth = require("../controllers/authCheck");

const router = express.Router();
const { registerUser, 
        registerArtist,
        login,
        confirmProfile,
        getProfileUser,
        getProfileArtist,
        editProfile } = require("../controllers/userController");
        
router.route("/register-buyer").post(registerUser);
router.route("/login").post(login); //res -> artist/user
router.route("/register-artist").post(registerArtist);
router.route( "/edit-profile").post(auth,editProfile);
router.route( '/account').get(auth,getProfileUser);
router.route( "/profile").get(auth,getProfileArtist);
router.route( "/confirmation/:utype/:token").get(confirmProfile);

module.exports = router;
