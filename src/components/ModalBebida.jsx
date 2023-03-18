import { Modal, Image } from 'react-bootstrap'
import useBebidas from '../hooks/useBebidas'
import Loader from './Loader';

const ModalBebida = () => {

  const { modal, handleModalClick, receta, cargandoBebida } = useBebidas();

  // console.log(receta);

  const showIngredients = () => {
    let arrIngredients = [];

    for (let i = 1; i < 16; i++) {
      if (receta[`strIngredient${i}`])
        arrIngredients.push(<li key={i}>{receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}</li>);
    }

    return arrIngredients;
  }

  return (
    <Modal
      show={modal}
      onHide={handleModalClick}>

        {cargandoBebida ? <Loader /> : (
          <>
            <Image 
              src={receta.strDrinkThumb}
              alt={`Imagen de ${receta.strDrink}`}
              />

            <Modal.Header>
              <Modal.Title>{receta.strDrink}</Modal.Title>

            </Modal.Header>

            <Modal.Body>
              <div className='p-3'>
                <h2>Instrucciones</h2>
                {receta.strInstructionsES || receta.strInstructions}
                <h2>Ingredientes y Cantidad</h2>
                {showIngredients()}
              </div>
            </Modal.Body>
          </>
        )}

    </Modal>
  )
}

export default ModalBebida