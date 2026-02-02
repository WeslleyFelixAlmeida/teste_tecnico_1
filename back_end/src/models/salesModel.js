import { db } from "../connection/connection.js";

class SalesModel {
    async insertProductMov(rows) {
        return new Promise((resolve, reject) => {
            const insertSQL = `
                INSERT INTO movimento_produto (
                  cd_produto, tp_valor, cd_empresa, round,
                  nr_dctoorigem, nr_sequencia, cd_valor,
                  cd_historico, in_estorno, dt_movimento, dt_cadastro
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.serialize(() => {
                db.run("BEGIN TRANSACTION");
                const stmt = db.prepare(insertSQL);

                rows.forEach(row => {
                    stmt.run([
                        Number(row.cd_produto),
                        row.tp_valor,
                        Number(row.cd_empresa),
                        Number(row.round),
                        Number(row.nr_dctoorigem),
                        Number(row.nr_sequencia),
                        Number(row.cd_valor),
                        Number(row.cd_historico),
                        row.in_estorno,
                        row.dt_movimento,
                        row.dt_cadastro,
                    ]);
                })

                stmt.finalize((err) => {
                    if (err) return reject(err);
                    db.run("COMMIT", (err2) => {
                        if (err2) return reject(err2);
                        resolve();
                    });
                });
            });
        });
    }

    async getRefunds() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM movimento_produto WHERE in_estorno = 'T'`;

            db.all(query, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    async getSaleFromRefund(nr_number, cd_produto) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * 
            FROM movimento_produto 
            WHERE nr_dctoorigem = ? 
              AND cd_produto = ? 
              AND in_estorno = 'F'
        `;

            db.get(query, [nr_number, cd_produto], (err, row) => {
                if (err) return reject(err);

                resolve(row);
            });
        });
    }


    async checkIsHasData() {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) as total FROM movimento_produto`;

            db.get(query, [], (err, row) => {
                if (err) return reject(err);
                resolve(row.total > 0);
            });
        });
    }


}

export { SalesModel };
