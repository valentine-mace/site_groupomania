const db = require('./db');
const config = require('../config');

async function getUsers(){
  const rows = await db.query(
    `SELECT id, identifier, name, surname, password
    FROM users`
  );
  return rows;
}

async function createUser(user){
  let identifier = user.identifier;
  const rows = await db.query(
    `SELECT id, identifier, name, surname, password
    FROM users WHERE identifier = '${identifier}' `
  );
  console.log(rows);
  if(rows.length == 0){
    const result = await db.query(
      `INSERT INTO users(identifier,name,surname,password)
      VALUES
      ('${identifier}', '${user.name}', '${user.surname}', '${user.password}');`
    );

    let message = 'Error in creating new user';

    if (result.affectedRows) {
      message = 'New user created successfully';
    }

    return {message};
   
  }
  else{
    let message = 'User already exists.';
    return {message};
}
}

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

module.exports = {
  getUsers,
  createUser,
  deleteUser
}