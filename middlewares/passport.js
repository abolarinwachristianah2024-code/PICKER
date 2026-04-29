const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const consumerModel = require('../model/consumer');

// console.log(process.env.GOOGLE_CLIENT_SECRET)
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
        console.log('Profile:', profile)
        let consumer = await consumerModel.findOne({ email: profile._json.email });
// emails[0].value
        if(!consumer){
            consumer = new consumerModel({
                name: profile._json.name,
                phone: `${Math.floor(Math.random() * 1E8)}`,
                email: profile._json.email,
                password: ' ',
                profilePicture: profile._json.picture
            })
            await consumer.save()
        }
        return cb (null, consumer)
    } catch (error) {
        console.log('error signing up with google', error.message)
        return cb(null, error)
    }
  }
));
passport.serializeUser((consumer, cb) => {
  cb(null, consumer.id);
});

passport.deserializeUser(async(id, cb) => {
  const consumer = await consumerModel.findById(id);
  if(!consumer){
    return cb (new Error('user not found'), null)
  }
  cb(null, consumer);
});

const profile = passport.authenticate('google', {scope: ['profile', 'email']})

const loginProfile = passport.authenticate('google', { failureRedirect: '/login' })

module.exports = {passport, profile, loginProfile}
