import express from "express";
const router = express.Router();
import {
  registerController,
  loginController,
  testController,
  updateController,
} from "../controllers/authController.js";
import { requireLogin } from "../middleware/authmiddleware.js";

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test", requireLogin, testController);

router.get("/check-login", requireLogin, async (req, res) => {
  res.status(200).send({
    ok: true,
    message: "Succesful",
  });
});
router.patch("/update/:id", updateController);

export default router;
