import user from '../../models/productModel.js'

const insertProduct = async (req, res) => {
    try {
        const userData = req.body

        // Verifica se o campo "name" está preenchido
        if (!userData.name) {
            return res.status(400).json({ error: 'O campo "name" é obrigatório.' });
        }

        const [result] = await user.create(userData);

        if (result.affectedRows === 1) {
            res.json({
                success: "Produto inserido com Sucesso!",
                user: {
                    id: result.insertId,
                    ...userData
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Erro no servidor!",
        });
    }
}

export default insertProduct;
