import Product from "../../../models/Product";

export default async (req, res) => {
  const { pid } = req.query;
  const product = await Product.findOne({ _id: pid });
  return res.status(200).json(product);
};
