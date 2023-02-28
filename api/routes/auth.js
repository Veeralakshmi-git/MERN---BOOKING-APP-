import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login,verifyUser);
export default router;