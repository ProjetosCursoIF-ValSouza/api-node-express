import user from '../../models/userModel.js';

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        const result = await user.update(userId, userData);

        if (result.affectedRows === 1) {
            res.json({
                success: "Usuário atualizado com sucesso!"
            });
        } else {
            res.status(404).json({
                error: `Usuário com ID ${userId} não encontrado!`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Erro no servidor!"
        });
    }
};

export default updateUser;
