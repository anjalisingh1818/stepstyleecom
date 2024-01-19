import express from "express";
import product from "../models/productmodel.js";
import usermodel from "../models/usermodel.js";
const router = express.Router();
router.post("/create", async (req, res) => {
  try {
    const { name, oldprice, newprice, description, image } = req.body;
    const newproduct = new product({
      name,
      oldprice,
      newprice,
      image,
      description,
      
    });
    await newproduct.save();
    res.status(201).send({
      success: true,
      message: "product created successfully",
      newproduct,
    });
  } catch (error) {
    
    res.status(500).send({
      success: false,
      message: "Error while creating product",
      error,
    });
  }
});
router.get("/products", async (req, res) => {
  try {
    const pro = await product.find({});
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      pro,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while gettng products",
      error,
    });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
     
    const productdata = await product.findById( id );
 
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      productdata,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while gettng single product",
      error,
    });
  }
});
router.post("/checkout/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const { cart } = req.body;
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.purchasedItems = user.purchasedItems.concat(cart);
    await user.save();
    return res.status(200).json({ message: "Checkout successful", user });
  } catch (error) {
    
    return res.status(500).json({ error: "Internal Server Error", error });
  }
});

router.get("/Orders/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await usermodel.findById(userId).populate({
      path: "purchasedItems",
      select: "name newprice image createdAt updatedAt",
      options: { sort: { updatedAt: 1 } },
    });

 
    if (user) {
      return res.status(200).send({
        purchasedItems: user.purchasedItems,
      });
    }
    res.status(500).send({
      success: false,
      message: "error getting orders",
    });
  } catch (error) {
   
    return res.status(500).json({ error: "Internal Server Error", error });
  }
});
export default router;
