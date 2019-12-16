// import products from "../../static/products.json";
import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  // Page display info
  const {page, size} = req.query
  // Convert querystring values to numbers
  const pageNum = Number(page)
  const pageSize = Number(size)
  let products = []
  // Maths to work out total amount of pages, so we can create a set of page links for our users. Math.ceil ensures we're always rounding up so there are no issues on missed or duplicate pages.
  const totalDocs = await Product.countDocuments()
  const totalPages = Math.ceil(totalDocs / pageSize)
  if(pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    // What do we display after the first page/9 items? (Maths follows)
    const skips = pageSize * (pageNum - 1)
    products = await Product.find().skip(skips).limit(pageSize)
  }
  // const products = await Product.find();
  res.status(200).json({products, totalPages});
};