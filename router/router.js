const express = require("express");
const upload = require("../controllers/multer");
const { statusis, productsstatus } = require("../controllers/auth");
const Admin = require("../models/admin");
const Users = require("../models/users");
const Products = require("../models/products");
const { createAdminToken, requireUserAuth } = require("../middleware/middleware");
const router = express.Router();
const maxAge = 1 * 24 * 60 * 60;

router.get("/", (req, res) => {
	res.render("login", { error: "" });
});

router.get("/login", (req, res) => {
	res.redirect("/");
});

router.post("/login", async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;

		console.log(req.body, "req.body");
		const admin = await Admin.findOne({ username, password });
		console.log("admin =", admin);
		if (admin) {
			const token = createAdminToken(admin._id);
			console.log({ token });
			res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
			res.redirect("/adminpage");
		} else {
			res.render("login", { error: "Admin not found" });
		}
	} catch (error) {
		console.log("user not exist ", error);
	}
});

router.get("/adminpage",requireUserAuth, async (req, res) => {
	try {
		const allUsers = await Users.find();
		res.render("admin", {  users: allUsers });
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).send("Internal Server Error");
	}
});
router.post("/logout", (req, res) => {
	res.cookie("jwt","",{maxAge:1})
    res.redirect('/')
});

router.get("/addProduct", (req, res) => {
	res.render("newproduct");
});
router.get("/sign", (req, res) => {
	res.render("signup");
});

router.post("/addpro", upload.single("image"), async (req, res) => {
	try {
		console.log("req body =", req.body);
		const { name, price, details } = req.body;
		const image = req.file.filename;
		console.log({ image });

		const newProduct = new Products({ name, price, details, image });
		await newProduct.save();
		console.log({ newProduct });
		res.redirect("/allproducts");
	} catch (error) {
		console.error("Error adding product:", error);
		res.status(500).send("Internal Server Error");
	}
});

router.get("/edit/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const item = await Products.findById(id);
		if (!item) {
			// Handle if the product is not found
			return res.status(404).send("Product not found");
		}
		res.render("edit", { item }); // Pass 'item' to the edit.ejs
	} catch (error) {
		console.error("Error fetching product:", error);
		res.status(500).send("Internal Server Error");
	}
});

router.post("/editproduct/:id", upload.single("image"), async (req, res) => {
    const { id } = req.params;
    console.log({ id });
    const { name, price, details } = req.body;
    console.log({ name, price, details });
    console.log(req.file);
    let image;
    try {
        const product = await Products.findById(id);
        if (req.file) {
            image = req.file.filename;
        } else {
            image = product.image;
        }

        const updatedProduct = await Products.findByIdAndUpdate(id, { name, price, details, image });
        console.log({ updatedProduct });
        res.redirect(`/productdetails?id=${id}`);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/user", async (req, res) => {
	const allUsers = await Users.find();
	res.render("admin", {  users: allUsers });
});

router.post("/status/:id", statusis); // Reference exports.status here

router.post("/productstatus/:id", productsstatus);

router.get("/allproducts", async (req, res) => {
	const allProducts = await Products.find();
	res.render("allproducts", { allProducts });
});

router.get("/addpr", (req, res) => {
	res.render("newproduct");
});

router.post("/signout", (req, res) => {
	res.cookie("jwt","",{maxAge:1})
    res.redirect('/')
});

router.get("/productdetails/", async (req, res) => {
	console.log("its details");
	const id = req.query.id;
	console.log({ id });
	const item = await Products.findById(id);
	console.log(item);
	res.render("productdetails", { item });
});

router.get("/signup", (req, res) => {
	res.render("signup");
});

router.post("/newsignup", (req, res) => {
	console.log(true);
	try {
		console.log(req.body, "its a req");
		const { username, phonenumber, email, password } = req.body;
		const newsign = new Users({ username, phonenumber, email, password });
		newsign.save()
			
			.then((Users) => {
				console.log("new user are signin", Users);
				res.redirect("/");
			})
			.catch((err) => {
				console.log("user are not found", err);
				res.status(400).json({
					status: true,
					message: "it has a error",
				});
			});
	} catch (error) {
		console.log(error, "error");
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
