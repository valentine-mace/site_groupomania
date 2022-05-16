const express = require('express');
const router = express.Router();
const users = require('../services/users');

//récupérer tous les utilisateurs
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
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
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await users.deleteUser(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

//modifier un compte utilisateur
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await users.updateUser(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

module.exports = router;