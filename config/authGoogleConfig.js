const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models/user');
const _ = require('lodash');


//GoogleStrategy(object,callback function)
const strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, //google provided client id
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, //google provided secret key
    callbackURL: "http://localhost:3001/auth/google/redirect"
}, async (accessToken, refreshToken, profile, cb) => {
    //console.log(profile._json.email);
    let user = await User.findOne({ googleId: profile.id, email: profile._json.email });
    if (user) {
        //console.log("User Exist!");
        const token = user.generateJWT();
        const response = {
            user: _.pick(user, ["email", "_id"]),
            token: token,
        }
        cb(null, response); //cb(error,response)
    } else {
        user = new User({ googleId: profile.id, email: profile._json.email });
        await user.save();
        const token = user.generateJWT();
        const response = {
            user: _.pick(user, ["email", "_id"]),
            token: token,
        }
        cb(null, response);
        //console.log("New User Created!");
    }
})

passport.use(strategy);