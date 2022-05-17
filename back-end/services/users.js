const db = require('./db');
const config = require('../config');
const bcrypt = require('bcrypt');

//fonction pour récupérer tous les utilisateurs
async function getUsers(){
  const rows = await db.query(
    `SELECT id, identifier, name, surname, password
    FROM users`
  );
  return rows;
}

//fonction pour créer un utilisateur - inscription
async function createUser(user){
  let identifier = user.identifier;
  let password = user.password;
  const rows = await db.query(
    `SELECT userId, identifier, name, surname, password
    FROM users WHERE identifier = '${identifier}' `
  );
  //on vérifie d'abord que l'utilisateur n'existe pas
  if(rows.length == 0){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        const result = db.query(
          `INSERT INTO users(identifier,name,surname,password,isAdmin)
          VALUES
          ('${identifier}', '${user.name}', '${user.surname}', '${hash}', FALSE);`
        );
        //on check que dans l'identifiant, l'utilisateur est un admin
        //si c'est le cas on update la donnée "isAdmin"
        const isAdmin = db.query(
          `UPDATE users SET isAdmin = TRUE WHERE identifier LIKE "%@groupomania.admin"`
        );

        let message = 'Error in creating new user';

        if (result.affectedRows) {
          message = 'New user created successfully';
        }
    
        return {message};
       });
    });
  }
  else{
    let message = 'User already exists.';
    return {message};
  }
}

//fonction pour trouver un utilisateur - connexion
async function findUser(user){
  let identifier = user.identifier;
  let password = user.password;
  //d'abord on vérifie que l'utilisateur existe
  const rows = await db.query(
    `SELECT userId, identifier, name, surname, password
    FROM users WHERE identifier = '${identifier}' `
  );
  if(rows.length == 0){
    console.log("User doesn't exist");
  }
  else{
    const correct_password = await db.query(
      `SELECT password
      FROM users WHERE identifier = '${identifier}'`
    );
    bcrypt.compare(password, correct_password[0].password, function(err, result) {
      if (result) {
        console.log("It matches!")
      }
      else {
        console.log("Invalid password!");
      }
    });
  }

}

//fonction pour supprimer un compte
async function deleteUser(id){
  const result = await db.query(
    `DELETE FROM users WHERE userId=${id}`
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = 'User deleted successfully';
  }

  return {message};
}

//fonction pour mettre à jour les informations d'un utiliusateur
async function updateUser(id, user){
    let password = user.password;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        const result = db.query(
          `UPDATE users SET name="${user.name}", surname="${user.surname}", password="${hash}"
          WHERE userId=${id};` 
        );
        
        let message = 'Error in updating new user';

        if (result.affectedRows) {
          message = 'New user updated successfully';
        }
    
        return {message};
       });
    });
}

//fonction pour créer un post
async function createPost(id,post){
  userId = id;
  date = new Date();
  //on convertit dans le bon format que accepte la bdd mysql
  date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
  // 'LOAD_FILE(${post.image})',
  const result = db.query(
    `INSERT INTO posts(title,content,date,image,userId)
    VALUES
    ('${post.title}', '${post.content}','${date}','${post.image}','${userId}');`
  );


  // let message = 'Error in creating new post';

  // if (result.affectedRows) {
  //   message = 'New post created successfully';
  // }

  // return {message};
}

//fonction pour supprimer post
async function deletePost(userId,id,post){
  const rows = await db.query(
    `SELECT userId
    FROM posts WHERE id = '${id}' `
  );
  if(rows[0].userId == userId){
    const result = await db.query(
    `DELETE FROM posts WHERE id=${id}`
    );

    let message = 'Error in deleting post';

    if (result.affectedRows) {
      message = 'Post deleted successfully';
    }

    return {message};

  }
  else{
    let message = 'No authorization';
    return {message};
  }

}

//récupérer un post
async function getPost(userId,id,post){
  const userExist = await db.query(
    `SELECT userId, identifier, name, surname, password
    FROM users WHERE userId = '${userId}' `
  );
  if(userExist.length !== 0){
    const rows = await db.query(
      `SELECT id, title, content, image, date, userId
      FROM posts WHERE id = '${id}' `
    );
    return rows;
  }
  else{
    let message = "No authorization"
    return message;
  }

}

//récupérer tous les posts
async function getAllPosts(){
  const userExist = await db.query(
    `SELECT userId, identifier, name, surname, password
    FROM users WHERE userId = '${userId}' `
  );
  if(userExist.length !== 0){
  const rows = await db.query(
    `SELECT id, title, content, image, date,userId
    FROM posts`
  );
  return rows;
  }
  else{
    let message = "No authorization"
    return message;
  }

}

//fonction pour supprimer post
async function updatePost(userId,id,post){
  date = new Date();
  //on convertit dans le bon format que accepte la bdd mysql
  date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
    const rows = await db.query(
      `SELECT userId
      FROM posts WHERE id = '${id}' `
    );
    if(rows[0].userId == userId){
      const result = await db.query(
      `UPDATE posts SET title="${post.title}", content="${post.content}", image="${post.image}", date="${date}"
      WHERE id=${id};` 
      );

      let message = 'Error in updating post';

      if (result.affectedRows) {
        message = 'Post updated successfully';
      }

      return {message};

    }
    else{
      let message = 'No authorization';
      return {message};
    }

}


module.exports = {
  getUsers,
  createUser,
  deleteUser,
  findUser,
  updateUser,
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost
}