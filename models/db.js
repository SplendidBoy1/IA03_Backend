const initOptions = {capSQL : true}

const pgp = require('pg-promise')(initOptions)

const cn = {
    host: process.env.DBHOST || "localhost",
    port: process.env.DBPORT || 5433,
    database: process.env.DBNAME || 'progres',
    user: process.env.DBUSER || 'progres',
    password: process.env.DBPASSWORD || "rootUser",
}

console.log(cn)

const db = pgp(cn);

module.exports = schema => {
    this.schema = schema
    return {
        all: async tbName => {
            const rs = await db.any(`SELECT * FROM "${this.schema}"."${tbName}"`);
            return rs;
        },
        one: async (tbName, idField, idValue) => {
            const table = new pgp.helpers.TableName({
                table: tbName, schema: this.schema
            });
            const rs = await db.oneOrNone(`SELECT * FORM $1 WHERE "${idField}"=$2`, [table, idValue]);
            return rs;
        },
        add: async (tbName, entity) => {
            const table = new pgp.helpers.TableName({
                table: tbName, schema: this.schema
            });
            let sql = pgp.helpers.insert(entity, null, table);
            const rs = await db.one(sql + `RETURNING *`);
            return rs;
        },
        top_num: async(tbName, number_top, type) => {
            const rs = await db.any(`SELECT * FROM "${this.schema}"."${tbName}" WHERE ${type} IS NOT NULL ORDER BY ${type} DESC LIMIT ${number_top}`);
            return rs
        }
    }
}