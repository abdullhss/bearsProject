const mongoose = require("mongoose");

const schema = mongoose.Schema;

const commentsSchema = new schema({
  Name: {
    type: String,
    required: true,
  },
  Comment: {
    type : String , 
    default : "" ,
  }
});

const Comments = mongoose.model("comments", commentsSchema);

module.exports = Comments;
