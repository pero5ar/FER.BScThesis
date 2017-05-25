/*const passport = require('passport');
const config = require('../config');
const h = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id); //string unique ID key
    });

    passport.deserializeUser((id, done) => {
        //find the user using the _id
        h.findById(id).then(function (user) {
                done(null, user).catch(error => console.log('Error trying to connect'))
            }
        )
    });
    let authProcessor = (accessToken, refreshToken, profile, done) => {
        //Find a user in the local db using profile.id
        //If the user is found, return the user data the done()
        //If the user profile is not found, create one in the local db and return
        h.findOneUser(profile.id).then(function (result) {
            if(result) {
                done(null, result);
            } else {
                // Create a new user and return
                h.createNewUser(profile).then(function (newChatUserMade){
                    done(null, newChatUserMade).catch(function (error) {
                        {
                            console.log('Create New User Error');
                        }
                    });
                });
            }
        });

    };
    passport.use(new FacebookStrategy(config.fb, authProcessor));

};
*/