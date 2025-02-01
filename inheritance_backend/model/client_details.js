import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Set up AutoIncrement using mongoose-sequence
const AutoIncrement = mongooseSequence(mongoose);

// Extract Schema from mongoose
const { Schema } = mongoose;

const client_detailsSchema = new Schema({
  buyer_name: {
    type: String,
    required: true,
  },
  buyer_contact: {
    type: Number,
    unique: true,
    required: true,
  },
  buyer_email: {
    type: String,
    unique: true,
    required: true,
  },
  buyer_address: {
    type: String,
    unique: true,
  },
  buyer_gstin: {
    type: String,
    unique: true,
  },
  number_of_purchases: {
    type: Number,
    required: true,
  },
});

client_detailsSchema.plugin(AutoIncrement, { inc_field: "clientId" });

export default mongoose.model("Client_detail", client_detailsSchema);
