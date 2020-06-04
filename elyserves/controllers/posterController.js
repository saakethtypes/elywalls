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
const static_id_p = "5ed11ac6b5a7ab1bad0752f7"  
const static_id_ps = "5ed11b2eca5f881c2719cb90"
const static_id_g = "5ed11b2dca5f881c2719cb8c"
const static_id_t = "5ed11b2dca5f881c2719cb8e"
const dotenv = require('dotenv')
const {v4} = require('uuid');
dotenv.config({ path: "../config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET)

exports.createPoster = async (req, res, next) => {  
  //TODO rename file and check dimmensions in react with tags 
  try {
    console.log("uploading..")
    if(req.files === null){
      return res.json({msg:"No file uploaded"})
    } 
    const poster = {
        "title":req.body.title,
        "pictureURL":String(req.file.path),
        "category":req.body.category,
        "tags":req.body.tags,
        "price":req.body.price,
        "madeBy":req.body.madeBy,
        "caption":req.body.caption
    }
    const new_poster = await Poster.create(poster)

        //pushing to artist works    
    const art_made = await Artist.findByIdAndUpdate({_id:req.user.id},
      {$push:{postersmade:new_poster}})
    

    console.log("pushed")

    //pushing to specific category
    if(req.body.category=="Photoshop"){
      await Photoshop.findByIdAndUpdate({_id:mongodb.ObjectId(static_id_ps)}
      ,{$push:{ items:new_poster}})
    }if(poster.category==='Graphic'){
      await Graphic.findByIdAndUpdate({_id:mongodb.ObjectId(static_id_g)}
      ,{$push:{ items:new_poster}})
    }if(poster.category==='Textography'){
      await Textography.findByIdAndUpdate({_id:mongodb.ObjectId(static_id_t)}
      ,{$push:{ items:new_poster}})
    }if(poster.category==='Photography'){
      await Photography.findByIdAndUpdate({_id:mongodb.ObjectId(static_id_p)}
      ,{$push:{ items:new_poster}})
    }
    return res.status(201).json({
      success: true,
      poster_created: new_poster
    });
  } catch(error) {
    if (error.name === "ValidationError") {
      const msgs = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        err: msgs
      });
    } else {
      return res.status(507).json({
        success: false,
        err: error
      });
    }
  }
};

exports.getPostersAll = async (req, res, next) => {
  try {
    const result = await Poster.find({});
    return res.status(200).json({
      success: true,
      posters: result
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err
    });
  }
};

exports.deletePoster = async (req, res, next) => {
  try {
    await Poster.findByIdAndDelete({_id:req.params.posterId});
    return res.status(200).json({
      success: true,
      msg: "Poster has been deleted"
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err
    });
  }
};

exports.editPoster = async (req, res, next) => {
  try {
    await Poster.findByIdAndUpdate({_id:req.params.posterId},{title:req.body.title,caption:req.body.caption});
    return res.status(200).json({
      success: true,
      msg:"Poster has been updated"
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      err: error
    });
  }
};

exports.getPoster = async (req, res, next) => {
  try {
    const result = await Poster.findById({_id:req.params.posterId});
    await Poster.findByIdAndUpdate({_id:req.params.posterId}
      ,{ $inc: { views: 1 } })
    return res.status(200).json({
      success: true,
      poster:result
    });
  } catch (error) {
    return res.status(502).json({
      success: false,
      erssr: error
    });
  }
};

exports.getPostersPhotoshop = async (req, res, next) => {
  try {
    let result = await Photoshop.find({});
    result = result[0].items
    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(504).json({
      success: false,
      err: error
    });
  }
};

exports.getPostersGraphic = async (req, res, next) => {
  try {
    let result = await Graphic.find({});
    result = result[0].items

    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      err: error
    });
  }
};

exports.getPostersPhotography = async (req, res, next) => {
  try {
    let result = await Photography.find({});
    result = result[0].items
    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(505).json({
      success: false,
      err: error
    });
  }
};

exports.getPostersTextography = async (req, res, next) => {
  try {
    let result = await Textography.find({});
    result = result[0].items

    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(506).json({
      success: false,
      err: error
    });
  }
};

exports.getPostersFeatured =  async (req, res, next) => {
  try {
    const result = await Poster.find({featured:false});
    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(508).json({
      success: false,
      err: error
    });
  }
};

exports.getPostersTopSelling = async (req, res, next) => {
  try {
    const result = await Poster.find({bestSeller:true});
    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(509).json({
      success: false,
      err: error
    });
  }
};

exports.getPostersLatest = async (req, res, next) => {
  try {
    const result = await Poster.find({}).sort({createdAt: -1}).limit(20);
    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(510).json({
      success: false,
      err: error
    });
  }
};

exports.getPostersInstafamous = async (req, res, next) => {
  try {
    const result = await Poster.find({instafamous:true});
    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(511).json({
      success: false,
      err: error
    });
  }
};

exports.getArtist = async (req, res, next) => {
  try {
    const result = await Artist.find({username:req.params.auname});
    await Artist.findByIdAndUpdate({_id:result[0]._id},
      { $inc: { profileViews: 1 } })
    return res.status(200).json({
      success: true,
      artist:result
    });
  } catch (error) {
    return res.status(512).json({
      success: false,
      err: error
    });
  }
};

exports.admirePoster = async (req, res, next) => {
  try {
    let result =0
    let user = 0 
    await Poster.findByIdAndUpdate({_id:req.params.posterId}
      ,{ $inc: { admires: 1 } });
     result = await Poster.findById(req.params.posterId)
    if(req.user.utype==='buyer'){
      user  = await User.findByIdAndUpdate({_id:req.user.id},
        {$push:{admires:result}})
        console.log(user.admires.length)
    }else{
      user  = await Artist.findByIdAndUpdate({_id:req.user.id},
        {$push:{admires:result}})     
    }
    return res.status(200).json({
      success: true,
      posters:result.posterId,
      user : user
    });
  } catch (error) {
    return res.status(513).json({
      success: false,
      err: error
    });
  }
};

exports.unadmirePoster = async (req, res, next) => {
  try {
    let result = 0
    let user =0 
      await Poster.findByIdAndUpdate({_id:req.params.posterId}
      ,{ $inc: { admires: -1 } });
    result = await Poster.findById(req.params.posterId) 

    if(req.user.utype==='buyer'){
      user = await User.findByIdAndUpdate({_id:req.user.id},
        {$pull:{admires:{_id:req.params.posterId}}})
    }else{
      user  = await Artist.findByIdAndUpdate({_id:req.user.id},
        {$pull:{admires:{_id:req.params.posterId}}})     
    }
    return res.status(200).json({
      success: true,
      user:user
    });
  } catch (error) {
    return res.status(514).json({
      success: false,
      err: error
    });
  }
};

exports.admireArtist = async (req, res, next) => {
  try {
      await Artist.findByIdAndUpdate({_id:req.params.artistId}
      ,{ $inc: { admires: 1 } });
    const result = await Artist.findById(req.params.artistId)  
    if(req.user.utype==='buyer'){
      await User.findByIdAndUpdate({_id:req.user.id},
        {$push:{admired_artists:result}})
    }else{
      await Artist.findByIdAndUpdate({_id:req.user.id},
        {$push:{admired_artists:result}})     
    }
    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(515).json({
      success: false,
      err: error
    });
  }
};

exports.unadmireArtist = async (req, res, next) => {
  try {
      await Artist.findByIdAndUpdate({_id:req.params.artistId}
      ,{ $inc: { admires: -1 } });
    const result = await Artist.findById(req.params.artistId)  
    if(req.user.utype==='buyer'){
      await User.findByIdAndUpdate({_id:req.user.id},
        {$pull:{admired_artists:{_id:req.params.artistId}}})
    }else{
      await Artist.findByIdAndUpdate({_id:req.user.id},
        {$pull:{admired_artists:{_id:req.params.artistId }}})     
    }
    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(516).json({
      success: false,
      err: error
    });
  }
};

exports.addToCart = async (req, res, next) => {
  console.log("add")
  try {
    const poster = await Poster.findById({_id:req.params.posterId});
    console.log("addcart",req.params.posterId)
    let cart_cr = await Cart.create({item:poster})
    cart_cr = await Cart.find({_id:cart_cr._id})
    let result = 0
    if(req.user.utype==="artist"){
       result = await Artist.findByIdAndUpdate({_id:req.user.id},{$push:{ cart: cart_cr[0]}})
       result = await Artist.findById({_id:req.user.id}) 
       console.log(result.cart.length)

      }
    if(req.user.utype==="buyer"){
      result = await User.findByIdAndUpdate({_id:req.user.id},{$push:{ cart: cart_cr[0]}})
      result = await User.findById({_id:req.user.id}) 
    }
    return res.status(200).json({
      success: true,
      cartObj: cart_cr,
    });
  } catch (error) {
    return res.status(517).json({
      success: false,
      err: error
    });
  }
};

exports.cartQuantity = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate({_id:req.params.cartId},
      {quantity:req.body.q,price_with_quantity:req.body.pwq});

    if(req.user.utype==="artist"){
        result = await Artist.updateOne({_id:req.user.id,cart: 
          { $elemMatch: { _id: req.params.cartId }
        }},
          { $set:{ 'cart.$.quantity':req.body.q , 'cart.$.price_with_quantity':req.body.pwq}}
          )
       }
    if(req.user.utype==="buyer"){
      result = await User.updateOne({_id:req.user.id,cart: 
        { $elemMatch: { _id: req.params.cartId }
      }},
        { $set:{ 'cart.$.quantity':req.body.q , 'cart.$.price_with_quantity':req.body.pwq}}
        )
    }
    return res.status(200).json({
      success: true,
      msg:"Cart quantity updated"
    });
  } catch (error) {
    return res.status(517).json({
      success: false,
      err: error
    });
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    console.log("removing")
    let cartt = await Cart.find({_id:req.params.cid})
    console.log("remove",cartt)

    if(req.user.utype==="artist"){
      result = await Artist.findByIdAndUpdate({_id:req.user.id},
        { $pull: { cart: {_id:req.params.cid}}})
      result = await Artist.findById({_id:req.user.id})
 
      console.log(result.cart.length)
     }
   if(req.user.utype==="buyer"){
    result = await User.findByIdAndUpdate({_id:req.user.id},
      { $pull: { cart: cartt}})
     result = await User.findById({_id:req.user.id}) 
   }
    await Cart.findByIdAndDelete({_id:cartt[0]._id}) 
    return res.status(200).json({
      success: true,
      msg: "Cart item removed",
    });
  } catch (error) {
    return res.status(518).json({
      success: false,
      err: error
    });
  }
};
 
exports.getCarts = async (req, res, next) => {
  console.log("cartget")
  try {
    let result = 0
    console.log("getting") 
    if(req.user.utype==="artist"){
       result = await Artist.findById({_id:req.user.id}) 
       result = result.cart
      }
    if(req.user.utype==="buyer"){
      result = await User.findById({_id:req.user.id}) 
      result = result.cart
    }
    return res.status(200).json({
      success: true,
      cartitems: result
    });
  } catch (error) {
    console.log(error)
    return res.status(330).json({
      success: false,
      ersr: error
    });
  }
};


exports.getPostersAdmired = async (req, res, next) => {
  try {
    console.log("im here")
    let result = 0
    if(req.user.utype==="artist"){
      result = await Artist.findById({_id:req.user.id})
      result = result.admires
     }
   if(req.body.utype==="buyer"){
     result = await User.findById(req.user.id)
     result = result.admires  
   }
    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(519).json({ 
      success: false,
      err: error
    });
  }
};

exports.getArtistsAdmired = async (req, res, next) => {
  try {
    let result = 0
    if(req.user.utype==="artist"){
      result = await Artist.findById({_id:req.user.id})
      result = result.admired_artists
     }
   if(req.body.utype==="buyer"){
     result = await User.findById(req.user.id)
     result = result.admires  
   }
    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(520).json({
      success: false,
      err: error
    });
  }
};

exports.pay = async (req, res, next) => {
  try {

    let result = 0

    if(req.user.utype==="artist"){
      // let artist = await Artist.findById(req.user.id)
      // let cart_items = artist.cart
     
        //  TODO for each cart.item update its purchases by cart.quantity
        //  this proved the top selling functionanlity
        //create order and push to orderhistory 
        //email order
      // result = await Artist.findByIdAndUpdate({_id:req.user.id}
      //   ,{$push:{bought_posters:cart_items}})
      //   await Artist.findByIdAndUpdate({_id:req.user.id}
      //     ,{cart:[]})
        console.log(req.body.token)
        console.log(req.body.totalPrice)
      const price = req.body.totalPrice
      const token = req.body.token
      console.log(price,token)
      const idempotencyKey = v4();
      
      return stripe.customers.create({
        email: token.email,
        source: token.id
      }).then(customer => {
        stripe.charges.create({
          amount: price * 100,
          currency: 'INR',
          customer: customer.id,
          description:"Posters purchase bill"}
          ,{idempotencyKey}) 
      }).then(
        response => res.json(response)
      ).catch(err=>res.json({err:err}))
     }
   if(req.body.utype==="buyer"){
     result = await User.findById(req.user.id)
     result = result.admires  
   }
    return res.status(200).json({
      success: true,
      posters:result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      err: error
    });
  }
};

exports.createPosterIg = async (req, res, next) => {
  try {
    let result = 0
    if(req.user.utype==="artist"){
      result = await Artist.findById({_id:req.user.id})
      result = result.admires
     }
   if(req.body.utype==="buyer"){
     result = await User.findById(req.user.id)
     result = result.admires  
   }//TODO add madeby to poster
    return res.status(200).json({
      success: true,
      poster_created:result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      err: error
    });
  }
};









