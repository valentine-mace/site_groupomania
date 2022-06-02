const express = require('express');
const router = express.Router();
const users = require('../services/users');

//initialisation de la base de données avec création des tables
router.get('/initialize', async function(req, res, next) {
  try {
    res.json(await users.initializeWebsite(req.query.page));
  } catch (err) {
    console.error(`Error while initializing `, err.message);
    next(err);
  }
});


//récupérer tous les utilisateurs
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.get('/:userId', async function(req, res, next) {
  try {
    res.json(await users.getUser(req.params.userId,req.query.page));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

//créer un compte utilisateur
router.post('/signup', async function(req, res, next) {
  try {
    res.json(await users.createUser(req.body));
  } catch (err) {
    console.error(`Error while creating new user`, err.message);
    next(err);
  }
});

//se connecter
router.post('/login', async function(req, res, next) {
  try {
    res.json(await users.findUser(req.body));
  } catch (err) {
    console.error(`Error while finding user`, err.message);
    next(err);
  }
});

//supprimer un compte utilisateur
router.delete('/:userId', async function(req, res, next) {
  try {
    res.json(await users.deleteUser(req.params.userId));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

//modifier un compte utilisateur
router.put('/:userId', async function(req, res, next) {
  try {
    res.json(await users.updateUser(req.params.userId, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

// upload.single('image')
//poster un post
router.post('/:userId/post', async function(req, res, next) {
  try {
    res.json(await users.createPost(req.params.userId,req.body));
  } catch (err) {
    console.error(`Error while creating post`, err.message);
    next(err);
  }
});

//récupérer tous les posts
router.get('/:userId/posts', async function(req, res, next) {
  try {
    res.json(await users.getAllPosts(req.params.userId,req.query.page));
  } catch (err) {
    console.error(`Error while getting posts `, err.message);
    next(err);
  }
});

//récupérer un post
router.get('/:userId/post/:id', async function(req, res, next) {
  try {
    res.json(await users.getPost(req.params.userId,req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error while getting post `, err.message);
    next(err);
  }
});

//supprimer un post
router.delete('/:userId/post/:id', async function(req, res, next) {
  try {
    res.json(await users.deletePost(req.params.userId, req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error while deleting post `, err.message);
    next(err);
  }
});

router.put('/:userId/post/:id', async function(req, res, next) {
  try {
    res.json(await users.updatePost(req.params.userId, req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating post`, err.message);
    next(err);
  }
});

//poster un post
router.post('/:userId/post/:postId/comment', async function(req, res, next) {
  try {
    res.json(await users.createComment(req.params.userId, req.params.postId, req.body));
  } catch (err) {
    console.error(`Error while creating comment`, err.message);
    next(err);
  }
});

router.delete('/:userId/post/:postId/comment/:commentId', async function(req, res, next) {
  try {
    res.json(await users.deleteComment(req.params.userId, req.params.postId, req.params.commentId, req.query.page));
  } catch (err) {
    console.error(`Error while deleting comment `, err.message);
    next(err);
  }
});

//récupérer tous les posts
router.get('/:userId/post/:postId/comments', async function(req, res, next) {
  try {
    res.json(await users.getAllComments(req.params.userId, req.params.postId, req.query.page));
  } catch (err) {
    console.error(`Error while getting comments `, err.message);
    next(err);
  }
});

router.post('/:userId/post/:id/like', async function(req, res, next) {
  try {
    res.json(await users.likePost(req.params.userId, req.params.id, req.body));
  } catch (err) {
    console.error(`Error while liking post`, err.message);
    next(err);
  }
});

router.post('/:userId/post/:id/dislike', async function(req, res, next) {
  try {
    res.json(await users.dislikePost(req.params.userId, req.params.id, req.body));
  } catch (err) {
    console.error(`Error while disliking post`, err.message);
    next(err);
  }
});

router.get('/:userId/post/:postId/likes', async function(req, res, next) {
  try {
    res.json(await users.getAllLikes(req.params.userId, req.params.postId, req.query.page));
  } catch (err) {
    console.error(`Error while getting likes `, err.message);
    next(err);
  }
});

router.get('/:userId/post/:postId/dislikes', async function(req, res, next) {
  try {
    res.json(await users.getAllDislikes(req.params.userId, req.params.postId, req.query.page));
  } catch (err) {
    console.error(`Error while getting dislikes `, err.message);
    next(err);
  }
});

router.get('/:userId/recentPosts', async function(req, res, next) {
  try {
    res.json(await users.getRecentPosts(req.params.userId,req.query.page));
  } catch (err) {
    console.error(`Error while getting recent posts `, err.message);
    next(err);
  }
});


module.exports = router;