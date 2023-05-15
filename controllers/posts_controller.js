const Post = require('../models/posts');
const User = require('../models/user');
const Comments = require('../models/comments');

module.exports.create = async function (req, res) {

    try {
        let newPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        req.flash('success','post added');

        return res.redirect('back');

    }
    catch (err) { req.flash('error',err) }

    // finally{
    //     return res.redirect('back');
    // }

    // Post.create({
    //     content: req.body.content,
    //     user: req.user._id

    // })
    //     .then((postdata) => {
    //         console.log(`new post id ${postdata}`);
    //         return res.redirect('back');
    //     })
    //     .catch((err) => {
    //         console.log(`error in creating post ${err}`);
    //         return res.redirect('back');
    //     })
}


module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            let removedPost = await Post.findByIdAndRemove({ _id: req.params.id });
            let deletedComments = await Comments.deleteMany({ post: req.params.id });
            req.flash('success','post deleted')
        }

    }
    catch (err) {
        req.flash('error',err)
    }
    finally {
        return res.redirect('back');
    }


    // Post.findById(req.params.id).then(function(post){
    //     // .id means converting the object id into string
    //     if (post.user == req.user.id){
    //         Post.findByIdAndRemove({_id:req.params.id}).then((removedPost)=>{
    //             Comments.deleteMany({post: req.params.id}).then( function(deletedComments){

    //                 return res.redirect('back');
    //             });
    //         })


    //     }else{
    //         return res.redirect('back');
    //     }

}
