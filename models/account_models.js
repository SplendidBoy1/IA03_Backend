const schema = process.env.DBSCHEMA || 'public'
const tbName = 'Users';
const idField = "Username"
const db = require('./db')(schema)

module.exports = {
    all: async () => {
        const users = await db.all(tbName);
        return users;
    },
    one: async un => {
        const user = await db.one(tbName, idField, un);
        return user
    },
    add: async user => {
        const u = await db.add(tbName, user);
        return u;
    },
}