import Express from "express";
import {
	getAllProperties,
	createProperty,
	updateProperty,
	deleteProperty,
	getProperty
} from "../controllers/property.controller.js";

// import auth from "../middleware/authMiddle.js";
const router_var = Express.Router();

router_var.get("/", getAllProperties);
router_var.post("/", createProperty);
router_var.route("/:id").get(getProperty);
router_var.patch("/:id", updateProperty);
router_var.delete("/:id", deleteProperty);

export default router_var;
