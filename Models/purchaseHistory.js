const mongoose   = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
 
const  purchaseHistorySchema =   new Schema(
      {
       bookId: { type: Schema.Types.ObjectId, ref: "bookModel" },
       userId: { type: Schema.Types.ObjectId, ref: "UserModel" },
       purchaseDate:  {type : Number, default: 0},
       price:  {type : Number, default: 0, validate: {
        validator: function(value) {
            return value >= 100 && value <= 1000;
        },}},
       quantity:{type : Number, default: 0},
       isDeleted: { type: Boolean, default: false },
    },

      {timestamps: true}
  )




  module.exports = mongoose.model("purchaseHistoryModel", purchaseHistorySchema);



