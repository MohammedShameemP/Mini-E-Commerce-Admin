const mongoose = require("mongoose");

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/mydatabase";

// Connect to MongoDB
const connectDB = async ()=>{
    mongoose.connect(mongoURI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});

}

module.exports = connectDB