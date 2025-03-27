/**
|--------------------------------------------------
| Routers settings
|--------------------------------------------------
*/
import { Router } from "express";
import Signup from "../controllers/auth/signup";
import Login from "../controllers/auth/login";
import ListForms from "../controllers/forms/listForms";
import { VerifyAuthentication } from "../controllers/middlewares/authMiddleware";
import TokenRenew from "../controllers/auth/tokenRenew";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/renew-token", TokenRenew);
router.get("/list-forms", VerifyAuthentication, ListForms);

export default router;
