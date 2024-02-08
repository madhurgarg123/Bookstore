const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema(
  {
    userName: { type: String, default: "" },
    phoneNumber: { type: Number, default: 0 },
    email: { type: String, default: "" },
    role: { type: String, default: "" },
    password:{type :String, default:"" },
    accessToken:{type:String, default:"" },
    isDeleted: { type: Boolean, default: false },

  },
  { timestamps: true }
);

module.exports = mongoose.model("UserModel", UserSchema);
