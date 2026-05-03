import React from 'react'
import List from '../Components/List'
import { LeftOutlined } from '@ant-design/icons'


const Movies = () => {
  localStorage.removeItem("staffLogin")
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:4000/movies')
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        setMovies(data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const onClickReturn = () => {
    history.back()
  }

  return (
    <>
      <div className='w-full py-4 px-5 text-lg font-bold text-center relative'>
        <p onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-2'><LeftOutlined /></p>
        <p>Movies</p>
      </div>
      <div className='w-full flex flex-col py-5 px-7 gap-3'>
        <div className='w-full grid grid-cols-2 gap-5 '>
          <List movies={movies} />
        </div>
      </div>
    </>

  )
}

export default Movies