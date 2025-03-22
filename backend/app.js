var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const cors = require('cors')
// mongoose.connect("mongodb://localhost:27017/suraDemo");
mongoose.connect("mongodb+srv://mohit:MohitDevda@atlascluster.j4nsjk6.mongodb.net/myAtlasDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB Atlas successfully!");
}).catch((error) => {
  console.error("Error connecting to MongoDB Atlas:", error);
});
const bodyparser = require('body-parser')
const port = process.env.PORT || 3000
const cron = require('node-cron');
const fs = require('fs');


var app = express();
app.use(cors());
app.use(bodyparser.json())

// admin's routerse import 
var adminRouter = require('./routes/admin/admin.route');
var categoryRouter = require('./routes/admin/category.route');
var customerListRouter = require('./routes/admin/customerList.route');
var adminProductRouter = require('./routes/admin/product.route');
var feedbackRouter = require('./routes/admin/feedback.route');
var occassionRouter = require('./routes/admin/occassion.route');
var orderHistoryRouter = require('./routes/admin/orderHistory.route');
var supportRouter = require('./routes/admin/support.route');
var flavourRouter = require("./routes/admin/flavour.routs")
var offerItemRouter = require("./routes/admin/offerItem.route");

// customer side routes import
var userRouter = require('./routes/customer/customer.route');
var cartRouter = require('./routes/customer/cart.route');
var productRouter = require('./routes/customer/product.route');
var orderRouter = require('./routes/customer/order.route');
var wishlistRouter = require('./routes/customer/wishlist.route');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Schedule a task to run every minute
cron.schedule('* * * * *', () => {
    const now = new Date();
    fs.appendFileSync('log.txt', `Cron job executed at: ${now}\n`);
    console.log('Cron job executed.');
});


// admin side routes
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);
app.use('/customerList', customerListRouter);
app.use('/feedback', feedbackRouter);
app.use('/occassion', occassionRouter);
app.use('/order-admin', orderHistoryRouter);
app.use('/admin-product', adminProductRouter);
app.use('/support-admin', supportRouter);
app.use('/admin-flavour',flavourRouter);
app.use('/offeritem',offerItemRouter);
// user side Routes
app.use('/customer', userRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);
app.use('/wishlist', wishlistRouter);

app.listen(port, () => {
    console.log("Server is running on port: ", port)
})


