import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Set up AutoIncrement using mongoose-sequence
const AutoIncrement = mongooseSequence(mongoose);

// Extract Schema from mongoose
const { Schema } = mongoose;

const user_companySchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  company_name: {
    type: String,
    unique: true,
    required: true,
  },
  gstin: {
    type: String,
    required: true,
  },
  date_of_incorporation: {
    type: Date,
    required: true,
  },
  office_address: {
    type: String,
    required: true,
  },
  access_allowed: {
    type: Number,
    default: 1,
    required: true,
  },
  emails_access_allowed: {
    type: [String], //array of strings
    required: true,
  },
  goods: {
    type: Boolean,
    required: true,
  },
  services: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("User_company", user_companySchema);
