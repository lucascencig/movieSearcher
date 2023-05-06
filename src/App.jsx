import './App.css';
// import { useRef } from 'react'; (1 hook useReff)
import { useMovies } from './hooks/useMovies';
import { Movies } from './components/Movies';
import { useEffect, useState } from 'react';
import { useSearch } from './hooks/useSearch.';

function App() {
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search })
  const [show, setShow] = useState(true)


  console.log('render')

  // (1 hook useReff)
  // const inputRef = useRef()
  // const handleSubmit = (e) => { 
  //   e.preventDefault()
  //   const inputEl = inputRef.current;
  //   const value = inputEl.value
  //   console.log(value)
  // }

  // (si necesitamos solo un input podria hacer esto)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ search })
    getMovies()
  }

  //si necesito obtener los datos de varios inputs al mismo tiempo, haria esto
  // const handleSubmit2 = (e) => {
  //   e.preventDefault()
  //   const fields = Object.fromEntries(new window.FormData(e.target))
  //   console.log(fields)
  // }

  const handleChange = (e) => {
    updateSearch(e.target.value)

  }

  useEffect(() => {
    setShow(false)

  }, [search])

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          {/* (1 hook useReff) */}
          {/* <input ref={inputRef} placeholder='escribe el nombre de una pelicula' /> */}
          <input onChange={handleChange} value={search} name='query' placeholder='escribe el nombre de una pelicula' />
          {/* <input name='segunda' placeholder='escribe otro nombre de otra pelicula' /> */}
          <button type='submit'
            style={{
              backgroundColor: error ? '#be5e5e' : '#4c7fc2',
              borderColor: '#0b00a8',
              display: error ? 'none' : "block"
            }}
          >Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading
            ?
            <p className='loading'>Cargando...</p>
            :
            <Movies movies={movies} />
        }

      </main>
    </div>
  )
}

export default App