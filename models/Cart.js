import mongoose from 'mongoose';

const {ObjectId, Number} = mongoose.Schema.Types

const CartSchema = new mongoose.Schema({
  // Getting the User ID from the DB
  user: {
    type: ObjectId,
    // This comes from the User Schema/Model
    ref: "User"
  },
  // Array
  products: [
    {
      quantitiy: {
        type: Number,
        default: 1
      }, 
      product: {
        type: ObjectId,
        // Getting the Product Schema/Model
        ref: "Product"
      }
    }
  ]
})

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);