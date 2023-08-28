import db from '../database/db.js'

const getById = async (Id) => {
    return await db.query("SELECT name, email FROM users WHERE id = ?", [Id])
}


const criarUsuario = async (nome, email, pass) => {
    return await db.query
}








export default {getById}
