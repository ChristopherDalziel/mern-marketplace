import Order from '../../models/Order';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb()

export default async (req, res) => {
  try {
    const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    // Get our users orders,
    const orders = await Order.find({user: userId}).populate({
      path: "products.product",
      model: "Product"
    })
    res.status(200).send({orders})
  } catch (error) {
    console.error(error)
    res.status(403).json("Please login again")
  }
}