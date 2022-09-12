const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments 
router.get('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [User],
        });

        const comments = commentData.map((comment) => comment.get({ plain: true}));

        console.log(comments)

        res.render('comment', {
            comments,
            logged_in: req.session.logged_in
        })

    } catch (err) {
        res.status(500).json(err);
    }
});

// Add comment to post
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            post_id: req.body.post_id,
            content: req.body.commentContent,
            user_id: req.session.user_id,
        });

        res.json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
