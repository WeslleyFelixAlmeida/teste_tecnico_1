import { SalesModel } from "../models/salesModel.js";
import csv from "csv-parser";
import { Readable } from "stream";

class SalesService {
    constructor() {
        this.salesModel = new SalesModel();
    }

    async addSales(file) {
        //Checando se já foi feita a inserção dos dados no banco:
        const hasData = await this.salesModel.checkIsHasData();

        if (hasData) {
            return null;
        }

        //Adicionando dados no banco:
        return new Promise((resolve, reject) => {
            const results = [];
            const readableStream = Readable.from(file.buffer);
            const csvParser = csv({ separator: "," }); 

            readableStream
                .pipe(csvParser)
                .on("data", (row) => results.push(row))
                .on("end", async () => {
                    try {
                        await this.salesModel.insertProductMov(results);
                        resolve(results);
                    } catch (err) {
                        reject(err);
                    }
                })
                .on("error", (err) => reject(err));
        });
    }

    async getSalesAndRefounds() {
        const refunds = await this.salesModel.getRefunds();

        if (!refunds || refunds.length === 0) return [];

        const salesAndRefundsPromises = refunds.map(async (refund) => {
            const sale = await this.salesModel.getSaleFromRefund(refund.nr_dctoorigem, refund.cd_produto);

            if (!sale) return null;

            return {
                invoice: sale.nr_dctoorigem,
                transaction: {
                    sale: {
                        product: sale.cd_produto,
                        company: sale.cd_empresa,
                        is_reversal: false,
                        value: sale.round,
                    },
                    refund: {
                        product: refund.cd_produto,
                        company: refund.cd_empresa,
                        is_reversal: true,
                        value: refund.round,
                    },
                },
            };
        });

        // Espera todas as Promises e filtra os nulls
        const salesAndRefunds = (await Promise.all(salesAndRefundsPromises)).filter(Boolean);

        return salesAndRefunds;
    }

}

export { SalesService };