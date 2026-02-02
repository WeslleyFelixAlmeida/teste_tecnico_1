import express from "express";
import { sales } from "./routes/salesRoutes.js";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

server.use("/sales", sales);

server.listen(3000, () => {
    console.log("Servidor ligado!");
});
