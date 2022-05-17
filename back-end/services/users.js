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
    `SELECT id, identifier, name, surname, password
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
    `SELECT id, identifier, name, surname, password
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
    `DELETE FROM users WHERE id=${id}`
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
          WHERE id=${id};` 
        );
        
        let message = 'Error in updating new user';

        if (result.affectedRows) {
          message = 'New user updated successfully';
        }
    
        return {message};
       });
    });
}


module.exports = {
  getUsers,
  createUser,
  deleteUser,
  findUser,
  updateUser
}