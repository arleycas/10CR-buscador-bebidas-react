import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const BebidasContext = createContext();

const BebidasProvider = ({children}) => {

  const [ arrBebidas, setArrBebidas ] = useState([]);
  const [ modal, setModal ] = useState(false);
  const [ bebidaId, setBebidaId ] = useState(null);
  const [ receta, setReceta ] = useState({});
  const [ cargandoBebida, setCargandoBebida ] = useState(false)

  const getBebida = async (datos) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
      const { data } = await axios(url);

      setArrBebidas(data.drinks)

    } catch (error) {
      console.error(error);
    }
  }

  const handleModalClick = () => {
    setModal(!modal);
  }

  const handleBebidaId = id => {
    setBebidaId(id);
  }

  useEffect(()=> {

    setCargandoBebida(true)
    const getReceta = async () => {
      if (!bebidaId) return;
        
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const { data } = await axios(url);

        setReceta(data.drinks[0])

      } catch (error) {
        console.error(error);
      } finally {
        setCargandoBebida(false)
      }
    }

    getReceta()

  }, [bebidaId])
  
  return (
    <BebidasContext.Provider
    value={{
      getBebida,
      arrBebidas,
      handleModalClick,
      modal,
      handleBebidaId,
      receta,
      cargandoBebida
    }}>
      {children}
    </BebidasContext.Provider>
  )
}

export {
  BebidasProvider
}

export default BebidasContext