import { Router } from "express";
import { salesController } from "../controllers/salesController.js";
// import multer from "multer";

const sales = new Router();
// const upload = multer({ storage: multer.memoryStorage() });

//Rota para receber o arquivo:
// sales.post("/importCSV", upload.single("file"), salesController.addSales.bind(salesController));

sales.get("/", salesController.getSalesAndRefounds.bind(salesController));

export { sales };