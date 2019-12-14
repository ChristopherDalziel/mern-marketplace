import axios from "axios";
import ProductSummary from "../components/Product/ProductSummary";
import ProductAttributes from "../components/Product/ProductAttributes";
import baseUrl from "../utils/baseUrl";

function Product({ product, user }) {
  return (
    <>
    {/* If user is NOT in both of these the cart doesn't work - this caused me 2 hours + worth of errors */}
      <ProductSummary user={user} {...product} />
      <ProductAttributes user={user} {...product} />
    </>
  );
}

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/product`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { product: response.data };
};

export default Product;
