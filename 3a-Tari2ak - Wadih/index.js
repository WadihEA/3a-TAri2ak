// runs on port 3002
const express = require("express");
const connection = require("./config/database.config");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

var UserRoute = require('./route/user.route');
var DriverRoute = require('./route/driver.route');


app.use('/', UserRoute);

app.use('/driver', DriverRoute);

const PORT = 3002;
app.listen(PORT);

console.log(`Server is running on ${PORT}`);
