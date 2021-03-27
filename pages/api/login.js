import initDB from "../../helpers/initDB";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  await initDB();
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please pass all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User doesn't exist with that email!" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      const { name, email, role } = user;
      res.status(201).json({ token, user: { name, role, email } });
    } else {
      res.status(401).json({ error: "Email or password is incorrect!'" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
