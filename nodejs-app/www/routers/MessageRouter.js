import { Router } from "express";
import MessageController from "../controllers/MessageController.js";



const router = new Router();

router.post("/msg", MessageController.postMessage);


export default router;