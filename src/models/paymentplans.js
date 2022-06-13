const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentPlanSchema = new Schema({
    id:Number,
    name:String,
    interval:String,  
    isActive:Boolean
})

const PaymentPlan = mongoose.model("plan",PaymentPlanSchema);

module.exports = PaymentPlan;