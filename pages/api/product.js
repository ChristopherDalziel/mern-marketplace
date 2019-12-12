import Product from '../../models/Product';

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await handleGetRequest(req, res)
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