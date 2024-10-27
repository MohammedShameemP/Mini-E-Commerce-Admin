const express = require("express");
const app = express();
const ejs = require("ejs");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const router = require("./router/router");

const PORT = 2002;

// connecting mongodb
connectDB();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.urlencoded());
app.use(router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
