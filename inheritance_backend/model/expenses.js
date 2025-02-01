import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Set up AutoIncrement using mongoose-sequence
const AutoIncrement = mongooseSequence(mongoose);

// Extract Schema from mongoose
const { Schema } = mongoose;

const expensesSchema = new Schema({
  description: {
    // employee_salary,purchases,office_space,electricity_bill,company_events,bonus_given,businees_trips,client_meetings,total_insurance_given,tax_paid
    type: String,
    unique: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Expense", expensesSchema);
