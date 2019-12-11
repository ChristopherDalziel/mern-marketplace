import axios from 'axios';

// Creating a dynamic page below. We need to fetch an indivudal product by accessing it's id.

function Product({product}){
  console.log({product})
  return <>product</>
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