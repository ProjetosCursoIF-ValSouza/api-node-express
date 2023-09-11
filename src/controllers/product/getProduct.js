import product from '../../models/productModel.js';

const getProduct = async (req, res) => {
    try {
        const productId = req.params.productId; // Suponho que você esteja passando o ID do produto como um parâmetro na URL
        const productData = await product.getById(productId);

        if (!productData) {
            res.status(404).json({
                error: `Produto com ID ${productId} não encontrado!`,
            });
        } else {
            res.json({
                success: "Produto encontrado com sucesso",
                product: productData,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Erro no servidor!",
        });
    }
};

export default getProduct;
