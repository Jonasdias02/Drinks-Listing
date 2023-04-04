import db from '../infra/db.js'

class BebidasDAO {
    static listar() {
        const query = 'SELECT * FROM bebidas';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(bebida) {
        const query = 'INSERT INTO bebidas (titulo, descricao, valor) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [bebida.titulo, bebida.descricao, bebida.porcentagem], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao inserir a bebida',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'Bebida criada com sucesso',
                    bebidaId: this.lastID
                 })
            });
        });
    }

    static deletar(id) {
      const query = 'DELETE FROM bebidas WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao deletar a bebida',
                      erro: err
                  })
              }

              resolve({ mensagem: 'Bebida deletado com sucesso' })
          });
      });
    }

    static atualizar(id, bebida) {
      const query = 'UPDATE bebidas SET titulo = ?, descricao = ?, valor = ? WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [bebida.titulo, bebida.descricao, bebida.porcentagem, id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao atualizar o conteúdo de bebidas',
                      erro: err
                  })
              }

              resolve({ mensagem: 'Conteúdo "BEBIDAS", atualizado com sucesso' })
          });
      });
    }
}

export default BebidasDAO;