function calculateCartTotal(products) {
  // Iterate over our products array, and times the amount by any qty they might have
  // (accumerlater - the accumerlated value from each item, element - each item in the products array)
  const total = products.reduce((acc, el) => {
    acc += el.product.price * el.quantity
    // Returning esnures we're passing the previous value to the next iteration
    return acc;
  }, 0)

    // This calculation solves any rounding errors, and rounds it to only 2 decimal places since we will be working with dollars and cents
    const cartTotal = ((total * 100) / 100 ).toFixed(2)
    
    // For the purpose of using Stripe, we need to be using a number
    const stripeTotal = Number((total * 100).toFixed(2))

    return{cartTotal, stripeTotal}

  // 0 = the starting value of acc
}

export default calculateCartTotal;