const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  feedBack: {
    type: String,
  },
});
module.exports = mongoose.model("feedBack", feedbackSchema);
