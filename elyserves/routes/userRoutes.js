const express = require("express");
const auth = require("../controllers/authCheck");

const router = express.Router();
const { registerUser, 
        registerArtist,
        login,
        confirmProfile,
        editProfile } = require("../controllers/userController");
        
router.route("/register-buyer").post(registerUser);
router.route("/login").post(login); //res -> artist/user
router.route("/register-artist").post(registerArtist);
router.route( auth,"/edit-profile").post(editProfile)
router.route( "/confirmation/:utype/:token").get(confirmProfile)

module.exports = router;
