const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
    if (!req.cookies.ssid){
        console.log('User not logged in')
        return next ();
    }

    Session.findOne({ cookieId: req.cookies.ssid })
    .then((sessionData) => {
        if (!sessionData){
            console.log('No session data found');
            return next ()
        }
        return next();
    })
    .catch((err) => {
        return next({
            log: `Error with sessionController.isLoggedIn: ${err}`,
            message: {
                err: 'Error occurred in sessionController.isLoggedIn'
            }
        })
    })
}

sessionController.startSession = (req, res, next) => {
    console.log('Starting session...');

    Session.create({ cookieId: res.locals.id }, (err, sessionData) => {
        if (err) {
            return next ({
                log: `Error with sessionController.startSession: ${err}`,
            message: {
                err: 'Error occurred in sessionController.startSession'
            }
            })
        }
        return next();
    })
}

module.exports = sessionController;
