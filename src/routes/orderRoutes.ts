import { Router } from "express";
import {
  addOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";

const router = Router();

router.post("/orders", addOrder);
router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

export default router;