import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/message.controller.js";


const msgRoute = express.Router();

msgRoute.get("/users",protectRoute, getUserForSidebar);
msgRoute.get("/:id",protectRoute, getMessages);

msgRoute.post("/send/:id",protectRoute, sendMessage)

export default msgRoute;