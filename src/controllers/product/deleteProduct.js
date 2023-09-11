import user from "../../models/productModel.js"

const deleteProduct = async(req, res) => {
    try{
        const userData = req.body
        const [result] = await user.remove(userData.id)
        if(result.affectedRows === 1){
            res.json({
                success: "Produto Apagado com Sucesso!",
            })
        }
    } catch (error){
        console.log(error)
        res.status(500).json({
            error: "Erro no servidor!",
        })
    }
}

export default deleteProduct