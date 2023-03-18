import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const CategoriasContext = createContext();

const CategoriasProvider = ({children}) => {

  const [ arrCategorias, setArrCategorias ] = useState([]);

  const getCategorias = async () => {
    try {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const { data } = await axios(url);

      setArrCategorias(data.drinks)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCategorias();
  }, [])
  
  return (
    <CategoriasContext.Provider
    value={{
      arrCategorias
    }}>
      {children}
    </CategoriasContext.Provider>
  )
}

export {
  CategoriasProvider
}

export default CategoriasContext