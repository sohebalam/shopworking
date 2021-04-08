import Product from "../../../models/productModel"
import connectDB from "../../../utils/connectDB"

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res)
      break
    case "DELETE":
      await deleteProduct(req, res)
      break
  }
}

const getProduct = async (req, res) => {
  const { pid } = req.query
  try {
    const product = await Product.findById(pid)
    // const product = await Product.findOne({ _id: pid })

    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({ messsage: "Product not found" })
    }
  } catch (error) {
    return res.status(500).json({ err: err.messsage })
  }
}

const deleteProduct = async (req, res) => {
  const { pid } = req.query
  await Product.findByIdAndDelete({ _id: pid })
  res.status(200).json({})
}
