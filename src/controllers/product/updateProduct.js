import Product from "../../models/productModel.js"

const updateProduct= async (req, res) => {
    try{
        const product = req.body
        const [result] = await Product.update(product)
        if(result.affectedRows === 1){
            res.json({
                success: "Produto atualizado com Sucesso!",
                product: {
                    ...result
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