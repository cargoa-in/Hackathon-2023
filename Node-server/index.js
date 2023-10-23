const express = require('express');
const dontenv = require('dotenv').config()
const cors = require('cors');
const { mongoose } = require('mongoose')

const app = express();
app.use(express.json())
app.use('/', require('./routes/authRoutes'))
app.use("/files",express.static("files"))

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('database not connected', err))
    const multer = require("multer");

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./files");
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
      },
    });
    
    require("./model/user");
    const PdfSchema = mongoose.model("Order");
    const upload = multer({ storage: storage });
    
    app.post("/upload-files", upload.single("file"), async (req, res) => {
      //console.log(req.file);
    //   const title = req.body.title;
     const fileName = req.file.filename;
     const useremail = req.body.UserEmail;
     const vendoremail = req.body.vendorIds ;
     const productName = req.body.productName ;
     const quantity = req.body.quantity ;
     const dateOfShipping = req.body.dateOfshipping ;
     const dataOfShippingtwo = req.body.dateOfShippingtwo ;
     const dataOfShippingthree = req.body.dateOfShippingthree ;
        console.log(req.body)
      try {
        await PdfSchema.create({ useremail : useremail , vendoremail : vendoremail, productName : productName ,quantity : quantity,dateone:dateOfShipping,datetwo:dataOfShippingtwo, datethree : dataOfShippingthree, pdf: fileName });
        res.send({ status: "ok" });
      } catch (error) {
        res.json({ status: error });
      }
    });
    
    app.get("/get-files", async (req, res) => {
      try {
        PdfSchema.find({}).then((data) => {
          res.send({ status: "ok", data: data });
        });
      } catch (error) {}
    });  


const port = 9000;
app.listen(port, () => console.log(`server is running on port ${port}`))