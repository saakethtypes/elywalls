const User = require("../models/User");
const Artist = require("../models/Artist");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saakethlogs@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

exports.registerUser = async (req, res, next) => {
  try {
    const pass = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);

    let user = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      username: req.body.username,
    };

    user = await User.create(user);
    jwt.sign(
      {
        user: user._id,
      },
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1d",
      },
      async (err, emailToken) => {
        if (err) {
          console.log("error", err);
        } else {
          let utype = "user";
          let confURL = `http://localhost:5000/confirmation/${utype}/${emailToken}`;
          let mailOptions = {
            from: "saakethlogs@gmail.com",
            to: req.body.email,
            subject: "Elywalls Confirmation",
            html: `Click on this link to activate your account:
        <i><a href = "${confURL}">${confURL}</a></i>`,
          };
          await transporter.sendMail(mailOptions);
        }
      }
    );

    //TODO directly login after registration
    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          console.log("err", err);
          return res.json({ err: err });
        }
        return res.json({
          msg: "User created",
          user: user,
          token,
        });
      }
    );
  } catch (err) {
    return res.json({
      err: err,
    });
  }
};

exports.registerArtist = async (req, res, next) => {
  try {
    const pass = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    let artist = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      username: req.body.username,
    };
    artist = await Artist.create(artist);
    jwt.sign(
      {
        user: artist._id,
      },
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1d",
      },
      async (err, emailToken) => {
        if (err) {
        } else {
          let utype = "artist";
          let confURL = `http://localhost:5000/confirmation/${utype}/${emailToken}`;
          let mailOptions = {
            from: "saakethlogs@gmail.com",
            to: req.body.email,
            subject: "Elywalls Confirmation",
            html: `Click on this link to activate your <b>Artist</b> account:
        <i><a href = "${confURL}">${confURL}</a></i>`,
          };
          await transporter.sendMail(mailOptions);
        }
      }
    );
    //TODO directly login after registration
    jwt.sign(
      { id: artist._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          return res.json({ err: err });
        }
        return res.json({
          msg: "Artist created",
          user: artist,
          token,
        });
      }
    );
  } catch (err) {
    return res.json({
      err: err,
    });
  }
};

exports.confirmProfile = async (req, res, next) => {
  try {
    const usser = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    let res = 0;
    const id = usser.user;
    if (req.params.utype === "artist") {
      res = await Artist.findByIdAndUpdate({ _id: id }, { confirmed: true });
      res = await Artist.findById({_id:id})
    } else {
      res = await User.findByIdAndUpdate({ _id: id }, { confirmed: true });
      res = await User.findById({_id:id})
    }
  } catch (error) {
    return console.log("err",error);
  }
  return res.redirect("http://localhost:3000/confirmed");
};

exports.login = async (req, res, next) => {
  async function makeLogin(uora) {
    bcrypt.compare(req.body.password, uora.password).then((match) =>
      match
        ? jwt.sign(
            { id: uora._id, utype: uora.user_type },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                return res.json({
                  msg: "Token creation failed",
                  err: err,
                });
              }
              return res.json({
                msg: "User Logged",
                token,
                logged: true,
                profile: uora,
              });
            }
          )
        : res.json({ msg: "Wrong password", logged: false })
    );
  }
  try {
    let user = await User.findOne({ email: req.body.username }).then(
      async (user) => {
        if (user) {
          if (user.confirmed) {
            makeLogin(user);
          } else {
            res.json({ msg: "0activate your account before logging in." });
          }
        } else {
          let artist = await Artist.findOne({ email: req.body.username }).then(
            async (artist) => {
              if (artist) {
                if (artist.confirmed) {
                  makeLogin(artist);
                } else {
                  res.json({ msg: "1 activate your account before logging in." });
                }
              } else {
              await User.findOne({
                  username: req.body.username,
                }).then(async (user) => {
                  if (user) {
                    if (user.confirmed) {
                      makeLogin(user);
                    } else {
                      res.json({
                        msg: "2activate your account before logging in.",
                      });
                    }
                  } else {
                    let artist = await Artist.findOne({
                      username: req.body.username,
                    }).then(async (artist) => {

                      if (artist) {
                        if (artist.confirmed) {
                          makeLogin(artist);
                        } else {
                          res.json({
                            msg: "4activate your account before logging in.",
                          });
                        }
                      } else {
                        res.json({ msg: "Username or email doesnt exist" });
                      }
                    });
                  }
                });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    return res.json({
      err: err,
    });
  }
};

exports.verify = async (req,res,next)=>{
  let token = req.body.token

  jwt.verify(token,process.env.JWT_SECRET,(err)=>{
    if(err){
      res.send({veri:false})}
      else{
        res.send({veri:true})
      }
  }) 
}


exports.editProfile = async (req, res, next) => {
  try {
    if (req.user.utype === "artist") {
      const editted_artist = {
        quote: req.body.quote,
        igLink: req.body.igLink,
        name: req.body.name,
        email: req.body.email,
      };
      await Artist.findByIdAndUpdate({ _id: req.user.id }, { editted_artist });
    } else {
      const editted_user = {
        name: req.body.name,
        email: req.body.email,
      };
      await User.findByIdAndUpdate({ _id: req.user.id }, { editted_user });
    }
    return res.status(200).json({
      success: true,
      msg: "Editted",
    });
  } catch (error) {
    return res.status(521).json({
      success: false,
      err: error,
    });
  }
};


exports.getProfileUser = async (req, res, next) => {
  console.log("user")
  try {
     let result = await User.findById(req.user.id)
    return res.status(200).json({
      success: true,
      profile:result
    });
  } catch (error) {
    return res.status(530).json({
      success: false,
      err: error
    });
  }
};

exports.getProfileArtist = async (req, res, next) => {
  try {
    let result = await Artist.findById({_id:req.user.id})

    return res.status(200).json({
      success: true,
      profile:result
    });
  } catch (error) {
    return res.status(510).json({
      success: false,
      err: error
    });
  }
};

