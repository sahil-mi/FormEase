/**
|--------------------------------------------------
| Routers settings
|--------------------------------------------------
*/
import { Router } from "express";
import Signup from "../controllers/auth/signup";
import Login from "../controllers/auth/login";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);

export default router;
