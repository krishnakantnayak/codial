const User = require('../models/user');


module.exports.profile = async function (req, res) {
    try{
        let user=await User.findById(req.params.id);
        return res.render('user_profile', {
            title: 'Codeial | Profile',
            profile_user: user
        })
    }
    catch(err){console.log(err)}

    // User.findById(req.params.id)
    //     .then((user) => {
    //         return res.render('user_profile', {
    //             title: 'Codeial | Profile',
    //             profile_user: user
    //         })
    //     })

}

module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {

        try{
            let updattedUser=await User.findByIdAndUpdate(req.params.id, req.body);
            req.flash('success','updated');
        }
        catch(err){req.flash('error',err)}

        finally{
            return res.redirect('back');
        }

        // User.findByIdAndUpdate(req.params.id, req.body)
        //     .then(function (user) {
        //         return res.redirect('back');
        //     });
    } else {
        req.flash('error','Unauthorized')
        return res.status(401).send('Unauthorized');
    }
}



// render the sign up page
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}


module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    try{
        let finduser=await User.findOne({ email: req.body.email });
        if(!finduser){
            let newUser=await  User.create(req.body);
            return res.redirect('/users/sign-in');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err)
        return res.redirect('back');
    }

    // User.findOne({ email: req.body.email }).then((user) => {
    //     if (!user) {
    //         User.create(req.body).then(function (user) {
    //             return res.redirect('/users/sign-in');
    //         }).catch((err) => {
    //             console.log('error in creating user while signing up-----', err);
    //         });
    //     }
    //     else {
    //         console.log("Result :", user);

    //         return res.redirect('back');
    //     }

    // })
    //     .catch((err) => {
    //         console.log(err);
    //     });

}


// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success','Logged In Successfully')
    return res.redirect('/');
}

module.exports.signOut = function (req, res) {
    req.logout(function (err) {
        if (err) { console.log(`error in logging out is ${err}`) }
    })
    req.flash('success','Logged out')
    res.redirect('/');
}