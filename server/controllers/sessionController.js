const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
    if (!req.cookies.ssid){
        return next ({
            //enter message
        })
    }

    Session.findOne({ cookieId: req.cookies.ssid })
    .then((sessionData) => {
        if (!sessionData){
            return next ({
                //enter message
            })
        }
        return next();
    })
    .catch((err) => {
        return next({
            //enter err message 
        })
    })
}

sessionController.startSession = (req, res, next) => {
    console.log('Starting session...');

    Session.create({ cookieId: res.locals.id }, (err, sessionData) => {
        if (err) {
            return next ({
                //enter message
            })
        }
        return next({
            //err message
        })
    })
}

module.exports = sessionController;