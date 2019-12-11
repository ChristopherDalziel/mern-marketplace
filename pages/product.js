import axios from 'axios';
import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';

// Creating a dynamic page below. We need to fetch an indivudal product by accessing it's id.

function Product({product}){
  // console.log({product})
  return (
    <>
      {/* Using spread allows us to not have to continue to add product inide the components. */}
      <ProductSummary {...product}/>
      <ProductAttributes {...product}/>
    </>
  )
};

// Because we used the ctx object earlier, we can use es6 object destructuring to access the special property 'query', which allows us to destructure one level further.. (_id).
Product.getInitialProps = async ({query: {_id}}) => {
  const url = 'http://localhost:3000/api/product';
  // adding an object to our payload
  const payload = {params: {_id}}
  const response = await axios.get(url, payload)
  return {product: response.data}
};

export default Product;