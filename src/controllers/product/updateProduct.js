import user from "../../models/productModel.js"

const updateProduct= async (req, res) => {
    try{
        const userData = req.body
        const [result] = await user.update(userData)
        if(result.affectedRows === 1){
            res.json({
                success: "Produto atualizado com Sucesso!",
                user: {
                    ...userData
                }
            })
        }
 
    } catch (error){
        console.log(error)
        res.status(500).json({
            error: "Erro no servidor!",
        })
    }
}

export default updateProduct