// This is a database that can save all the stats which are included in main

"use strict";

const Database = require('better-sqlite3');

const db = new Database('stats.db');

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='scoresinfo';`);
let row = stmt.get();
if (row === undefined) {
    const sqlInit = `
        CREATE TABLE scoreinfo ( id INTEGER PRIMARY KEY,
        scores INTEGER,
            );
        INSERT INTO statsinfo (scores),
         (0)
    `;
    
    db.exec(sqlInit);
    console.log('Stats database created.')

} else {
    console.log('Stats database exists.')
}

module.exports = db