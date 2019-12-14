// User model, what information will each user have? 

import mongoose from 'mongoose';

const {String} = mongoose.Schema.Types;

// When you specify the model name in ths instance "user" the collection that is created (On MongoDB Atlas) is plural.

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true,
    // Setting select to false excludes the password from been shared to the client if the user data is ever shared.
    select: false
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ["user", "admin", "root"]
  }
}, {
  // This timestamps when a user was created or updated
  timestamps: true
})

// Export the user, if it already existrs OR create it
export default mongoose.models.user || mongoose.model("User")

// User - Will be given a cart and can check out products
// Admin - Will have user access + the ability to create and delete products
// Root - will have admin access + the ability to give admin access to users