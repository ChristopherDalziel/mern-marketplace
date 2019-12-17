import React from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";
import ProductPagination from "../components/Index/ProductPagination";
import baseUrl from "../utils/baseUrl";

function Home({ products, totalPages }) {
  return ( 
    <>
    <ProductList products={products} />
    <ProductPagination totalPages={totalPages} />
    </>
  );
}

Home.getInitialProps = async ctx => {
  // Begin pagination
  // Ternary that checks if there is a query string in our URL, if there is not.. go to page 1
  const page = ctx.query.page ? ctx.query.page : "1";
  // Restriction on amount of items per page
  const size = 6;
  const url = `${baseUrl}/api/products`;
  const payload = {params: {page, size}}
  // fetch data on server
  const response = await axios.get(url, payload);
  // return response data
  return response.data;
  // note: this object will be merged with existing props
};

export default Home;
