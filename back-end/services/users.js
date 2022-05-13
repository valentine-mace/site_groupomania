const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, identifier, name, surname, password
    FROM users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function createUser(user){
  const result = await db.query(
    `INSERT INTO users(identifier,name,surname,password)
    VALUES
    ('${user.identifier}', '${user.name}', '${user.surname}', '${user.password}');`
  );

  let message = 'Error in creating new user';

  if (result.affectedRows) {
    message = 'New user created successfully';
  }

  return {message};
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
  getMultiple,
  createUser,
  deleteUser
}