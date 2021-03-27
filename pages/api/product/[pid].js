import initDB from "../../../helpers/initDB";
import Product from "../../../models/Product";

export default async (req, res) => {
  await initDB();
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  const { pid } = req.query;
  const product = await Product.findOne({ _id: pid });
  return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { pid } = req.query;
  const product = await Product.findByIdAndDelete({ _id: pid });
  return res.status(200).json({ message: "Product deleted successfully!" });
};
