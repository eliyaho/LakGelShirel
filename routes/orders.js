const express = require("express")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const auth = require("../middleware/auth")
const Order = require("../models/Order")

const router = express.Router()

router.post("/create-payment-intent", auth, async (req, res) => {
  try {
    const { amount } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "ils",
    })

    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.post("/", auth, async (req, res) => {
  try {
    const order = new Order({
      user: req.user._id,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
    })

    await order.save()
    res.status(201).send(order)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("products.product")
    res.send(orders)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router

