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
      
        await doc.save();
        return res.success("SUCCESS", doc);

      }
      catch (error) {
        next(error);
      }
    } 

    module.exports.updateBookById = async (req, res, next) => {
      try {
        
        const { title, author, publicationYear } = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.userId },
      { title, author, publicationYear },
      { new: true }
    );
        
  
          return res.success("SUCCESS", book);
  
        }
        catch (error) {
          next(error);
        }
      } 

      module.exports.getAllBooks = async (req, res, next) => {
        try {
          
            const books = await Book.find();
          
            await doc.save();
            return res.success("SUCCESS", doc);
    
          }
          catch (error) {
            next(error);
          }
        } 

        module.exports.deleteBookById = async (req, res, next) => {
          try {
             
            const book = await Book.findOneAndDelete({ _id: req.params.id, ownerId: req.userId });

            
              return res.success("SUCCESS", book);
      
            }
            catch (error) {
              next(error);
            }
          } 
      
          module.exports.filteredBooks = async (req, res, next) => {
            try {
               
                const { author, publicationYear } = req.query;
              
                  const filters = {};
              
                  if (author) {
                    filters.author = author;
                  }
              
                  if (publicationYear) {
                    filters.publicationYear = parseInt(publicationYear, 10);
                  }
              
                  const books = await Book.find(filters);
                  res.status(200).json(books);
                } catch (err) {
                  res.status(500).json({ error: 'Error fetching books.' });
                }
              }
              
