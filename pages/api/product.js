import Product from '../../models/Product';
import connectDb from "../../utils/connectDb";

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
  const {name, price, inventoryQuantity, description, imageUrl} = req.body
  if(!name || !price || !inventoryQuantity || !description || !imageUrl) {
    // 422 Error
    return res.status(422).send("Product missing 1 or more fields")
  }
  const product = await new Product({
    name,
    price,
    inventoryQuantity,
    description,
    imageUrl
  }).save()
  res.status(201).json(product)
}

async function handleDeleteRequest(req, res){
  const {_id} = req.query
  // Using findOne to select everything not just one thing
  await Product.findOneAndDelete({_id})
  res.status(204).json({})
}


// Before the delete function was implimented
// export default async (req, res) => {
//   const {_id} = req.query
//   // Using findOne to select everything not just one thing
//   const product = await Product.findOne({_id})
//   res.status(200).json(product)
// }