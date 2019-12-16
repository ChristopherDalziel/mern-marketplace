import Stripe from 'stripe';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import Cart from '../../models/Cart';
import Order from '../../models/Order';
import calculateCartTotal from '../../utils/calculateCartTotal';

// Stripe setup

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const {paymentData} = req.body;

  try {
    // 1. Verify and get userId from token
    const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    // 2. Find the cart based on the userId and populate it
    const cart = await Cart.findOne({user: userId}).populate({
      path: "products.product",
      model: "Product"
    })
    // 3. Calculate cart totals from cart products again (We don't want the values to be sent over from our client for saftey reasons we want the cart to be calculated on our sever)
    const {cartTotal, stripeTotal} = calculateCartTotal(cart.products)
    // 4. Get email from payment data, see if email is linked with existing stripe customer
    const previousCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1
    })
    const isExistingCustomer = previousCustomer.data.lenght > 0; 
    // 5. If not an exisiting stripe customer create it based on their email
    let newCustomer;
    if(!isExistingCustomer){
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id
      })
    } 

    // The code below the first section is written in () so it is checked first, alls we're doing here is including a customer id whether it's old or new.
    const customer = (isExistingCustomer && previousCustomer.data[0].id) || newCustomer.id;
    // 6. Create a charge total and send a receipt email
    await stripe.charges.create({
      currency: "aud",
      amount: stripeTotal,
      receipt_email: paymentData.email,
      customer,
      description: `Checkout | ${paymentData.email} | ${paymentData.id}`

      // A second argument to the create function, this makes sure a charge isn't excecuted twice for any reason. We do this by associating each charge with a unique string
    }, { idempotency_key: uuidv4()
    })
    // 7. Add the order data to our DB
    await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products
    }).save()
    // 8. Clear products in the cart after a successful payment
    await Cart.findOneAndUpdate(
      { _id: cart._id}, 
      // Setting products to an emtpy array
      { $set: { products: [] }}
    )
    // 9. Send back succes (200) response
    res.status(200).send("Checkout successful!")
  } catch (error) {
    consople.error(500).send("Error processing Charge!")

  }
}