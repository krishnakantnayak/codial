const Post = require('../models/posts');
const Comments = require('../models/comments');


module.exports.create = async function (req, res) {

    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comments.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            post.comments.push(comment);
            post.save();
            req.flash('success','comment added')

        }
    }
    catch (err) {
        console.log(`error in creating comment ${err}`)
    }
    finally {
        res.redirect('/');
    }

    // Post.findById(req.body.post)
    //     .then((post) => {
    //         if (post) {
    //             Comments.create({
    //                 content: req.body.content,
    //                 post: req.body.post,
    //                 user: req.user._id
    //             }).then((comment) => {
    //                 post.comments.push(comment);
    //                 post.save();

    //                 res.redirect('/');
    //             })
    //         }

    //         else {
    //             res.redirect('/');
    //         }
    //     })
}


module.exports.destroy = async function (req, res) {

    try{
        let comment=await Comments.findById(req.params.id);
        if (req.user.id == comment.user) {
            let postid = comment.post;
            let deletedComment = await Comments.findByIdAndDelete(req.params.id);
            let updatedPost = await Post.findByIdAndUpdate(postid, { $pull: { comments: req.params.id } });
            req.flash('success' , 'Comment deleted')
        }
    }
    catch(err){
        req.flash('error' , err)
    }
    finally{
        return res.redirect('back');
    }
    // Comments.findById(req.params.id)
    //     .then((comment) => {
    //         if (req.user.id == comment.user) {
    //             let postid = comment.post;
    //             Comments.findByIdAndDelete(req.params.id)
    //                 .then((deletedComment) => {
    //                     Post.findByIdAndUpdate(postid, { $pull: { comments: req.params.id } });
    //                     return res.redirect('back');
    //                 })
    //         }
    //         else {
    //             return res.redirect('back');
    //         }
    //     })
}