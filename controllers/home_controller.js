const Posts = require('../models/posts');
const User = require('../models/user');

module.exports.home = async function (req, res) {

    try {
        let posts = await Posts.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users= await User.find({});

        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: users
        });

    }
    catch (err) {
        console.log(`Eror is ${err}`);
    }
}
