import Product from '../../models/Product';
import Cart from '../../models/Cart';
import connectDb from "../../utils/connectDb";
import Order from '../../models/Order';

connectDb();

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await handleGetRequest(req, res)
      break;
    case "POST":
      await handlePostRequest(req, res)
      break;
    case "DELETE":
      await handleDeleteRequest(req, res)
      break;
    default:
      res.status(405).send(`Request ${req.method} was not allowed`);
      break;
  }
}

async function handleGetRequest(req, res) {
  const {_id} = req.query
  // Using findOne to select everything not just one thing
  const product = await Product.findOne({_id})
  res.status(200).json(product)
}

async function handlePostRequest(req, res) {
  const {name, price, description, imageUrl} = req.body
  try {
    if(!name || !price || !description || !imageUrl) {
      // Handling user created errors - 422 Error
      return res.status(422).send("Product missing 1 or more fields")
    }
    const product = await new Product({
      name,
      price,
      description,
      imageUrl
    }).save()
    res.status(201).json(product)
  } catch(error){
    // Sever errors are numbers in 500. We should still display information on the error to the user
    console.error(error);
    res.status(500).send("Sever error while creating product")
  }
}

async function handleDeleteRequest(req, res){
  const {_id} = req.query
  try {
    // 1. Delete Product by ID
    await Product.findOneAndDelete({_id})
    // 2. Remove product from all carts, referenced as "product"
    await Cart.updateMany(
      {"products.product": _id },
      // Pull product from the product array
      {$pull: {products: {product: _id}}}
    )
    // 3. Remove product from "Order history" without this if you ever delete an item that is within a users history, the app will crash on the account page.
    await Order.update(
      {"products.product": _id },
      // Pull product from the product array
      {$pull: {products: {product: _id}}}
    )

    // Using findOne to select everything not just one thing

  } catch (error) {
    console.error(error)
    res.status(500).send('Error deleting product')
  }

  res.status(204).json({})
}