
import { Movies } from '../components/Movies';
import { useEffect, useState, useRef } from 'react';

export function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const ifFirstInput = useRef(true)


  useEffect(() => {
    if (ifFirstInput.current) {
      ifFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('Debe escribir el nombre de una pelicula')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('No se pueden ingresar Numeros.')
      return
    }
    if (search.length < 3) {
      setError('escribe mas')
      return
    }


    setError(null)
  }, [search])


  return { search, updateSearch, error }
}
