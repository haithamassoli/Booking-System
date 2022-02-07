const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
let User = mongoose.model("User", userSchema);

module.exports.model = User;
module.exports.schema = userSchema;
