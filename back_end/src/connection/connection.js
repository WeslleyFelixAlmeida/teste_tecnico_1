import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("loja.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco:", err.message);
    return;
  }

  console.log("Banco SQLite conectado");
});
