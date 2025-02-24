const express = require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")
const Product = require("../models/Product")

const router = express.Router()

router.post("/add", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const user = await User.findById(req.user._id)
    const product = await Product.findById(productId)

    if (!product) return res.status(404).send({ error: "Product not found" })

    const cartItem = user.cart.find((item) => item.product.toString() === productId)

    if (cartItem) {
      cartItem.quantity += quantity
    } else {
      user.cart.push({ product: productId, quantity })
    }

    await user.save()
    res.send(user.cart)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product")
    res.send(user.cart)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router

