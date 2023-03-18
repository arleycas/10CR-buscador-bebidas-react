import { useState } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap'
import useCategorias from '../hooks/useCategorias'
import useBebidas from '../hooks/useBebidas'

const Formulario = () => {

  const [ busqueda, setBusqueda ] = useState({nombre: '', categoria: ''})
  const [ alerta, setAlerta ] = useState('')
  const { arrCategorias } = useCategorias();
  const { getBebida } = useBebidas();

  const handleSubmit = e => {
    e.preventDefault();
    if(Object.values(busqueda).includes('')) return setAlerta('Todos los campos son requeridos');

    setAlerta('')
    getBebida(busqueda)
  }

  return (
    <Form
      onSubmit={handleSubmit}>

      {alerta && (
      <Alert 
        variant='danger' 
        className='text-center'
        onClose={() => setAlerta('')}
        dismissible>{alerta}</Alert>)}

      <Row>
        <Col md={6}>
          <Form.Group className='mb-3'>
    	      <Form.Label htmlFor='inpNombre'>Nombre bebida</Form.Label>
            <Form.Control
              id='inpNombre'
              type='text'
              placeholder='Ej: Tequila, Vodka, etc'
              name='nombre'
              value={busqueda.nombre}
              onChange={e => setBusqueda({...busqueda, [e.target.name]: e.target.value})}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className='mb-3'>
    	      <Form.Label htmlFor='selCategoria'>Categoría</Form.Label>
            <Form.Select
              id='selCategoria'
              name='categoria'
              value={busqueda.categoria}
              onChange={e => setBusqueda({...busqueda, [e.target.name]: e.target.value})}>
              <option value=''>-- Seleciona Categoría --</option>
              {arrCategorias.map((categoria, i) => (
                <option key={i} value={categoria.strCategory}>{categoria.strCategory}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className='justify-content-end'>
        <Col md={3}>
          <Button
            type='submit'
            variant='danger'
            className='text-uppercase w-100'>
            Buscar bebidas
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Formulario