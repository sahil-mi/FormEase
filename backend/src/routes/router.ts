/**
|--------------------------------------------------
| Routers settings
|--------------------------------------------------
*/
import { Router } from "express";
import Signup from "../controllers/auth/signup";
import Login from "../controllers/auth/login";
import ListForms from "../controllers/forms/listForms";
import { VerifyAuthentication } from "../middlewares/authMiddleware";
import TokenRenew from "../controllers/auth/tokenRenew";
import CreateForms from "../controllers/forms/createForms";
import EditForms from "../controllers/forms/editForms";

const router = Router();

//auth
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/renew-token", TokenRenew);

//forms
router.post("/create-form", VerifyAuthentication, CreateForms);
router.put("/edit-form", VerifyAuthentication, EditForms);
router.get("/list-forms", VerifyAuthentication, ListForms);

export default router;
