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

async function create(user){
  const result = await db.query(
    `INSERT INTO users 
    (identifier, name, surname, password) 
    VALUES 
    (${user.identifier}, ${user.name}, ${user.surname}, ${user.password})`
  );

  let message = 'Error in creating new user';

  if (result.affectedRows) {
    message = 'New user created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}