import React from 'react'
import NavBar from '../Components/NavBar'
import { Link } from 'react-router'
import ReactOwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Item from '../Components/Item'

const Home = () => {
  const pageStatus = 1
  const [moviesLatest, setMoviesLatest] = React.useState([]);
  const [mostRating, setMostRating] = React.useState([]);
  const [moviesLatestComedy, setMoviesLatestComedy] = React.useState([]);
  const [moviesLatestRomance, setMoviesLatestRomance] = React.useState([]);
  const [getting, setGetting] = React.useState(false);

  const handleAPI = async () => {
    await fetch('http://localhost:8080/home')
      .then(response => response.json())
      .then(data => {
        setMoviesLatest(data.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      })

    await fetch('http://localhost:8080/home?sortBy=rating')
      .then(response => response.json())
      .then(data => {
        setMostRating(data.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      })

    await fetch('http://localhost:8080/home?genre=comedy')
      .then(response => response.json())
      .then(data => {
        setMoviesLatestComedy(data.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      })

    await fetch('http://localhost:8080/home?genre=romance')
      .then(response => response.json())
      .then(data => {
        setMoviesLatestRomance(data.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      })
      .finally(() => {
        setGetting(true);
      })
  }

  React.useEffect(() => {
    handleAPI();
  }, [])

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
            <Link to='/movies' className='text-xl text-pink-400'>See All</Link>
          </div>
          {(getting) ?
            <ReactOwlCarousel className="owl-theme w-full" {...options}>
              {moviesLatest.map((movie) => {
                return <Item movie={movie} />
              })}
            </ReactOwlCarousel>
            : null
          }
          <div className='flex flex-row justify-between items-center'>
            <p className='text-xl font-bold'>Highest rating</p>
            <Link to='/movies?sortBy=rating' className='text-xl text-pink-400'>See All</Link>
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
            <Link to='/movies?search=comedy' className='text-xl text-pink-400'>See All</Link>
          </div>
          {(getting) ?
            <ReactOwlCarousel className="owl-theme w-full" {...options}>
              {moviesLatestComedy.map((movie) => {
                return <Item movie={movie} />
              })}
            </ReactOwlCarousel>
            : null
          }
          <div className='flex flex-row justify-between items-center'>
            <p className='text-xl font-bold'>Romance</p>
            <Link to='/movies?search=romance' className='text-xl text-pink-400'>See All</Link>
          </div>
          {(getting) ?
            <ReactOwlCarousel className="owl-theme w-full" {...options}>
              {moviesLatestRomance.map((movie) => {
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