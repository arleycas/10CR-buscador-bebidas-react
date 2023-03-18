import { Row } from 'react-bootstrap';
import useBebidas from '../hooks/useBebidas'
import Bebida from './Bebida';

const ListadoBebidas = () => {

  const { arrBebidas } = useBebidas();

  return (
    <Row className='mt-5'>
      { arrBebidas.map(bebida => (
        <Bebida 
          key={bebida.idDrink} 
          bebida={bebida}/>
      )) }
    </Row>
  )
}

export default ListadoBebidas