import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// We connect the DB here incase the user visits the sign-up page indepedently (eg: Using a bookmarked page) it ensures there will still be a database connection
connectDb()

export default async (req, res) => {
  const {name, email, password} = req.body
  try {
    // 1. Check to see if the user already exists in the DB
    const user = await User.findOne({email})
    if(user){
      return res.status(422).send(`User already exists with the following email: ${email}`)
    }
    // 2. If not, hash their password(Change their written password into a cryptic string)
    // Using hashing libary BCrypt. 10 salt rounds on the password.
    const hash = await bcrypt.hash(password, 10)
    // 3. Create user
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save()
    console.log({newUser})
    // 4. Create a token for the new user, a token is a cryptic string thats assosiated with a given user for a certain peroid of time before becoming invalid
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {
      // Expires in 1 week
      expiresIn: '7d'
    })
    // 5. Send back token (Not user data)
    res.status(201).json(token)
  } catch(error) {
    console.error(error)
    res.status(500).send("Error signup user. PLease try again later.")
  }
}