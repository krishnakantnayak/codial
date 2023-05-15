const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback:true
    },
    function(req, email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}).then(function(user)  {
            if (!user || user.password != password){
                // console.log('Invalid Username/Password');
                req.flash('error','Invalid Userame/Password')
                return done(null, false);
            }
            return done(null, user);

        }).catch((err)=>{
            req.flash('error','Unexpected Error')
            return done(err);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id).then(function(user){
        
        return done(null, user);
    }).catch((err)=>{
        console.log('Error in finding user --> Passport');
        return done(err);
    });
});

passport.chechAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        return res.redirect('/users/sign-in')
    }
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }

    next();
}



module.exports = passport;