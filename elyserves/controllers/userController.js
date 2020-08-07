const User = require("../models/User");

const Artist = require("../models/Artist");
const PasswordReq = require("../models/PasswordReq");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
const mongodb = require("mongodb");
const {createCustomer, addCustomerCard, listCustomerCards} = require('./stripeFuncs');

dotenv.config({path: "../config.env"});


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

    let checkExistM = await User.find({email:req.body.email})
    let checkExistU = await User.find({username:req.body.username})
    if(checkExistM.username || checkExistU.username){
      console.log("Username or Email already exists")
      return res.json({
        msg: "Email or username already exists",
      });
    }

    let user = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      username: req.body.username,
    };

    user = await User.create(user);
    console.log("User Created")
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
          let confURL = `http://localhost:3000/confirm/${utype}/${emailToken}`;
          let mailOptions = {
            from: "saakethlogs@gmail.com",
            to: req.body.email,
            subject: "Elywalls Confirmation",
            html: `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Elywalls</title>
            
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
                        integrity="sha256-gvEnj2axkqIj4wbYhPjbWV7zttgpzBVEgHub9AAZQD4="
                        crossorigin="anonymous"
                    />
                    <link
                        href="https://fonts.googleemailapis.com/css?family=Jost:300,regular,500,700,italic,700italic"
                        rel="stylesheet"
                    />
            
                    <style>
                        html {
                            font-family: "Jost", email
            
                            background: #fafafa;
                            color: #121212;
                        }
            
                        * {
                            box-sizing: border-box;
                        }
            
                        h1 {
                            margin-top: 1.5rem;
            
                            font-size: 2.75rem;
                            font-weight: 300;
                        }
                        h2 {
                            margin-top: 1.5rem;email
            
                            font-size: 1rem;
                            font-weight: 500;
                        }
                        p {email;
                        }
                        small {
                            display: inline-block;
                            margin-top: 1.5rem;
            
                            font-size: 0.75rem;
                            font-weight: 500;
                            line-height: 1.5rem;
                            text-transform: uppercase;
                        }
                        strong {
                            font-weight: 700;email
                        }
                        em {
                            font-style: italic;
                        }
                        code {
                            padding: 0.125rem 0.25rem;
                            border-radius: 0.25rem;
                            background: #e6e9ec;
                            font-family: "Iosevka", "Consolas", "Courier New", Courier,
                                monospace;
                        }
                        a {
                            display: inline-block;
            
                            text-decoration: none;
                            color: #5e3fd1;
                        }
                        a.button {
                            padding: 1rem 1.5rem;
                            margin: 3rem 0 0 0;
            
                            color: #fafafa;
                            background: #5e3fd1;
            
                            transition: 0.14s;
                        }
                        a.button:hover {
                            color: #ffffff;
                            background: #786ddd;
                        }
            
                        .header {
                            background: #5e3fd1;
                            color: #fafafa;
            
                            padding: 3rem 1.5rem;
            
                            text-align: center;
                        }
            
                        .content {
                            width: 100%;
                            max-width: 1280px;
            
                            margin: 3rem auto 0 auto;
                            padding: 0 1.5rem;
            
                            text-align: center;
                        }
            
                        .link-container {
                            max-width: max-content;
                            margin: 0 auto;
                            border-bottom: 0.125rem solid #5e3fd1;
            
                            padding-bottom: 1.5rem;
                        }
                        .link-container p {
                            font-size: 0.75rem;
                        }
                    </style>
                </head>
            
                <body>
                    <div class="header">
                        <img src="" alt="Elywalls Logo" />
                        <h1>Elywalls</h1>
                        <p>Elegant posters by independent artists</p>
                    </div>
            
                    <div class="content">
                        <h2>Verify your account</h2>
            
                        <p>Click the link below to activate your account.</p>
            
                        <div class="link-container">
                            <a class="button" href = "${confURL}">
                                Activate
                            </a>
            
                            <h3>Not working?</h3>
                            <p>
                                Paste this into your URL bar:
                                <code>https://elywalls.com/account</code>
                            </p>
                        </div>
            
                        <small>
                            For assistance, please
                            <a href="mailto:support@elywalls.com">Contact us</a>.
                        </small>
                    </div>
                </body>
            </html>
                    `,
          };
          await transporter.sendMail(mailOptions);
        }
      }

    );

    jwt.sign(
      {id: user._id},
      process.env.JWT_SECRET,
      {expiresIn: 3600},
      (err, token) => {
        if (err) {
          console.log("err", err);
          return res.json({err: err});
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
    if (req.files === null) {
      return res.json({ msg: "No file uploaded" });
  }
    //TODO uncomment let checkExistM = await Artist.find({email:req.body.email})
    let checkExistU = await Artist.find({username:req.body.username})
    //checkExistM || 
    if(checkExistU.username){
      console.log("Username or Email alreadyt exists")
      return res.json({
        msg: "Email or username already exists",
      });
    }    
    let artist = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      username: req.body.username,
      dpURL: String(req.file.path),
      linkedIG:req.body.linkedIg
    };
    artist = await Artist.create(artist);
    console.log("Artist Created")
    
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
          let confURL = `http://localhost:3000/confirm/${utype}/${emailToken}`;
          let mailOptions = {
            from: "saakethlogs@gmail.com",
            to: req.body.email,
            subject: "Elywalls Confirmation",
            html: `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Elywalls</title>

        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
            integrity="sha256-gvEnj2axkqIj4wbYhPjbWV7zttgpzBVEgHub9AAZQD4="
            crossorigin="anonymous"
        />
        <link
            href="https://fonts.googleemailapis.com/css?family=Jost:300,regular,500,700,italic,700italic"
            rel="stylesheet"
        />

        <style>
            html {
                font-family: "Jost", email

                background: #fafafa;
                color: #121212;
            }

            * {
                box-sizing: border-box;
            }

            h1 {
                margin-top: 1.5rem;

                font-size: 2.75rem;
                font-weight: 300;
            }
            h2 {
                margin-top: 1.5rem;email

                font-size: 1rem;
                font-weight: 500;
            }
            p {email;
            }
            small {
                display: inline-block;
                margin-top: 1.5rem;

                font-size: 0.75rem;
                font-weight: 500;
                line-height: 1.5rem;
                text-transform: uppercase;
            }
            strong {
                font-weight: 700;email
            }
            em {
                font-style: italic;
            }
            code {
                padding: 0.125rem 0.25rem;
                border-radius: 0.25rem;
                background: #e6e9ec;
                font-family: "Iosevka", "Consolas", "Courier New", Courier,
                    monospace;
            }
            a {
                display: inline-block;

                text-decoration: none;
                color: #5e3fd1;
            }
            a.button {
                padding: 1rem 1.5rem;
                margin: 3rem 0 0 0;

                color: #fafafa;
                background: #5e3fd1;

                transition: 0.14s;
            }
            a.button:hover {
                color: #ffffff;
                background: #786ddd;
            }

            .header {
                background: #5e3fd1;
                color: #fafafa;

                padding: 3rem 1.5rem;

                text-align: center;
            }

            .content {
                width: 100%;
                max-width: 1280px;

                margin: 3rem auto 0 auto;
                padding: 0 1.5rem;

                text-align: center;
            }

            .link-container {
                max-width: max-content;
                margin: 0 auto;
                border-bottom: 0.125rem solid #5e3fd1;

                padding-bottom: 1.5rem;
            }
            .link-container p {
                font-size: 0.75rem;
            }
        </style>
    </head>

    <body>
        <div class="header">
            <img src="" alt="Elywalls Logo" />
            <h1>Elywalls</h1>
            <p>Elegant posters by independent artists</p>
        </div>

        <div class="content">
            <h2>Verify your account</h2>

            <p>Click the link below to activate your account.</p>

            <div class="link-container">
                <a class="button" href = "${confURL}">
                    Activate
                </a>

                <h3>Not working?</h3>
                <p>
                    Paste this into your URL bar:
                    <code>https://elywalls.com/account</code>
                </p>
            </div>

            <small>
                For assistance, please
                <a href="mailto:support@elywalls.com">Contact us</a>.
            </small>
        </div>
    </body>
</html>
        `,
          };
          await transporter.sendMail(mailOptions);
        }
      }
    );

    jwt.sign(
      {id: artist._id},
      process.env.JWT_SECRET,
      {expiresIn: 3600},
      (err, token) => {
        if (err) {
          return res.json({err: err});
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
      res = await Artist.findByIdAndUpdate({_id: id}, {confirmed: true});
      res = await Artist.findById({_id: id});
    } else {
      res = await User.findByIdAndUpdate({_id: id}, {confirmed: true});
      res = await User.findById({_id: id});

    }
  } catch (error) {
    console.log(error)
    return console.log("err", error);
  }

  return res.json({success:true,msg:"Confirmed Account"})
};

exports.forgot = async (req, res, next) => {
  try {
    let resa = await Artist.findOne({email: req.body.email});
    let resu = await User.findOne({email: req.body.email});
    let user = resu || resa;
    if (user) {
      const request = {
        email: req.body.email,
        id: req.body.id,
        uid: user._id
      };
      let reqp = await PasswordReq.create(request);
      console.log("Email verified");
      let utype = "artist";
      let confURL = `http://localhost:3000/resetpassword/${req.body.id}`;
      let mailOptions = {
        from: "saakethlogs@gmail.com",
        to: req.body.email,
        subject: "Elywalls Password reset",
        html: `<!--
        Password reset template
    
        Add/remove elements as required for other templates
    -->
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Elywalls</title>
    
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
                integrity="sha256-gvEnj2axkqIj4wbYhPjbWV7zttgpzBVEgHub9AAZQD4="
                crossorigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Jost:300,regular,500,700,italic,700italic"
                rel="stylesheet"
            />
    
            <style>
                html {
                    font-family: "Jost", "Montserrat", -apple-system,
                        BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
                        Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
                    font-size: 16px;
    
                    background: #fafafa;
                    color: #121212;
                }
    
                * {
                    box-sizing: border-box;
                }
    
                h1 {
                    margin-top: 1.5rem;
    
                    font-size: 2.75rem;
                    font-weight: 300;
                }
                h2 {
                    margin-top: 1.5rem;
    
                    font-size: 1.75rem;
                    font-weight: 300;
                }
                h3 {
                    margin-top: 1.5rem;
    
                    font-size: 1rem;
                    font-weight: 500;
                }
                p {
                    margin-top: 0.5rem;
    
                    line-height: 1.5rem;
                }
                small {
                    display: inline-block;
                    margin-top: 1.5rem;
    
                    font-size: 0.75rem;
                    font-weight: 500;
                    line-height: 1.5rem;
                    text-transform: uppercase;
                }
                strong {
                    font-weight: 700;
                }
                em {
                    font-style: italic;
                }
                code {
                    padding: 0.125rem 0.25rem;
                    border-radius: 0.25rem;
                    background: #e6e9ec;
                    font-family: "Iosevka", "Consolas", "Courier New", Courier,
                        monospace;
                }
                a {
                    display: inline-block;
    
                    text-decoration: none;
                    color: #5e3fd1;
                }
                a.button {
                    padding: 1rem 1.5rem;
                    margin: 3rem 0 0 0;
    
                    color: #fafafa;
                    background: #5e3fd1;
    
                    transition: 0.14s;
                }
                a.button:hover {
                    color: #ffffff;
                    background: #786ddd;
                }
    
                .header {
                    background: #5e3fd1;
                    color: #fafafa;
    
                    padding: 3rem 1.5rem;
    
                    text-align: center;
                }
    
                .content {
                    width: 100%;
                    max-width: 1280px;
    
                    margin: 3rem auto 0 auto;
                    padding: 0 1.5rem;
    
                    text-align: center;
                }
    
                .link-container {
                    max-width: max-content;
                    margin: 0 auto;
                    border-bottom: 0.125rem solid #5e3fd1;
    
                    padding-bottom: 1.5rem;
                }
                .link-container p {
                    font-size: 0.75rem;
                }
            </style>
        </head>
    
        <body>
            <div class="header">
                <img src="" alt="Elywalls Logo" />
                <h1>Elywalls</h1>
                <p>Elegant posters by independent artists</p>
            </div>
    
            <div class="content">
                <h2>Reset Password for ${user.name}</h2>
    
                <p>Click the link below to reset your password .</p>
    
                <div class="link-container">
                    <a class="button" href=${confURL}>
                        Reset Password
                    </a>
    
                    <h3>Not working?</h3>
                    <p>
                        Paste this into your URL bar:
                        <code>https://elywalls.com/account</code>
                    </p>
                </div>
    
                <small>
                    For assistance, please
                    <a href="mailto:support@elywalls.com">contact us</a>.
                </small>
            </div>
        </body>
    </html>
`,
      };
      await transporter.sendMail(mailOptions);
    } else {
      res.json({err: true, msg: "Email doesn't exist"});
    }
  } catch (error) {
    return console.log("err", error);
  }
};

exports.resetPass = async (req, res, next) => {

  try {
    const thisReq = await PasswordReq.findOne({"id": req.body.id});
    if (thisReq) {
      let resa = await Artist.findOne({email: thisReq.email});
      let resu = await User.findOne({_id: thisReq.uid});
      let ua = resa ? "artist" : "user";
      const pass = req.body.password;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(pass, salt);
      if (ua == "artist") {
        let uss = await Artist.findByIdAndUpdate({_id: mongodb.ObjectId(thisReq.uid)},
          {password: hash});
        res.json({err: false, msg: "Password updated"});
      } else {
        console.log(thisReq.uid,ua)
        await User.findByIdAndUpdate({_id: mongodb.ObjectId(thisReq.uid)},
          {password: hash});
        res.json({err: true, msg: "Password updated"});
      }
    } else {
      res.json({err: true, msg: "Sent Token failed"});
    }
  } catch (error) {
    return console.log("err", error);
  }
};

exports.redirect = async (req, res, next) => {
  try {
  } catch (error) {
    return console.log("err", error);
  }
  return res.redirect("http://localhost:3000/login");
};

exports.login = async (req, res, next) => {
  async function makeLogin(uora) {
    bcrypt.compare(req.body.password, uora.password).then((match) =>
      match
        ? jwt.sign(
          {id: uora._id, utype: uora.user_type},
          process.env.JWT_SECRET,
          {expiresIn: 3600},
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
        : res.json({msg: "Wrong password", logged: false})
    );
  }
  try {
    let user = await User.findOne({email: req.body.username}).then(
      async (user) => {
        if (user) {
          if (user.confirmed) {
            makeLogin(user);
          } else {
            res.json({msg: "0activate your account before logging in."});
          }
        } else {
          let artist = await Artist.findOne({email: req.body.username}).then(
            async (artist) => {
              if (artist) {
                if (artist.confirmed) {
                  makeLogin(artist);
                } else {
                  res.json({msg: "1 activate your account before logging in."});
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
                        res.json({msg: "Username or email doesnt exist"});
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

exports.verify = async (req, res, next) => {
  let token = req.body.token;

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      res.send({veri: false});
    }
    else {
      res.send({veri: true});
    }
  });
};


exports.editProfile = async (req, res, next) => {
  try {
    if (req.user.utype === "artist") {
      const editted_artist = {
        quote: req.body.quote,
        igLink: req.body.igLink,
        name: req.body.name,
        email: req.body.email,
      };
      await Artist.findByIdAndUpdate({_id: req.user.id}, {editted_artist});
    } else {
      const editted_user = {
        name: req.body.name,
        email: req.body.email,
      };
      await User.findByIdAndUpdate({_id: req.user.id}, {editted_user});
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
  try {
    let result = await User.findById(req.user.id);
    return res.status(200).json({
      success: true,
      profile: result
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
    let result = await Artist.findById({_id: req.user.id});
    return res.status(200).json({
      success: true,
      profile: result
    });
  } catch (error) {
    return res.status(510).json({
      success: false,
      err: error
    });
  }
};

exports.updateQuote = async (req, res, next) => {
  try {
    console.log(req.body)
    let result = await Artist.findByIdAndUpdate({_id: req.user.id},{
      quote:req.body.quote.formCaption,
      name: req.body.quote.formTitle,
      linkedIG: req.body.quote.formTags,
    });
    return res.status(200).json({
      success: true,
      msg: "Account updated"
    });
  } catch (error) {
    return res.status(510).json({
      success: false,
      err: error
    });
  }
};

exports.stripeMerge = async ({user, body: {cardToken}}, res, next) => {
  if (!user.stripeCustomerId) {
    const stripeCustomerId = await createCustomer(user.email);
    await User.findOneAndUpdate(
      {_id: user._id},
      {$set: {stripeCustomerId}},
    );
    return addCustomerCard(stripeCustomerId, cardToken);
  }
  return addCustomerCard(user.stripeCustomerId, cardToken);
};

exports.getRefreshToken = async (req,res,next)=>{
  console.log(req.params.uname)
  if(req.params.ut=='buyer'){
  let user = await User.find({username:req.params.uname});
       jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            return res.json({ err: err });
          } 
          return res.json({
            msg: "Token refreshed",
            user: user,
            token:token
          });
        }
       )
  }else{
    let user = await Artist.find({username:req.params.uname});
       jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            return res.json({ err: err });
          } 
          return res.json({
            msg: "Token refreshed",
            user: user,
            token:token
          });
        }
       )
  }

}

exports.stripeCards = async ({user}, res, next) => {
  if (!user.stripeCustomerId) return [];

  return listCustomerCards(user.stripeCustomerId);
};

