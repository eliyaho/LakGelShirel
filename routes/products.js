const express = require("express")
const Product = require("../models/Product")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.send(products)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post("/", [auth, admin], async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).send(product)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put("/:id", [auth, admin], async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!product) return res.status(404).send()
    res.send(product)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).send()
    res.send(product)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router

