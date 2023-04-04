import { Table, Container, Button } from 'react-bootstrap'
import BebidasApi from './api/BebidasApi'
import { useEffect, useState } from 'react'
import CreateBebidaModal from './components/CreateBebidaModal'
import UpdateBebidaModal from './components/UpdateBebidaModal'


function App() {
  const [bebidas, setBebidas] = useState()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedBebida, setSelectedBebida] = useState()

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await BebidasApi().getBebidas().then(data => {
        return data.json()
      })
      .then(data => {
        setBebidas(data)
      })
    }

    getData()
  }, [])

  async function deleteBebida(bebidaId) {
    try {
      await BebidasApi().deleteBebidas(bebidaId)

      const formattedBebidas = bebidas.filter(cont => {
        if(cont.id !== bebidaId){
          return cont
        }
      })

      setBebidas(formattedBebidas)
    } catch(err) {
      throw err
    }
  }

  async function createBebida(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      
      await BebidasApi().createBebidas(
        req.titulo.value, req.descricao.value, Number(req.valor.value)
      ).then(data => {
        return data.json()
      }).then(res => {
        setBebidas([...bebidas, {
          id: res.bebidasId,
          titulo: req.titulo.value,
          descricao: req.descricao.value,
          valor: Number(req.valor.value)
        }])

        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function updateBebida(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await BebidasApi().updateBebida(
        selectedBebida.id, req.titulo.value, req.descricao.value, Number(req.valor.value)
      )

      const formattedBebidas = bebidas.map(cont => {
        if(cont.id === selectedBebida.id) {
          return {
            id: selectedBebida.id,
            titulo:  req.titulo.value,
            descricao: req.descricao.value,
            valor: Number(req.valor.value)
          }
        }

        return cont
      })

      setBebidas(formattedBebidas)

      setIsUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return(
    <>
    <Container
      className="
        d-flex
        flex-column
        align-items-start
        justify-content-center
        h-100
        w-100
        "
    >
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Criar Conteúdo de "BEBIDAS"
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {bebidas && bebidas.map(cont => (
            <tr key={cont.id}>
              <td>{cont.titulo}</td>
              <td>{cont.descricao}</td>
              <td>{cont.valor}</td>
              <td>
                <Button onClick={() => deleteBebida(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedBebida(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateBebidaModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createBebida={createBebida} />
    {selectedBebida && (
      <UpdateBebidaModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateBebida={updateBebida} bebida={selectedBebida} />
    )}
    </>
  )
}

export default App
