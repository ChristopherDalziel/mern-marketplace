import Product from '../../models/Product';

export default (req, res) => {
  switch(req.method){
    case "GET":
      await handleGetRequest(req, res)
      break;
    case "DELETE";
    await handleDeleteRequest(req, res)
  }
}

async function handleGetRequest(params) {
  
}

// export default async (req, res) => {
//   const {_id} = req.query
//   // Using findOne to select everything not just one thing
//   const product = await Product.findOne({_id})
//   res.status(200).json(product)
// }