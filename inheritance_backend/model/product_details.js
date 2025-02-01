import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Set up AutoIncrement using mongoose-sequence
const AutoIncrement = mongooseSequence(mongoose);

// Extract Schema from mongoose
const { Schema } = mongoose;

const product_detailsSchema = new Schema({
  // category_id:{
  //     type:Number,
  //     required:true
  // },
  category_name: {
    type: String,
    required: true,
  },
  // series_id:{
  //     type:Number,
  //     required:true
  // },
  series_name: {
    type: String,
    required: true,
  },
  //   unique_model_id: {
  //     type: String,
  //     unique: true,
  //     required: true,
  //   },
  //   hsnnumber: {
  //     type: Number,
  //   },
  cost_price: {
    type: Number,
    required: true,
  },
  selling_price: {
    type: Number,
    required: true,
  },
});
export default mongoose.model("Product_detail", product_detailsSchema);
