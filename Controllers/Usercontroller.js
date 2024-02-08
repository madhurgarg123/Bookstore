const Auth = require("../common/authentication");
const Functions = require("../common/functions");
const User = require("../Models/user")
const Book = require("../Models/book");
const { ObjectId } = require('mongodb');
const purchaseHistory = require("../Models/purchaseHistory");
const { sellcount } = require("./authorController");
module.exports.login = async (req, res, next) => {
    try {
      const criteria = [];
      if (req.body.email) {
        criteria.push({ email: req.body.email });
        criteria.push({ "temp.email": req.body.email });
      } else if (req.body.phoneNo) {
        criteria.push({ phoneNo: req.body.phoneNo});
        criteria.push({ "temp.phoneNo": req.body.phoneNo });
      }
      const doc = await User.findOne({
        $or: criteria,
      });

      if (!doc) throw new Error("INVALID_CREDENTIALS"); 

      if (doc.password == req.body.password)

      {
        doc.accessToken = await Auth.getToken({ _id: doc._id, role: "admin" });
        await doc.save();

      }
      else {
        throw new Error("INVALID_CREDENTIALS");
      }
      return res.success("ACCOUNT_LOGIN_SUCCESSFULLY", accessToken);
    } catch (error) {
      next(error);
    }
  };

  module.exports.showAllBooks = async (req, res, next) => {
    try {
      const doc = await Book.find();
  
      return res.success("DATA_FETCHED", doc);
    } catch (error) {
      next(error);
    }
  };

  
  module.exports.buyNow = async (req, res, next) => {
    try {
          if (req.role == "user")
          {
      var  doc = await Book.findById(req.params.id);
          }
          else throw new Error("invalid user")

      if (!doc) throw new Error("Book is not available");
      
      if (req.body.amount >= doc.price )
      {

        doc.Ispurchased = true ;

        const criteria = { _id:  new ObjectId(req.params.id), isDeleted: false };
    
        var  doc1 = await Book.findOneAndUpdate(
          criteria,
          { $set: { Ispurchased: true }, $inc: { sellCount: 1 } },
          { new: true }
        );
        
   
        var doc2 = await purchaseHistory.create({bookId:doc1._id,
          userId: new ObjectId(req.query) ,
          purchaseDate:doc1.createdAt,
          price:doc1.price,
          quantity:doc1.sellCount
        })

      }
      else {
        throw new Error("insufficient balance")
      }

      return res.success("DATA_FETCHED", doc1);
    } catch (error) {
      next(error);
    }
  };

  module.exports.purchaseHistory = async (req, res, next) => {
    try {
      const doc = await purchaseHistory.find();
  
      return res.success("DATA_FETCHED", doc);
    } catch (error) {
      next(error);
    }
  };