import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Set up AutoIncrement using mongoose-sequence
const AutoIncrement = mongooseSequence(mongoose);

// Extract Schema from mongoose
const { Schema } = mongoose;

const inventorySchema = new Schema({
  // category_id:{
  //     type:Number,
  //     required:true
  // },
  category_name: {
    type: String,
    required: true,
  },
  series_name: {
    type: String,
    required: true,
  },
  // series_id:{
  //     type:Number,
  //     required:true
  // },
  quantity: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("inventory", inventorySchema);
