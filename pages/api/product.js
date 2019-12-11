import Product from '../../models/Product';

export default async (req, res) => {
  const {_id} = req.query
  // Using findOne to select everything not just one thing
  const product = await Product.findOne({_id})
  res.status(200).json(product)
}