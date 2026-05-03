import React from 'react'
import NavBar from '../Components/NavBar'
import { Link } from 'react-router'
import ReactOwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Item from '../Components/Item'


const Home = () => {
  localStorage.removeItem("staffLogin")
  const pageStatus = 1
  const [movies, setMovies] = React.useState([]);
  const [getting, setGetting] = React.useState(false);
  React.useEffect(() => {
    fetch('http://localhost:4000/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      })
      .finally(() => {
        setGetting(true)
      })
  }, [])
  const latest = [...movies].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).splice(0, 10)
  const mostRating = [...movies].sort((a, b) => b.rating - a.rating).splice(0, 10)
  const comedy = [...movies].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).filter((item) => item.genres.includes('Comedy')).splice(0, 10)
  const romance = [...movies].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).filter((item) => item.genres.includes('Romance')).splice(0, 10)

  const options = {
    loop: false,
    margin: 0,
    items: 2,
    nav: false,
    dots: false,
  };

  return (
    <>
      <div className='w-screen min-h-screen'>
        <div className='w-full flex flex-col py-5 px-7 gap-4'>
          <p className='text-3xl font-bold text-left'>Welcome</p>
          <p className='text-lg text-left'>Book your favoutrite movie</p>
          <div className='flex flex-row justify-between items-center'>
            <p className='text-xl font-bold'>Latest movies</p>
            <Link to='/movie' className='text-xl text-pink-400'>See All</Link>
          </div>
          {(getting) ?
            <ReactOwlCarousel className="owl-theme w-full" {...options}>
              {latest.map((movie) => {
                return <Item movie={movie} />
              })}
            </ReactOwlCarousel>
            : null
          }
          <div className='flex flex-row justify-between items-center'>
            <p className='text-xl font-bold'>Highest rating</p>
            <Link to='/rating' className='text-xl text-pink-400'>See All</Link>
          </div>
          {(getting) ?
            <ReactOwlCarousel className="owl-theme w-full" {...options}>
              {mostRating.map((movie) => {
                return <Item movie={movie} />
              })}
            </ReactOwlCarousel>
            : null
          }
          <div className='flex flex-row justify-between items-center'>
            <p className='text-xl font-bold'>Comedy</p>
            <Link to='/search?key=comedy' className='text-xl text-pink-400'>See All</Link>
          </div>
          {(getting) ?
            <ReactOwlCarousel className="owl-theme w-full" {...options}>
              {comedy.map((movie) => {
                return <Item movie={movie} />
              })}
            </ReactOwlCarousel>
            : null
          }
          <div className='flex flex-row justify-between items-center'>
            <p className='text-xl font-bold'>Romance</p>
            <Link to='/search?key=romance' className='text-xl text-pink-400'>See All</Link>
          </div>
          {(getting) ?
            <ReactOwlCarousel className="owl-theme w-full" {...options}>
              {romance.map((movie) => {
                return <Item movie={movie} />
              })}
            </ReactOwlCarousel>
            : null
          }
          <div className='h-[50px] w-full text-xl font-bold text-center'>The end</div>
        </div>
        <NavBar pageStatus={pageStatus} />
      </div>

    </>
  )
}

export default Home