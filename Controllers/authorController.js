const Auth = require("../common/authentication");
const Functions = require("../common/functions");
const User = require("../Models/user");
const Book =require("../Models/book")
const purchaseHistory = require("../Models/purchaseHistory")
const EmailService= require("../services/emailNotification")

module.exports.login = async (req, res, next) => {
  try {
    const criteria = [];
    if (req.body.email) {
      criteria.push({ email: req.body.email });
      criteria.push({ "temp.email": req.body.email });
    } else if (req.body.phoneNo ) {
      criteria.push({ phoneNo: req.body.phoneNo });
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
    return res.success("ACCOUNT_LOGIN_SUCCESSFULLY", doc.accessToken);
  } catch (error) {
    next(error);
  }
};

  module.exports.addNewBook = async (req, res, next) => {
    try {
       
      const doc = await Book.create(req.body);
  
      console.log(doc);

      const totalUsers = await User.find();

    EmailService.send(totalUsers);
      
        await doc.save();
        return res.success("SUCCESS", doc);

      }
      catch (error) {
        next(error);
      }
    } 

 module.exports.purchaseHistory = async (req, res, next) => {
      try {
        const doc = await purchaseHistory.find();
    
        return res.success("DATA_FETCHED", doc);
      } catch (error) {
        next(error);
      }
    };
  
 module.exports.sellcount = async (req, res, next) => {
      try {
        const doc = await Book.findById(req.params.id);
    
        return res.success("DATA_FETCHED", doc.sellCount );
      } catch (error) {
        next(error);
      }
    };

