import { SalesService } from "../services/salesService.js";
import fs from "fs";

class SalesController {
    constructor() {
        this.salesService = new SalesService();
    }

    /*
        async addSales(req, res) {
            const file = req.file;
            console.log(req.file);
            if (!file) {
                res.status(400).json("Não foi encontrado nenhum arquivo!");
                return null;
            }
    
            const addFiles = await this.salesService.addSales(file);
    
            res.status(201).json("Dados adicionados com sucesso!");
        }
    */

    async addSales(fileBuffer) {
        if (!fileBuffer) {
            throw new Error("Arquivo não fornecido")
        };

        await this.salesService.addSales({ buffer: fileBuffer });
    }

    async getSalesAndRefounds(req, res) {
        const data = await this.salesService.getSalesAndRefounds();

        res.status(200).json(data);
    }
}

const salesController = new SalesController();

//Para adicionar o arquivo CSV durante o início da aplicação:
const dataBuffer = fs.readFileSync("./vendas_e_devolucoes.csv");
salesController.addSales(dataBuffer);

export { salesController };