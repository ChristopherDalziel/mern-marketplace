import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Cart from '../../models/Cart';
import connectDb from '../../utils/connectDb';

connectDb()

export default async (req, res) => {
  if(!("authorization" in req.headers)){
    return res.status(401).send("No authorization token")
  } 
  try {
    // Verify authorization again
    const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    const cart = await Cart.findOne({user: userId}).populate({
      // What are we trying to populate from the model
      path: "products.product",
      // What model do we want to perform the populate from?
      model:"Product"
    })
    res.status(200).json(cart.products)
  } catch(error){
    console.error(error)
    res.status(403).send("Please login again")
  }
};