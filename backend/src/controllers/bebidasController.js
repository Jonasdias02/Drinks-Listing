import BebidasDAO from "../DAO/BebidasDAO.js"

class bebidasController {
  static rotas(app){
    app.get('/bebida', bebidasController.listar)
    app.post('/bebida', bebidasController.inserir)
    app.delete('/bebida/:id', bebidasController.deletar)
    app.put('/bebida/:id', bebidasController.atualizar)
  }

  static async listar(req, res){
    const bebidas = await BebidasDAO.listar()

    res.send(bebidas)
  }

  static async inserir(req, res){
    const bebida = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      valor: req.body.valor
    }

    const result = await BebidasDAO.inserir(bebida)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.send(result)
  }

  static async deletar(req, res){
    const bebida = await BebidasDAO.deletar(req.params.id)

    if(bebida.erro){
        res.status(500).send('Erro ao deletar o conteúdo de bebidas')
    }

    res.send({mensagem: 'Conteúdo "BEBIDAS", removido com sucesso'})
  }

  static async atualizar(req, res){
    const bebida = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      valor: req.body.valor
    }

    const result = await BebidasDAO.atualizar(req.params.id, bebida)

    if(result.erro){
        res.status(500).send('Erro ao atualizar o conteúdo de bebidas')
    }

    res.send({mensagem: 'Conteúdo de "BEBIDAS", alterado com sucesso'})
  }
}

export default bebidasController