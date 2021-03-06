import Order from "../../models/Order";
import Product from "../../models/Product";
import initDB from "../../helpers/initDB";
import Authenticated from "../../middleware/Authenticated";

export default Authenticated(async (req, res) => {
  await initDB();
  const orders = await Order.find({ user: req.userId }).populate(
    "products.product"
  );
  res.status(200).json(orders);
});
