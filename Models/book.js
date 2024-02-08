  const mongoose   = require('mongoose');
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
   
  const  BookSchema =   new Schema(
        {
         authors : [{type : String , default: ""}],
         sellCount:{type : Number , default: 0},
         title:{type : String , default: "" , unique: true },
         description:{type : String , default: ""},
         price:  {type : Number, default: 0},
         Ispurchased:{type :Boolean,default:false},
         isDeleted: { type: Boolean, default: false },
      },

        {timestamps: true}
    )


    module.exports = mongoose.model("BookModel", BookSchema);



 