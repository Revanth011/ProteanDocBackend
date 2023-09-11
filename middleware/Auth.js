const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    if (!req.headers["x-access-token"]) {
        return res.status(401).json({ "message": "Unauthorized" });
    }

    const accessToken = req.headers["x-access-token"];
    try {
        const payLoad = jwt.verify(accessToken, process.env.JWT_SECRET);
        res.locals.user = payLoad;
        next();
    } catch (err) {
        res.status(401).json({ "message": "Unauthorized" });
    }
}

module.exports = authentication;
