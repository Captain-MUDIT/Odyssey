import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Set up AutoIncrement using mongoose-sequence
const AutoIncrement = mongooseSequence(mongoose);

// Extract Schema from mongoose
const { Schema } = mongoose;
const employeeSchema = new Schema({
  // unique_employee_id:{
  //     type:String,
  //     unique:true,
  //     required:true
  // },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  contact: {
    type: Number,
    unique: true,
    required: true,
  },
  emergency_contact: {
    type: Number,
    unique: true,
    required: true,
  },
  job_role: {
    //job_position
    type: String,
    required: true,
  },
  salary: {
    // annual CTC given by the company
    type: Number,
    required: true,
  },
  date_of_joining: {
    type: Date,
    required: true,
  },
  insurance_policies: {
    type: [String],
  },
  insurance_allowance: {
    type: Number,
  },
});
employeeSchema.plugin(AutoIncrement, { inc_field: "employeeId" });
export default mongoose.model("Employee", employeeSchema);
