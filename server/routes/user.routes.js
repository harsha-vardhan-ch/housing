import Express from "express";
import {
	getAllUsers,
    getUserInfoById,
	createUser
	
} from "../controllers/user.controller.js";

// import auth from "../middleware/authMiddle.js";
const router_user = Express.Router();

router_user.get("/", getAllUsers);
router_user.post("/", createUser);
router_user.get("/:id", getUserInfoById);

export default router_user;
