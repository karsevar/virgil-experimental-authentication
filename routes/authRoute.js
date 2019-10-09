const express = require('express');
const bcrypt = require('bcryptjs');

const userDb = require('./authModel.js');
const tokenGenerator = require('./tokenFunction.js');

const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json({message: 'auth route is working!!!'})
}); 



router.post('/register-coach', (req, res) => {
    let coach = req.body;

    const hash = bcrypt.hashSync(coach.password, 4);
    coach.password = hash

    userDb.addCoach(coach) 
        .then(results => {
            const token = tokenGenerator(coach);
            res.status(201).json({
                message: `Coach ${results} has been successfully added`,
                token
            })
        })
        .catch(error => {
            res.status(500).json({err: error})
        })
})

router.post('/login-coach', (req, res) => {
    let coach = req.body;

    userDb.findCoachByIdentity({identity: coach.identity})
        .first()
        .then(userInfo => {
            if(coach && bcrypt.compareSync(coach.password, userInfo.password)) {
                const token = tokenGenerator(userInfo);
                res.status(200).json({
                    userObject: userInfo,
                    token: token
                })
            } else {
                res.status(401).json({message: 'invalid username or password'})
            }
        })
        .catch(error => {
            res.status(500).json({message: `There was an error loggin in: ${error}`})
        })
})

router.post('/register-patient', (req, res) => {
    let patient = req.body;

    const hash = bcrypt.hashSync(patient.password, 4);
    patient.password = hash

    userDb.addPatient(patient) 
        .then(results => {
            console.log(patient)
            const token = tokenGenerator(patient);
            res.status(201).json({
                message: `Patient ${results} has been successfully added`,
                token
            })
        })
        .catch(error => {
            res.status(500).json({err: error})
        })
})

router.post('/login-patient', (req, res) => {
    let patient = req.body;

    userDb.findPatientByIdentity({identity: patient.identity})
        .first()
        .then(userInfo => {
            if(patient && bcrypt.compareSync(patient.password, userInfo.password)) {
                const token = tokenGenerator(userInfo)
                res.status(200).json({
                    userObject: userInfo,
                    token
                })
            } else {
                res.status(401).json({message: 'invalid username or password'})
            }
        })
        .catch(error => {
            res.status(500).json({message: `There was an error loggin in: ${error}`})
        })
})

module.exports = router;