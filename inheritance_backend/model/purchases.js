import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Set up AutoIncrement using mongoose-sequence
const AutoIncrement = mongooseSequence(mongoose);

// Extract Schema from mongoose
const { Schema } = mongoose;
const purchasesSchema = new Schema({
  category_name: {
    type: String,
    required: true,
  },
  series_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cost_price_single_unit: {
    type: Number,
    required: true,
  },
});
const purchasebillSchema = new Schema({
  seller_name: {
    type: String,
    required: true,
  },
  seller_email: {
    type: String,
    required: true,
  },
  // category_id:{
  //     type:Number,
  //     required:true
  // },
  purchases: [purchasesSchema],
  // series_id:{
  //     type:Number,
  //     required:true
  // },

  total_cost_price: {
    type: Number,
    required: true,
  },
  GST_percentage: {
    type: Number,
    required: true,
  },
  cost_price_tax_inclusive: {
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
    required: true,
  },
  payment_status: {
    type: String, //paid,pending,partially paid(EMI)
    required: true,
  },
  date_of_goods_recieved: {
    type: Date,
    required: true,
  },
});

purchasebillSchema.plugin(AutoIncrement, { inc_field: "purhcaseId" });

export default mongoose.model("Purchase", purchasebillSchema);
