const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');
const dateInput = new Date().toLocaleDateString();

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
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

router.post('/new', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            date: dateInput,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
                date: dateInput,
            },
            {
                where: {
                    id: req.params.id,
                }
            });

        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;