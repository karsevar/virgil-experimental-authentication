const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, process.env.JSON_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: 'Invalid credentials'})
            }
            console.log(decodedToken)
            req.user = {identity: decodedToken.identity}
            next();
        })
    } else {
        res.status(401).json({message: 'No credentials provided. Please login to access this content'})
    }
}