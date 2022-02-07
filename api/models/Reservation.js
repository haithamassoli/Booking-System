const mongoose = require("mongoose");

let reservationSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  status: { type: Boolean, default: false },
});
let Reservation = mongoose.model("Reservation", reservationSchema);

module.exports.model = Reservation;
module.exports.schema = reservationSchema;
