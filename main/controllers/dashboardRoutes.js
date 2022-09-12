const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');
const date = new Date();

// Get all posts on dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
            where: {
                user_id: req.session.user_id,
            }
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });

    } catch (error) {
        res.status(400).json(error);
    }
})

// Get the new post handlebar
router.get('/new', withAuth, (req, res) => {
    res.render('newPost');
});

// Get the edit post handlebar
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id)

        const posts = postData.get({ plain: true });

        res.render('editPost', {
            posts,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;