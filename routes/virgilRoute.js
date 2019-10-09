const express = require('express');

const {VirgilCrypto, VirgilAccessTokenSigner} = require('virgil-crypto');
const {JwtGenerator} = require('virgil-sdk');

const authentication = require('./authentication.js');

const router = express.Router();

const virgilCrypto = new VirgilCrypto();
const appKey = virgilCrypto.importPrivateKey(process.env.APP_KEY);

const jwtGenerator = new JwtGenerator({
    appId: process.env.APP_ID,
    apiKey: appKey,
    apiKeyId: process.env.APP_KEY_ID,
    accessTokenSigner: new VirgilAccessTokenSigner(virgilCrypto),
    millisecondsToLive: 20 * 60 * 1000
});

router.get('/', authentication, (req, res) => {

    const virgilJwtToken = jwtGenerator.generateToken(req.user.identity);
    res.status(200).json({virgilToken: virgilJwtToken.toString()})
})

module.exports = router;