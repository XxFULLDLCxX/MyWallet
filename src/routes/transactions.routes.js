import { Router } from "express";
import { validateSchema } from "../middlewares/schema.validate.js";
import { validateAuth } from "../middlewares/auth.validate.js";
import { transaction_schema } from "../schemas/transactions.schemas.js";
import { deleteTransactions, getTransactions, postTransactions } from "../controllers/transactions.controller.js";

const transactions_router = Router();
transactions_router.use(validateAuth);
transactions_router.get("/transactions", getTransactions);
transactions_router.post("/transactions", validateSchema(transaction_schema), postTransactions);
transactions_router.delete("/transactions/:id", deleteTransactions);
export default transactions_router;
