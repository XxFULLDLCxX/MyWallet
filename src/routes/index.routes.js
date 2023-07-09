import { Router } from "express";
import auth_router from "./auth.routes.js";
import transactions_router from "./transactions.routes.js";

const router = Router();

router.use(auth_router);
router.use(transactions_router);

export default router;