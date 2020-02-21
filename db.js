const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { dbUrl, peopleDb } = require('./const.json');

const climberSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
});

const climbingAttemptsSchema = new Schema({
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    timeSpent: {
        type: Number,
        required: true
    }
});

const Climber = mongoose.model('Climber', climberSchema);

const ClimbingAttempts = mongoose.model('ClimbingAttempts',climbingAttemptsSchema)


mongoose.connect(`mongodb://${dbUrl}/${peopleDb}`,
    { useNewUrlParser: true }, (err) => {
        if (err) {
            console.error(err);
            console.log("An error occured when trying to connect, try again")
        } else {
            console.log('Connection has been Successful!');
        }
    });

module.exports = {
    "Climber": Climber,
    "ClimbingAttempts": ClimbingAttempts
};