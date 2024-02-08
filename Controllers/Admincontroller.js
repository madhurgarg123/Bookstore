const Auth = require("../common/authentication");
const Functions = require("../common/functions");
const User = require("../Models/user");

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
    return res.success("ACCOUNT_LOGIN_SUCCESSFULLY", accessToken);
  } catch (error) {
    next(error);
  }
};


   
 
  
  
  