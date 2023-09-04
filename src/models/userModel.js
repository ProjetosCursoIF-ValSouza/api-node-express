import db from '../database/db.js';

const getById = async (id) => {
    return await db.query("SELECT name, email FROM users WHERE id = ?", [id]);
}

const create = async (user) => {
    const { name, email, pass } = user;
    return await db.query("INSERT INTO users (name, email, pass) VALUES (?, ?, ?)", [name, email, pass]);
}

const update = async (id, userData) => {
    const { name, email, pass } = userData;
    return await db.query("UPDATE users SET name = ?, email = ?, pass = ? WHERE id = ?", [name, email, pass, id]);
}

export default { getById, create, update };
