// This is a database that contains login information for users

"use strict";

const Database = require('better-sqlite3');

const db = new Database('user.db');

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);
let row = stmt.get();
if (row === undefined) {
    const sqlInit = `
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, user TEXT, pass TEXT);
        INSERT INTO userinfo (user, pass) VALUES ('admin','bdc87b9c894da5168059e00ebffb9077'), ('test','9241818c20435c6672dac2c4b6e6c071');
    `;
    
    db.exec(sqlInit);
    console.log('Login database created.')

} else {
    console.log('Login database exists.')
}

module.exports = db