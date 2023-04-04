/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
import db from "./db.js";

//==== Conteúdos
const BEBIDAS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "bebidas" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "titulo" text,
    "descricao" text,
    "valor" FLOAT
  );`;

function createTableBebidas() {
    db.run(BEBIDAS_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de bebidas");
    });
}

db.serialize( ()=> {
    createTableBebidas();
});