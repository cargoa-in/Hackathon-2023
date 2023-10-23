// import mongoose, { model } from 'mongoose'
const mongoose = require('mongoose');

const { Schema } = mongoose
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})
const vendorSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String ,
    user_email : String 
})

const OrderSchema = new Schema({
    // user_email : String ,
    // vendor_name : String ,
    
    useremail : String ,
    vendoremail : String,
    productName : String ,
    quantity : Number ,
    dateone : Date ,
    datetwo : Date ,
    datethree : Date,
    pdf: String,
    
})


const notification = new Schema({
    vendoremail : String ,
    Schedule : String 
})


const UserModel = mongoose.model('User', userSchema);

const VendorModel = mongoose.model('Vendor',vendorSchema);

const OrderModel = mongoose.model('Order',OrderSchema);

const NotificationModel = mongoose.model('Notification',notification);

module.exports = { UserModel , VendorModel , OrderModel , NotificationModel};