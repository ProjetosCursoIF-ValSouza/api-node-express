import db from '../database/db.js'

const getById = async (id) => {
    return await db.query("SELECT name, descricao FROM product Where id = ?", [id])
}

const create = async (product) => {
    const { name, descricao, preco } = product;
    return await db.query("INSERT INTO product (name, descricao, preco) VALUES (?, ?, ?);", [name, descricao, preco]);
}

const update = async (product) => {
    const { id, name, descricao, preco } = product;
    return await db.query("UPDATE product SET name = ?, descricao = ?, preco = ? WHERE id = ?;", [name, descricao, preco, id]);
}


const remove = async (id) => {
    return await db.query("DELETE FROM product WHERE id = ?", [id])
}

export default {getById, create, update, remove}