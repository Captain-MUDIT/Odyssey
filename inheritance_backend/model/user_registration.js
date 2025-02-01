import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Set up AutoIncrement using mongoose-sequence
const AutoIncrement = mongooseSequence(mongoose);

// Extract Schema from mongoose
const { Schema } = mongoose;

const user_registrationSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  // contact_prefix:{
  //     type:Number,
  //     required:true
  // },
  contact: {
    type: String,
    required: true,
  },
});

user_registrationSchema.plugin(AutoIncrement, { inc_field: "userId" });

export default mongoose.model("User_detail", user_registrationSchema);
