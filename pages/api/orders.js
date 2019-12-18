import Order from '../../models/Order';
import jwt from 'jsonwebtoken';
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  try {
    const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    // Get our users orders. + the .sort orders our history in descending. 'asc' for ascending.
    const orders = await Order.find({user: userId}).sort
    ({createdAt: 'desc'}).populate({
      path: "products.product",
      model: Product
    })
    res.status(200).send({orders})
  } catch (error) {
    console.error(error)
    res.status(403).json("Please login again")
  }
}