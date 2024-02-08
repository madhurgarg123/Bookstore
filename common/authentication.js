const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "secret";
const User = require("../Models/user")


module.exports.getToken = (data) =>
    jwt.sign(data, SECRET_KEY, { expiresIn: "30 days" });


    
module.exports.verify = (...args) => async (req,res,next) =>{
    let  token  =req.headers['authorization']
    console.log("token",token)
    const roles = [].concat(args).map((role) => role.toLowerCase());
    console.log("roles",roles)

 try {
   if (!token) {
     throw new Error("Permission denied");
   }


   let decoded = await jwt.verify(token, SECRET_KEY);
   console.log("decoded",decoded)

   let doc = null;
        let role = "";
        if (roles.includes("user")) {
            role = "user";
            doc = await User.findOne({
                _id: decoded._id,
                accessToken: token
            });
        }
        if (roles.includes("admin")) {
            role = "admin";
            doc = await User.findOne({
                _id: decoded._id,
                accessToken: token,
            });
        }
        if (roles.includes("author")) {
            role = "author";
            doc = await User.findOne({
                _id: decoded._id,
                accessToken: token,
            });
        }
        if (!doc) throw new Error("INVALID_TOKEN");
        if (role) req[role] = doc.toJSON();
   console.log("decoded", decoded)
   console.log("req[role]", req[role])

   req.query = decoded._id;

   console.log("req.query", req.query)
     next();
   } 
  catch (err) {
   console.log(err);
 }
}