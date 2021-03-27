import initDB from "../../helpers/initDB";
import Order from "../../models/Order";
import Authenticated from "../../middleware/Authenticated";

initDB();

export default Authenticated(async (req, res) => {
  const orders = await Order.find({ user: req.userId }).populate(
    "products.product"
  );
  res.status(200).json(orders);
});
