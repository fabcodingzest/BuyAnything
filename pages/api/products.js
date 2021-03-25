import initDB from "../../helpers/initDB";
import Product from "../../models/Product";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllProducts(req, res);
      break;
    case "POST":
      await saveProduct(req, res);
      break;
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json("Internal Server Error!");
  }
};

const saveProduct = async (req, res) => {
  const { name, price, description, mediaUrl } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl) {
      res.status(422).json({ errors: "Please Add all the fields" });
    }
    const product = await new Product({
      name,
      price,
      description,
      mediaUrl,
    }).save();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json("Internal Server Error!");
  }
};
