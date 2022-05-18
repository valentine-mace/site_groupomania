const db = require('./db');
const config = require('../config');
const bcrypt = require('bcrypt');

async function initializeWebsite(){
  const createOfficialUsers = await db.query(
    `CREATE TABLE officialUsers
    (
        userId int(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(100),
        surname VARCHAR(100),
        identifier VARCHAR(255),
        PRIMARY KEY (userId)
    );`
  );
    
  const createOfficialUsersList = await db.query(
    `INSERT INTO officialusers(identifier,name,surname)
    VALUES
    ("valentine.mace@groupomania.fr", "Valentine","Mace"),
    ("lana.delrey@groupomania.admin", "Lana","Del Rey"),
    ("melanie.martinez@groupomania.admin", "Melanie","Martinez"),
    ("britney.spears@groupomania.fr", "Britney","Spears");`
  );
  
  const createUsers = await db.query(
    `CREATE TABLE users
    (
        userId int(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(100),
        surname VARCHAR(100),
        identifier VARCHAR(255),
        password VARCHAR(255),
        isAdmin BOOLEAN,
        PRIMARY KEY (userId)
    );`
  );

  const createPosts = await db.query(
    `CREATE TABLE posts
    (
        postId int(11) NOT NULL AUTO_INCREMENT,
        title varchar(100),
        content varchar(255),
        date datetime,
        image LONGBLOB NOT NULL,
        userId int(11),
        likesNb int(11),
        dislikesNb int(11),
        PRIMARY KEY (postId),
        FOREIGN KEY (userId)
       REFERENCES  users (userId)
       ON DELETE CASCADE
    );`
  );

  const bindTables = await db.query(
    `SELECT * FROM users
    NATURAL JOIN posts;`
  );

  const createComments = await db.query(
    `CREATE TABLE comments
    (
      commentId int(11) NOT NULL AUTO_INCREMENT,
      content varchar(255),
      date datetime,
      postId int(11),
      userId int(11),
      PRIMARY KEY (commentId),
      FOREIGN KEY (postId)
      REFERENCES  posts (postId)
      ON DELETE CASCADE
    );`
  );

  const bindTablesPosts = await db.query(
    `SELECT * FROM posts
    NATURAL JOIN comments;`
  );
}

//fonction pour récupérer tous les utilisateurs
async function getUsers(){
  const rows = await db.query(
    `SELECT userId, identifier, name, surname, password
    FROM users`
  );
  return rows;
}

async function getUser(userId){
  const rows = await db.query(
    `SELECT userId, identifier, name, surname, password
    FROM users WHERE userId = '${userId}';`
  );
  return rows;
}

//fonction pour créer un utilisateur - inscription
async function createUser(user){
  let identifier = user.identifier;
  let password = user.password;
  //on vérifie d'abord que l'utilisateur fait bien partie de l'entreprise
  const isSalariman = await db.query(
    `SELECT identifier, name, surname
    FROM officialusers WHERE identifier = '${identifier}' `
  );
  if(isSalariman.length !== 0 )
  {
    const rows = await db.query(
      `SELECT userId, identifier, name, surname, password
      FROM users WHERE identifier = '${identifier}' `
    );
    //on vérifie d'abord que l'utilisateur n'existe pas
    if(rows.length == 0){
      const isAdminFromIdentifier = identifier.split('@')[1];
      if(isAdminFromIdentifier == "groupomania.fr")
      {
        isAdmin = 'FALSE';
      }
      else{
        isAdmin = 'TRUE';
      }
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          
            const result = db.query(
              `INSERT INTO users(identifier,name,surname,password,isAdmin)
              VALUES
              ('${identifier}', '${user.name}', '${user.surname}', '${hash}', ${isAdmin} );`
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
  else{
    let message = 'Not part of the company.';
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
async function deleteUser(userId){
  const result = await db.query(
    `DELETE FROM users WHERE userId=${userId}`
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = 'User deleted successfully';
  }

  return {message};
}

//fonction pour mettre à jour les informations d'un utiliusateur
async function updateUser(userId, user){
    let password = user.password;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        const result = db.query(
          `UPDATE users SET name="${user.name}", surname="${user.surname}", password="${hash}"
          WHERE userId=${userId};` 
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
async function createPost(userId,post){
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
async function deletePost(userId,postId,post){
  const rows = await db.query(
    `SELECT userId
    FROM posts WHERE postId = '${postId}' `
  );
  if(rows[0].userId == userId){
    const result = await db.query(
    `DELETE FROM posts WHERE postId=${postId}`
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
async function getPost(userId,postId,post){
  const userExist = await db.query(
    `SELECT userId, identifier, name, surname, password
    FROM users WHERE userId = '${userId}' `
  );
  if(userExist.length !== 0){
    const rows = await db.query(
      `SELECT postId, title, content, image, date, userId
      FROM posts WHERE postId = '${postId}' `
    );
    return rows;
  }
  else{
    let message = "No authorization"
    return message;
  }

}

//récupérer tous les posts
async function getAllPosts(userId){
  const userExist = await db.query(
    `SELECT userId, identifier, name, surname, password
    FROM users WHERE userId = '${userId}';`
  );
  if(userExist.length !== 0){
    const rows = await db.query(
      `SELECT postId, title, content, image, date,userId
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
async function updatePost(userId,postId,post){
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
      FROM posts WHERE postId = '${postId}' `
    );
    if(rows[0].userId == userId){
      const result = await db.query(
      `UPDATE posts SET title="${post.title}", content="${post.content}", image="${post.image}", date="${date}"
      WHERE postId=${postId};` 
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

async function createComment(userId,postId,comment){
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
    `INSERT INTO comments(content,date,userId, postId)
    VALUES
    ('${comment.content}','${date}','${userId}','${postId}');`
  );
}

async function deleteComment(userId,postId,commentId,post){
  const rows = await db.query(
    `SELECT userId
    FROM comments WHERE commentId = '${commentId}' `
  );
  if(rows[0].userId == userId){
    const result = await db.query(
    `DELETE FROM comments WHERE commentId=${commentId}`
    );

    let message = 'Error in deleting comment';

    if (result.affectedRows) {
      message = 'Comment deleted successfully';
    }

    return {message};

  }
  else{
    let message = 'No authorization';
    return {message};
  }

}

async function getAllComments(userId,postId,post){
  const userExist = await db.query(
    `SELECT userId, identifier, name, surname, password
    FROM users WHERE userId = '${userId}';`
  );
  if(userExist.length !== 0){
    const rows = await db.query(
      `SELECT commentId ,content, date,userId
      FROM comments WHERE postId = '${postId}';`
    );
    return rows;
  }
  else{
    let message = "No authorization"
    return message;
  }
}


module.exports = {
  initializeWebsite,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  findUser,
  updateUser,
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
  createComment,
  deleteComment,
  getAllComments
}