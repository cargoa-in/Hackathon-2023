const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser , registerVendor,loginVendor, getVendors ,orderedData , vendorsorder ,sendnotification , Getuser} = require('../controllers/authController')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)
router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/v_register',registerVendor);
router.post('/vendorlogin',loginVendor);
router.post('/getvendors', getVendors);
router.post('/order',orderedData);
router.post('/getorders',vendorsorder);
router.post('/notification',sendnotification);
router.post('/getuser',Getuser)
module.exports = router;