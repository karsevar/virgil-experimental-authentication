const db = require('../data/dbConfig.js');

function addPatient(patient) {
    return db('patients')
        .insert(patient)
        .then(ids => {
            const [id] = ids;
            return id
        })
}

function findPatientByIdentity(filter) {
    return db('patients').where(filter)
}

function findCoachByIdentity(filter) {
    return db('coaches').where(filter)
}

function addCoach(patient) {
    return db('coaches')
        .insert(patient)
        .then(ids => {
            const [id] = ids;
            return id
        })
}

module.exports = {
    addPatient,
    findPatientByIdentity,
    findCoachByIdentity,
    addCoach
}