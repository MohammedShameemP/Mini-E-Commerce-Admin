const { createUserToken, maxAge } = require("../middleware/middleware");
const Products = require("../models/products");
const Users = require("../models/users");



exports.postLogin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await users.login(username, email, password);
        
        res.redirect('/')
    } catch (error) {
        res.status(501).json({ error });
    }
};

// Define exports.status before referencing it in a route handler





exports.statusis = async (req, res) => {
    console.log("statusis");
    const { id } = req.params;
    console.log({id});

    try {
        const user = await Users.findById(id);
        if (user) {
            const update = { active: !user.active }; // Toggle active status
            await Users.findByIdAndUpdate(id, update);
        }
        res.redirect("/user");
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).send("Internal Server Error");
    }
};


exports.productsstatus = async (req, res) => {
	const { id } = req.params;

    console.log(req,"adadd")
	console.log({ id });

	try {
		const products = await Products.findById(id);
		if (products) {
			const update = { active: !products.active }; // Toggle active status
			await Products.findByIdAndUpdate(id, update);
		}
		res.redirect(`/productdetails?id=${id}`);
	} catch (error) {
		console.error("Error updating status:", error);
		res.status(500).send("Internal Server Error");
	}
};

