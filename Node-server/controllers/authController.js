const {UserModel , VendorModel , OrderModel , NotificationModel} = require('../model/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const { json } = require('express')
const multer = require("multer")
const express = require('express');
const app = express();

const test = require = (req, res) => {
    res.json('test is working')
}




// Ordered Schemma
const storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null,"./files");
    },
    filename : function(req,file , cb){
        const uniqueSuffix = Date.now()
        cb(null,uniqueSuffix+file.originalname)
    }
})
const upload = multer({storage:storage});
const orderedData = async (req,res)=>{
    try{
        //console.log(req.body)
        upload.single("file"),async(req,res)=>{
            console.log(req.file)
        }
        // const { ProductName , Quatity , dateOfShipping , dateOfShippingtwo , dateOfShippingthree , file} = req.body ;
        // console.log(req.body)
        // const order = await OrderModel.create({
        //     ProductName ,
        //     Quatity ,
        //     dateOfShipping,
        //     dateOfShippingtwo,
        //     dateOfShippingthree,
        //     file
        // })
        // return res.json(order)
    }catch(error){
        console.log(error)
    }
}


// get vender order
const vendorsorder = async (req , res )=>{
    try{
        const { useremail } = req.body;

        if(!useremail) {
            res.json('Field Missing')
        }
        
        const exist = await OrderModel.find({ vendoremail: useremail });
        console.log(exist);
        if(exist){
            res.json(exist)
        } else {
            res.json('Something went wrong')
        }
    }catch(error){
        console.log(error)
    }
}
// send notification 
const sendnotification = async (req , res) => {
    console.log(req.body)
    const { useremail , selectvendor} = req.body ;
    const vendoremail = useremail ;
    const Schedule = selectvendor ;
    try{
    const user = await NotificationModel.create({
        vendoremail,
        Schedule,
    })
    return res.json(user)
    }catch(error){
        console.log(error)
    }
}

//register function
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        }
        if (!password || password.lenght < 6) {
            return res.json({
                error: 'password is required and should be at least 6 charachter long'
            })
        }
        const exist = await UserModel.findOne({ email });
        if (exist) {
            return res.json({
                error: 'email is already taken'
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}
// register vendor

const registerVendor = async (req, res) => {
    try {
        const { name, email, password ,useremail } = req.body;
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        }
        if (!password || password.lenght < 6) {
            return res.json({
                error: 'password is required and should be at least 6 charachter long'
            })
        }
        const exist = await VendorModel.findOne({ email });
        if (exist) {
            return res.json({
                error: 'email is already taken'
            })
        }
        console.log(req.body)
        const hashedPassword = await hashPassword(password)
        const user = await VendorModel.create({
            name,
            email,
            password: hashedPassword,
            user_email : useremail
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

// Get Vendors
const getVendors = async (req, res) => {
    try {
        const { useremail } = req.body;

        if(!useremail) {
            res.json('Field Missing')
        }
        
        const exist = await VendorModel.find({ user_email: useremail });
        console.log(exist);
        if(exist){
            res.json(exist)
        } else {
            res.json('Something went wrong')
        }
    } catch(err) {
        console.log(err);
    }
}

//login function
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check user is exists 
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No User Found'
            })
        }
        //check password
        const match = await comparePassword(password, user.password)
        if (match) {
            res.json('password is match')
        }
    } catch (error) {
        console.log(error)
    }
}
// get user
const Getuser = async (req,res)=>{
    try{

        const email = req.body ;
        console.log(email)
        const getuser = await VendorModel.findOne({user_email:email})
        if(getuser){
            return  res.json(getuser)
        }
    }catch(error){
        console.log(error)
    }
}

// login vendor
const loginVendor = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check user is exists 
        const user = await VendorModel.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No User Found'
            })
        }
        //check password
        const match = await comparePassword(password, user.password)
        if (match) {
            res.json('password is match')
        }else{
           return res.json({error:'password is not match'})
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    test,
    registerUser,
    loginUser ,
    registerVendor ,
    loginVendor ,
    getVendors ,
    orderedData ,
    vendorsorder ,
    sendnotification ,
    Getuser
}