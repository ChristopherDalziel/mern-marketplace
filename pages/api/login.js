import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// We connect the DB here incase the user visits the sign-up page indepedently (eg: Using a bookmarked page) it ensures there will still be a database connection
connectDb()

export default async (req, res) => {
  const {email, password} = req.body
  try {
    // 1. Check if a user exists with the provided email
    const user = await User.findOne({email}).select('+password')
    // 2. If not, return and error
    if(!user){
      // 404 = not found error
      return res.status(404).send("No user exists with that email address")
    }
    // 3. Check to see if the users matches our DB
    const passwordsMatch  = await bcrypt.compare(password, user.password)
    // 4. If so generate a token
    if(passwordsMatch){
      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: '7d'
      })
      // 5. Send that token to the client
      res.status(200).json(token)
    } else {
      // 401 = not authenticated
      res.status(401).send("Password does not match")
    }
  } catch (error){
    console.error(error)
    res.status(500).send("Error logging in")
  }
}