import { comparePassword, hashPassword } from "../Utils/authUtil.js";
import usermodel from "../models/usermodel.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "email is Required" });
    }
    if (!password) {
      return res.send({ message: "password is Required" });
    }
    if (!phone) {
      return res.send({ message: "phone is Required" });
    }
    if (!address) {
      return res.send({ message: "address is Required" });
    }

    const user = await usermodel.findOne({ email });
    if (user) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }
    const hassedPassword = await hashPassword(password);

    const saveduser = await new usermodel({
      name,
      email,
      phone,
      address,
      password: hassedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "Succesflly registered",
      saveduser,
    });
  } catch (error) {
   
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User is not registererd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
   
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
export const testController = async (req, res) => {
  res.send("protected route");
};

export const updateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password, address, phone } = req.body;
    
    const user = await usermodel.findById(id);
 
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }
    
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await usermodel.findByIdAndUpdate(
      id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    // Generate a new token for the updated user
    const token = await JWT.sign(
      { id: updatedUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
      token,
    });
  } catch (error) {
  
    res.status(400).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};
