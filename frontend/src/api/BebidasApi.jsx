const BebidasApi = () => {
  const url = 'http://localhost:3000'

  return {
      getBebidas () {
          return fetch(`${url}/bebida`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
      },
      deleteBebidas (bebidaId) {
        return fetch(`${url}/bebida/${bebidaId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
       })
      },
      createBebidas (titulo, descricao, valor) {
        return fetch(`${url}/bebida`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              titulo: titulo,
              descricao: descricao,
              valor: valor
            }
          )
       })
      },
      updateBebida(bebidaId, titulo, descricao, valor) {
        return fetch(`${url}/bebida/${bebidaId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              titulo: titulo,
              descricao: descricao,
              valor: valor
            }
          )
       })
      },
  }
}

export default BebidasApi