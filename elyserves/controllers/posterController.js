const User = require("../models/User");
const Artist = require("../models/Artist");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Poster = require("../models/Poster");
const Photography = require("../models/Photography");
const Textography = require("../models/Textography");
const Graphic = require("../models/Graphic");
const Photoshop = require("../models/Photoshop");
const mongodb = require("mongodb");
const static_id_p = "5ed11ac6b5a7ab1bad0752f7";
const static_id_ps = "5ed11b2eca5f881c2719cb90";
const static_id_g = "5ed11b2dca5f881c2719cb8c";
const static_id_t = "5ed11b2dca5f881c2719cb8e";
const dotenv = require("dotenv");
const { v4 } = require("uuid");
dotenv.config({ path: "../config.env" });
const fs = require("fs");
const { post } = require("../routes/userRoutes");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const nodemailer = require("nodemailer");
const { time } = require("console");

let transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port:465,
    secure: true,
    auth: {
      user: "hello@elywalls.com",
      pass: process.env.EMAIL_PASS,
    },
  });

exports.createPoster = async (req, res, next) => {
    try {
        console.log("uploading..");
        if (req.files === null) {
            console.log("File is null")
            return res.json({ msg: "No file uploaded" });
        }
        const poster = {
            title: req.body.title,
            pictureURL: String(req.file.path),
            category: req.body.category,
            tags: req.body.tags,
            price: req.body.price,
            madeBy: req.body.madeBy,
            caption: req.body.caption,
            artistDp: req.body.artistDp
        };
        let artlimit = await Artist.findById(req.user.id)
        if(artlimit.postersmade.length<21){
        const new_poster = await Poster.create(poster);
          
        //pushing to artist works
        const art_made = await Artist.findByIdAndUpdate(
            { _id: req.user.id },
            { $push: { postersmade: new_poster } }
        );

        console.log("pushed");

        //pushing to specific category
        if (req.body.category == "Photoshop") {
            await Photoshop.findByIdAndUpdate(
                { _id: mongodb.ObjectId(static_id_ps) },
                { $push: { items: new_poster } }
            );
        }
        if (poster.category === "Graphic") {
            await Graphic.findByIdAndUpdate(
                { _id: mongodb.ObjectId(static_id_g) },
                { $push: { items: new_poster } }
            );
        }
        if (poster.category === "Textography") {
            await Textography.findByIdAndUpdate(
                { _id: mongodb.ObjectId(static_id_t) },
                { $push: { items: new_poster } }
            );
        }
        if (poster.category === "Photography") {
            await Photography.findByIdAndUpdate(
                { _id: mongodb.ObjectId(static_id_p) },
                { $push: { items: new_poster } }
            );
        }
        return res.status(201).json({
            success: true,
            poster_created: new_poster,
        });}else{
            return res.status(201).json({
                success: true,
                msg:'Max publishable limit is only 20 posters.',
        });
    }
    } catch (error) {
        if (error.name === "ValidationError") {
            const msgs = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({
                success: false,
                err: msgs,
            });
        } else {
            console.log(error)
            return res.status(507).json({
                success: false,
                err: error,
            });
        }
    }
};

exports.getPostersAll = async (req, res, next) => {
    try {
        if(Poster.countDocuments()<10){const resultPopular = await Poster.find({})
        .sort({ $natural: -1 })
                    .skip(Number(req.query.infiPage))
                    .limit(10)
                    
        const resultNew = await Poster.find({})
        .sort({ $natural: 1 })
        .skip(Number(req.query.infiPage))
        .limit(10)
        results = [...resultPopular ,...resultNew].sort( () => Math.random() - 0.5)
        let lengthTotal = await Poster.countDocuments()
        let go = true
        if (Number(req.query.infiPage) < lengthTotal/2 ){
            go = false
        }
        return res.status(200).json({
            success: true,
            posters: results,
            go:go,
            AllLength: lengthTotal
        });
    }else{
let results = await Poster.find({})
let lengthTotal = await Poster.countDocuments()

return res.status(200).json({
    success: true,
    posters: results,
    go:false,
    AllLength: lengthTotal
});
        }

        
    } catch (err) {
        return res.status(400).json({
            success: false,
            err: err,
        });
    }
};

exports.deletePoster = async (req, res, next) => {
    try {
        console.log("deleted");
        const postesr = await Poster.findById({ _id: req.params.posterId });
        if (req.user.utype === "artist") {
            let ree = await Artist.findByIdAndUpdate(
                { _id: req.user.id },
                { $pull: { postersmade: { _id: postesr._id } } }
            );
        }
        if (req.user.utype === "artist") {
            ree = await Artist.findByIdAndUpdate(
                { _id: req.user.id },
                { $pull: { admires: { _id: postesr._id } } }
            );
        } else {
            ree = await User.findByIdAndUpdate(
                { _id: req.user.id },
                { $pull: { admires: { _id: postesr._id } } }
            );
        }

        if (postesr.category == "Photoshop") {
            await Photoshop.findByIdAndUpdate(
                { _id: mongodb.ObjectId(static_id_ps) },
                { $pull: { items: { _id: postesr._id } } }
            );
        }
        if (postesr.category === "Graphic") {
            await Graphic.findByIdAndUpdate(
                { _id: mongodb.ObjectId(static_id_g) },
                { $pull: { items: { _id: postesr._id } } }
            );
        }
        if (postesr.category === "Textography") {
            await Textography.findByIdAndUpdate(
                { _id: mongodb.ObjectId(static_id_t) },
                { $pull: { items: { _id: postesr._id } } }
            );
        }
        if (postesr.category === "Photography") {
            await Photography.findByIdAndUpdate(
                { _id: mongodb.ObjectId(static_id_p) },
                { $pull: { items: { _id: postesr._id } } }
            );
        }

        let artist = await Artist.find({ _id: req.user.id });

        await Poster.findByIdAndDelete({ _id: req.params.posterId }, (e) => console.log(e));
        fs.unlink(
            "/home/ubuntu/elywalls.com/DB/assets/postersDb/" + postesr.pictureURL.split("Db\\")[1],
            (err) => {
                if (err) {
                    console.log("failed to delete local image:" + err);
                } else {
                    console.log("successfully deleted local image");
                }
            }
        );

        return res.status(200).json({
            success: true,
            msg: "Poster has been deleted",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            err: err,
        });
    }
};

exports.editPoster = async (req, res, next) => {
    try {
        
        let poster = await Poster.findByIdAndUpdate(
            { _id: req.params.posterId },
            { title: req.body.formTitle, caption: req.body.formCaption, tags: req.body.formTags }
        );
        let result  = await Artist.update(
            {
                "username": poster.madeBy,
                "postersmade._id": 
        mongodb.ObjectId(req.params.posterId )},
            {
                $set: {
                     "postersmade.$.title": req.body.formTitle,
                     "postersmade.$.tags": req.body.formTags, 
                     "postersmade.$.caption": req.body.formCaption,
                },
            }
        );
        console.log(await Artist.findOne({username:poster.madeBy}))
        return res.status(200).json({
            success: true,
            msg: "Poster has been updated",
        });
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            success: false,
            err: error,
        });
    }
};

exports.getPoster = async (req, res, next) => {
    try {
        const result = await Poster.findById({ _id: req.params.posterId });
        await Poster.findByIdAndUpdate({ _id: req.params.posterId }, { $inc: { views: 1 } });
        return res.status(200).json({
            success: true,
            poster: result,
        });
    } catch (error) {
        return res.status(502).json({
            success: false,
            erssr: error,
        });
    }
};

exports.getArtist = async (req, res, next) => {
    try {
        const result = await Artist.find({ username: req.params.auname });
        await Artist.findByIdAndUpdate({ _id: result[0]._id }, { $inc: { profileViews: 1 } });
        return res.status(200).json({
            success: true,
            artist: result,
        });
    } catch (error) {
        return res.status(512).json({
            success: false,
            err: error,
        });
    }
};

exports.getArtistPopular = async (req, res, next) => {
    try {
        const result = await Artist.find({}).limit(7).sort({ profileViews: -1 });
        return res.status(200).json({
            success: true,
            artists: result,
        });
    } catch (error) {
        return res.status(512).json({
            success: false,
            err: error,
        });
    }
};

function getUnique(arr, comp) {
    const unique = arr
        .map((e) => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => arr[e])
        .map((e) => arr[e]);
    return unique;
}

exports.getRecommends = async (req, res, next) => {
    try {
        let resultTopArtists = await Artist.find({})
            .sort({ profileViews: -1 })
            .select({ postersmade: 1 })
            .limit(5);
        let resultSameArtist = await Artist.find({ username: req.params.aid });
        let modelReq = 0;
        if (req.params.cat == "Graphic") {
            modelReq = Graphic;
        }
        if (req.params.cat == "Textography") {
            modelReq = Textography;
        }
        if (req.params.cat == "Photoshop") {
            modelReq = Photoshop;
        }
        if (req.params.cat == "Photography") {
            modelReq = Photography;
        }
        let resultCategory = await modelReq.find({}).limit(10).sort({ views: -1 });
        let pool = [];
        const poster = await Poster.findById({ _id: req.params.pid });
        pool.push(poster);
        resultTopArtists.map((pos) => {
            pool.push(...pos.postersmade);
        });
        resultCategory.map((pos) => {
            pool.push(...pos.items);
        });
        resultSameArtist.map((pos) => {
            pool.push(...pos.postersmade);
        });

        pool = pool.sort(() => 0.5 - Math.random());
        let finalpool = getUnique(pool, "_id");

        let selected = pool.slice(0, 12);
        return res.status(200).json({
            success: true,
            recommends: selected,
        });
    } catch (error) {
        return res.status(512).json({
            success: false,
            err: error,
        });
    }
};

exports.getPostersPopular = async (req, res, next) => {
    try {  
        const result = await Poster.find({}).limit(10).sort({ views: -1 });
        return res.status(200).json({
            success: true,
            posters: result,
        });
    } catch (error) {
        return res.status(509).json({
            success: false,
            err: error,
        });
    }
};

exports.getPostersPhotoshop = async (req, res, next) => {
    try {
    const resultPopular = await Photoshop.findOne({})
    //     ,{$unwind:'$items'})
    // .skip(Number(req.query.infiPage))
    // .limit(10)
    // .sort({views:-1});
    // console.log(resultPopular)
    const resultNew = await Photoshop.find({})
    .skip(Number(req.query.infiPage))
    .limit(10)
    .sort({views: 1});

    // const results = [resultPopular ,resultNew].sort( () => Math.random() - 0.5)
        return res.status(200).json({
            success: true,
            posters: resultPopular.items,
        });
    } catch (error) {
        console.log(error)
        return res.status(504).json({
            success: false,
            err: error,
        });
    }
};

exports.getPostersGraphic = async (req, res, next) => {
    try {
        const resultPopular = await Graphic.findOne({})
    // .skip(Number(req.query.infiPage))
    // .limit(10)
    // .sort({views:-1});

    const resultNew = await Graphic.find({})
    .skip(Number(req.query.infiPage))
    .limit(10)
    .sort({views: 1});

    // const results = [...resultPopular ,...resultNew].sort( () => Math.random() - 0.5)
        return res.status(200).json({
            success: true,
            posters: resultPopular.items,
        });
    } catch (error) {
        return res.status(503).json({
            success: false,
            err: error,
        });
    }
};

exports.getPostersPhotography = async (req, res, next) => {
    try {
        const resultPopular = await Photography.findOne({})
    // .skip(Number(req.query.infiPage))
    // .limit(10)
    // .sort({views:-1});
    const resultNew = await Photography.find({})
    .skip(Number(req.query.infiPage))
    .limit(10)
    .sort({views: 1});

    // const results = [...resultPopular ,...resultNew].sort( () => Math.random() - 0.5)
        return res.status(200).json({
            success: true,
            posters: resultPopular.items,
        });
    } catch (error) {
        console.log(error)
        return res.status(505).json({
            success: false,
            err: error,
        });
    }
};

exports.getPostersTextography = async (req, res, next) => {
    try {
        const resultPopular = await Textography.findOne({})
    // .skip(Number(req.query.infiPage))
    // .limit(10)
    // .sort({views:-1});

    const resultNew = await Textography.find({})
    .skip(Number(req.query.infiPage))
    .limit(10)
    .sort({views: 1});

    // const results = [...resultPopular ,...resultNew].sort( () => Math.random() - 0.5)
        return res.status(200).json({
            success: true,
            posters: resultPopular.items,
        });
    } catch (error) {
        return res.status(506).json({
            success: false,
            err: error,
        });
    }
};

exports.getPostersLatest = async (req, res, next) => {
    try {
        const result = await Poster.find({}).limit(10).sort({ $natural: -1 });
        return res.status(200).json({
            success: true,
            posters: result,
        });
    } catch (error) {
        return res.status(508).json({
            success: false,
            err: error,
        });
    }
};

exports.admirePoster = async (req, res, next) => {
    try {
        let result = 0;
        let user = 0;
        let checku = await User.findById({ _id: req.user.id });
        let checka = await Artist.findById({ _id: req.user.id });
        check = checku || checka;
        let chk = true;
        check.admires.map((pos) => {
            if (pos._id == req.params.posterId) {
                chk = false;
            }
        });
        if (chk) {
            await Poster.findByIdAndUpdate({ _id: req.params.posterId }, { $inc: { admires: 1 } });
            result = await Poster.findById(req.params.posterId);
            if (req.user.utype === "buyer") {
                user = await User.findByIdAndUpdate(
                    { _id: req.user.id },
                    { $push: { admires: result } }
                );
            } else {
                user = await Artist.findByIdAndUpdate(
                    { _id: req.user.id },
                    { $push: { admires: result } }
                );
            }

            console.log("Poster Admired",result.admires,user.admires.length)
            return res.status(200).json({
                success: true,
                posters: result,
                user: user,
            });
        } else {
            console.log("Liked Already")
            return res.status(200).json({
                success: false,
                msg: "Already liked",
            });
        }
    } catch (error) {
        return res.status(513).json({
            success: false,
            err: error,
        });
    }
};

exports.unadmirePoster = async (req, res, next) => {
    try {
        let result = 0;
        let user = 0;
        let checku = await User.findById({ _id: req.user.id });
        let checka = await Artist.findById({ _id: req.user.id });
        check = checku || checka;
        let chk = false;
        check.admires.map((pos) => {
            if (pos._id == req.params.posterId) {
                chk = true;
            }
        });
       
        if (chk) {
            await Poster.findByIdAndUpdate({ _id: req.params.posterId }, 
                { $inc: { admires: -1 } });
            result = await Poster.findById(req.params.posterId);
            if (req.user.utype === "buyer") {
            user = await User.findByIdAndUpdate(
                { _id: req.user.id },
                { $pull: { admires: { _id: result._id } } }
            );
        } else {
            user = await Artist.findByIdAndUpdate(
                { _id: req.user.id },
                { $pull: { admires: { _id: result._id } } }
            );
        }
        console.log("Poster Unadmired",result.admires,user.admires.length)

        return res.status(200).json({
            success: true,
            user: user,
        });
    }else{
            return res.status(200).json({
                success: false,
                msg: "Not admired to unadmire",
            });
        }
        
    } catch (error) {
        return res.status(514).json({
            success: false,
            err: error,
        });
    }
};

exports.admireArtist = async (req, res, next) => {
    try {
        await Artist.findByIdAndUpdate({ _id: req.params.artistId }, { $inc: { admires: 1 } });
        const result = await Artist.findById(req.params.artistId);
        if (req.user.utype === "buyer") {
            await User.findByIdAndUpdate(
                { _id: req.user.id },
                { $push: { admired_artists: result } }
            );
        } else {
            await Artist.findByIdAndUpdate(
                { _id: req.user.id },
                { $push: { admired_artists: result } }
            );
        }
        return res.status(200).json({
            success: true,
            posters: result,
        });
    } catch (error) {
        return res.status(515).json({
            success: false,
            err: error,
        });
    }
};

exports.unadmireArtist = async (req, res, next) => {
    try {
        await Artist.findByIdAndUpdate({ _id: req.params.artistId }, { $inc: { admires: -1 } });
        const result = await Artist.findById(req.params.artistId);
        if (req.user.utype === "buyer") {
            await User.findByIdAndUpdate(
                { _id: req.user.id },
                { $pull: { admired_artists: { _id: req.params.artistId } } }
            );
        } else {
            await Artist.findByIdAndUpdate(
                { _id: req.user.id },
                { $pull: { admired_artists: { _id: req.params.artistId } } }
            );
        }
        return res.status(200).json({
            success: true,
            posters: result,
        });
    } catch (error) {
        return res.status(516).json({
            success: false,
            err: error,
        });
    }
};

exports.addToCart = async (req, res, next) => {
    try {
        const poster = await Poster.findById({ _id: req.params.posterId });
        let cart_cr = await Cart.create({ item: poster ,quantity:1,price_with_quantity:1*poster.price});
        cart_cr = await Cart.find({ _id: cart_cr._id });
        let result = 0;
        if (req.user.utype === "buyer") {
            result = await User.findByIdAndUpdate(
                { _id: req.user.id },
                { $push: { cart: cart_cr[0] } }
            );
            result = await User.findById({ _id: req.user.id });
        }
        return res.status(200).json({
            success: true,
            cartObj: cart_cr,
        });
    } catch (error) {
        return res.status(517).json({
            success: false,
            err: error,
        });
    }
};

exports.cartQuantity = async (req, res, next) => {
    try {
        const cart = await Cart.findByIdAndUpdate(
            { _id: req.params.cartId },
            { quantity: req.body.q, price_with_quantity: req.body.pwq }
        );
        if (req.user.utype === "buyer") {
            result = await User.updateOne(
                {
                    _id: req.user.id,
                    cart: {
                        $elemMatch: { _id: req.params.cartId },
                    },
                },
                {
                    $set: {
                        "cart.$.quantity": req.body.q,
                        "cart.$.price_with_quantity": req.body.pwq,
                    },
                }
            );
        }
        return res.status(200).json({
            success: true,
            msg: "Cart quantity updated",
        });
    } catch (error) {
        return res.status(517).json({
            success: false,
            err: error,
        });
    }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        let cartt = await Cart.find({ _id: req.params.cid });
        if (req.user.utype === "buyer") {
            result = await User.findByIdAndUpdate(
                { _id: req.user.id },
                { $pull: { cart: { _id: req.params.cid } } }
            );
            result = await User.findById({ _id: req.user.id });
        }
        await Cart.findByIdAndDelete({ _id: cartt[0]._id });
        return res.status(200).json({
            success: true,
            msg: "Cart item removed",
        });
    } catch (error) {
        return res.status(518).json({
            success: false,
            err: error,
        });
    }
};

exports.getCarts = async (req, res, next) => {
    try {
        let result = 0;
        if (req.user.utype === "buyer") {
            result = await User.findById({ _id: req.user.id });
            result = result.cart;
        }
        return res.status(200).json({
            success: true,
            cartitems: result,
        });
    } catch (error) {
        console.log(error);
        return res.status(330).json({
            success: false,
            ersr: error,
        });
    }
};

exports.getPostersAdmired = async (req, res, next) => {
    try {
        let result = 0;
        if (req.user.utype === "artist") {
            result = await Artist.findById({ _id: req.user.id });
            result = result.admires;
        }
        else {
            result = await User.findById({ _id: req.user.id });
            result = result.admires;
        }
        return res.status(200).json({
            success: true,
            posters: result,
        });
    } catch (error) {
        return res.status(519).json({
            success: false,
            err: error,
        });
    }
};

exports.getArtistsAdmired = async (req, res, next) => {
    try {
        let result = 0;
        if (req.user.utype === "artist") {
            result = await Artist.findById({ _id: req.user.id });
            result = result.admired_artists;
        }
        if (req.user.utype === "buyer") {
            result = await User.findById(req.user.id);
            result = result.admired_artists;
        }
        return res.status(200).json({
            success: true,
            posters: result.reverse(),
        });
    } catch (error) {
        return res.status(520).json({
            success: false,
            err: error,
        });
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        let result = 0;
        if (req.user.utype === "buyer") {
            result = await User.findById(req.user.id);
            result = result.order_history;
        }
        return res.status(200).json({
            success: true,
            orders: result,
        });
    } catch (error) {
        return res.status(520).json({
            success: false,
            err: error,
        });
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        let result = await Order.findById({ _id: req.params.oid });
        return res.status(200).json({
            success: true,
            order: result,
        });
    } catch (error) {
        return res.status(520).json({
            success: false,
            err: error,
        });
    }
};

exports.getSales = async (req, res, next) => {
    try {
        let result = await Artist.find({ username: req.params.aid });
        const postersSold = []
        let poster = 0
        for (let i = 0; i < result[0].postersmade.length; i++) {
            poster = await Poster.findById({_id:result[0].postersmade[i]._id})
            postersSold.push(poster)
        }
        return res.status(200).json({
            success: true,
            postersales: postersSold,
        });
    } catch (error) {
        console.log(error)
        return res.status(520).json({
            success: false,
            err: error,
        });
    }
};



exports.pay = async (req, res, next) => {
    try {
        let result = 0;
        let purchased_items = 0;
        let final_price = req.body.totalPrice
        let billing_adress = `${req.body.token.card.address_line1},${
            req.body.token.card.address_city
        },${req.body.token.card.address_zip}`
        let order_cr = null
        let order = {
            purchasedBy:null,
            purchased_items,
            billing_adress,
            total_price:final_price
        }

        if (req.user.utype === "buyer") {
            result = await User.findById(req.user.id);
            order.purchasedBy = [result.name,result.username,result.email,result.phone],
            order.purchased_items = result.cart;
            order_cr = await Order.create(order)
            //email order
            result = await User.findByIdAndUpdate({_id:req.user.id}
              ,{$push:{order_history:order_cr}})
            await User.findByIdAndUpdate({_id:req.user.id}
                ,{cart:[]})
            result.cart.map(async (ci)=>{
                await Poster.findByIdAndUpdate({_id:ci.item._id},
                    { $inc: { purchases: ci.quantity } })        
            })
            const price = req.body.totalPrice;
            const token = req.body.token;
            const idempotencyKey = v4();

            for (let i = 0; i < order_cr.purchased_items.length; i++) {
                let artis = order_cr.purchased_items[i].item.madeBy
                await Artist.findOneAndUpdate({username:artis},
                    { $inc: { total_profit: order_cr.purchased_items[i].price_with_quantity ,
                        current_week_sales: order_cr.purchased_items[i].price_with_quantity}
                })
                
            }


            
        let mailOptions = {
            from: "hello@elywalls.com",
            to: req.body.email,
            subject: "Thanks for the purchase",
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
                    <h2>Order details for ${result.name}'s purchases</h2>
                    
                    <h3>Billing address</h3>
                    <p>
                    ${req.body.token.card.address_line1},${
                        req.body.token.card.address_city
                    },${req.body.token.card.address_zip}</p>
                    <h3>Posters bought - ${order_cr.purchased_items.length}</h3>
                    <h3>${order_cr.purchased_items[0].item.title} X ${order_cr.purchased_items[0].quantity}... </h3>
                    <h3>Price</h3>
                    <p>Total amount - ${req.body.totalPrice} Rs</p>
                    <p>Order No. - ${order_cr._id}</p>
                    </div>
        
                    <small>
                        For assistance, please
                        <a href="mailto:elywalls@gmail.com">contact us</a>.
                    </small>
                </div>
            </body>
        </html>
    `,
            };
            await transporter.sendMail(mailOptions);
            return stripe.customers
            .create({
                email: token.email,
                source: token.id,
            })
            .then((customer) => {
                stripe.charges.create(
                    {
                        amount: price * 100,
                        currency: "inr",
                        customer: customer.id,
                        description: "Posters purchase bill",
                    },
                    { idempotencyKey }
                );
            })
            .then((response) => res.json(order_cr))
            .catch((err) => res.json({ err: err }));
    }
        return res.status(200).json({
            success: true,
            order: order_cr,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            err: error,
        });
    }
};

exports.createPosterIg = async (req, res, next) => {
    try {
        let result = 0;
        if (req.user.utype === "artist") {
            result = await Artist.findById({ _id: req.user.id });
            result = result.admires;
        }
        if (req.user.utype === "buyer") {
            result = await User.findById(req.user.id);
            result = result.admires;
        } //TODO add madeby to poster
        return res.status(200).json({
            success: true,
            poster_created: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error,
        });
    }
};

exports.getHeros = async (req, res, next) => {
    try {
    const ph = await Poster.find({}).limit(4).sort({ views: -1 });
   
        return res.status(200).json({
            success: true,
            heros: ph,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error,
        });
    }
};