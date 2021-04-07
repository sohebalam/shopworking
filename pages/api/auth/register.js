import connectDB from "../../../utils/connectDB"
import User from "../../../models/userModel"
import valid from "../../../utils/valid"
import bcrypt from "bcryptjs"

connectDB()
export default async (req, res) => {
  switch (req.method) {
    case " POST":
      await register(req, res)
      break
  }
}

const register = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body

  const errMsg = valid(email, password, firstName, lastName, confirmPassword)
  if (errMsg) {
    return res.status(400).json({ err: errMsg })
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const newUser = new User({
    email,
    password: passwordHash,
    firstName,
    lastName,
  })
  console.log(newUser)
  res.status(200).json({ messsage: "New user registered!" })

  try {
  } catch (error) {
    res.status(500).json({ err: error.messsage })
  }
}
