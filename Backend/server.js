const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;

//import routes in enroll
const enrollRoutes = require(`./routes/Enrolls`);

//import routes in enrollKey
const enrollKeyRoutes = require(`./routes/EnrollKeys`);

//import routes in file
const file=require('./routes/StudentPayments');

app.use(cors());
app.use(bodyParser.json()); //app middleware

//route middleware
app.use(enrollKeyRoutes);
app.use(enrollRoutes);

app.use('/file',file)

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false

} );

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Mongodb Connection success!");
});


const subjectRoutes = require('./routes/subjects');
app.use(subjectRoutes);

const reportRoutes = require('./routes/report');
app.use(reportRoutes);
//app.use(report);



//const paymentRouter = require("./routes/Payments.js"); // import payments.js file 

//app.use("/payment",paymentRouter); //http://localhost:8070/payment
//app.use(paymentRouter); 

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});




