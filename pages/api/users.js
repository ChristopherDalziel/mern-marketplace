import User from '../../models/User';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  try {
    const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    // Display every user except for ourselves. $ne is the operator for not equal
    const users = await User.find({_id: {$ne: userId}})
    res.status(200).json(users)
  } catch (error){
    console.error(error)
    return res.status(403).send("Please login again")
  }
}