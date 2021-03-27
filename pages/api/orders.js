import initDB from "../../helpers/initDB";
import Order from "../../models/Order";
import Authenticated from "../../middleware/Authenticated";

export default Authenticated(async (req, res) => {
  await initDB();
  const orders = await Order.find({ user: req.userId }).populate("products");
  res.status(200).json(orders);
});
