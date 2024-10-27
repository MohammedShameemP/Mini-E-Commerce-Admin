
const jwt = require('jsonwebtoken')

// create a user token function
const maxAge = 1 * 24 * 60 * 60;
exports.createAdminToken = (id) => {
    return jwt.sign({ id }, "user secret key", {
        expiresIn: maxAge,
    });
};


exports.requireUserAuth =(req,res,next)=>{
    const token= req.cookies.jwt;
    if (token) {
        jwt.verify(token, "user secret key", async (error, decodedToken) => {
            if (error) {
                console.log(error.message);
                res.redirect("/login");
            } else {
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};