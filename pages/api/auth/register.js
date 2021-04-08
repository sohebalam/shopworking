import connectDB from "../../../utils/connectDB"
import User from "../../../models/userModel"
import valid from "../../../utils/valid"
import bcrypt from "bcryptjs"

connectDB()
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res)
      break
  }
}

const register = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body
  console.log(req.body)

  const errMsg = valid(firstName, lastName, email, password, confirmPassword)
  if (errMsg) {
    return res.status(400).json({ err: errMsg })
  }
  const user = await User.findOne({ email })
  if (user) return res.status(400).json({ err: "This email already exists." })

  const passwordHash = await bcrypt.hash(password, 12)

  const newUser = new User({
    email,
    password: passwordHash,
    firstName,
    lastName,
  })

  await newUser.save()

  res.status(200).json({ message: "New user registered!" })

  try {
  } catch (error) {
    res.status(500).json({ err: error.messsage })
  }
}
