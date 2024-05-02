  const mongoose   = require('mongoose');
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
  const user = require("./user");
   
  const  BookSchema =   new Schema(
        {
         authors : [{type : String , default: ""}],
         title:{type : String , default: "" , unique: true },
         publicationYear:{type: Number , default: 0 },
         owner: { type : mongoose.ObjectId, ref : user  },
         isDeleted: { type: Boolean, default: false },
      },

        {timestamps: true}
    )


    module.exports = mongoose.model("BookModel", BookSchema);



 