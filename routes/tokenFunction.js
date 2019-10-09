const jwt = require('jsonwebtoken');

module.exports = (user) => {
    console.log(user)
    const payload = {
        identity: user.identity
    };

    console.log(payload)

    const secret = process.env.JSON_SECRET;
    // console.log(secret)

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}