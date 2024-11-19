import { Router } from "express";
import MessageController from "../controllers/MessageController.js";



const router = new Router();

router.post("/msg", (req, res) => MessageController.postMessage(req, res));


export default router;