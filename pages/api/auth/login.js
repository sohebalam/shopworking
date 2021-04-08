import connectDB from "../../../utils/connectDB"
import User from "../../../models/userModel"
import {
  createRefreshToken,
  createAccessToken,
} from "../../../utils/generateToken"
import bcrypt from "bcryptjs"

connectDB()
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res)
      break
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user)
      return res
        .status(400)
        .json({ err: "This user does not exist, please register" })
    // console.log(user)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ err: "Incorrect credentials" })
    // console.log(isMatch)
    const access_token = createAccessToken({ id: user._id })
    const refresh_token = createRefreshToken({ id: user._id })

    // console.log(access_token)
    // console.log(refresh_token)
    // console.log(refresh_token, access_token, user)

    res.status(200).json({
      message: "Login Success!",
      refresh_token,
      access_token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ err: error.messsage })
  }
}
