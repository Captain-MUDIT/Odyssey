import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Set up AutoIncrement using mongoose-sequence
const AutoIncrement = mongooseSequence(mongoose);

// Extract Schema from mongoose
const { Schema } = mongoose;

const bank_statementSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  flow: {
    // debit or credit
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  account_name: {
    // the account in which we debited to or credited from
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

bank_statementSchema.plugin(AutoIncrement, { inc_field: "statementId" });

export default mongoose.model("Bank_statement", bank_statementSchema);
