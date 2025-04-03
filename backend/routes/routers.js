import express from "express"
import { validateData } from "../controller/validator.js";
import { fetchData, saveData } from "../controller/saveData.js";
import multer from "multer"



const router = express.Router();


const upload = multer()

// ROUTE FOR VALIDATE THE DATA
router.post("/data",upload.none(),validateData);

router.post("/data/db",upload.none(),saveData);


router.get("/data/db",fetchData);




export default router;