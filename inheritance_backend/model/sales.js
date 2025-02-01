import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Set up AutoIncrement using mongoose-sequence
const AutoIncrement = mongooseSequence(mongoose);

// Extract Schema from mongoose
const { Schema } = mongoose;

const salesSchema = new Schema({
  category_name: {
    type: [String],
    required: true,
  },
  series_name: {
    type: String,
    required: true,
  },
  // unique_model_id: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
  quantity: {
    type: Number,
    required: true,
  },
  selling_price: {
    type: Number,
    required: true,
  },
});
const billSchema = new Schema({
  buyer_name: {
    type: String,
    required: true,
  },
  buyer_contact: {
    type: Number,
    required: true,
  },
  buyer_email: {
    type: String,
    required: true,
  },
  buyer_address: {
    type: String,
  },
  buyer_gstin: {
    type: String,
  },
  // category_id:{
  //     type:Number,
  //     required:true
  // },
  // series_id:{
  //     type:Number,
  //     required:true
  // },
  sales: [salesSchema],
  total_selling_price: {
    type: Number,
    required: true,
  },
  GST_percentage: {
    type: Number,
    required: true,
  },
  selling_price_tax_inclusive: {
    type: Number,
    required: true,
  },
  date_of_billing: {
    type: Date,
    required: true,
  },
  payment_method: {
    // emi,one time
    type: String,
    required: true,
  },
  date_of_payment: {
    type: Date,
    default: Date.now,
    required: true,
  },
  payment_status: {
    type: String, //recieved,pending,partially recieved(EMI)
    required: true,
  },
});

billSchema.plugin(AutoIncrement, { inc_field: "salesId" });

export default mongoose.model("Bill", billSchema);
