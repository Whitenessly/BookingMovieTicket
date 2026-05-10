import React from 'react'
import List from '../Components/List'
import NavBar from '../Components/NavBar'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons'

const Movies = () => {
  const nav = useNavigate();
  const [data, setData] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setloading] = React.useState(false);
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const currentSortBy = searchParams.get('sortBy') || 'releaseDate';
  const search = searchParams.get('search') || '';

  React.useEffect(() => {
    fetch('http://localhost:8080/movies?page=' + currentPage + '&sortBy=' + currentSortBy + '&search=' + search)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      })
      .finally(() => {
        setloading(true);
      });
  }, []);

  const onClickReturn = () => {
    nav('/movies')
    location.reload();
  }

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, sortBy: currentSortBy, search: search });
    location.reload();
  };

  const handleLimitChange = (e) => {
    const newSortBy = e.target.value;
    setSearchParams({ page: 1, sortBy: newSortBy, search: search });
    location.reload();
  };

  return (
    <div className='w-screen min-h-screen'>
      <div className='w-full py-4 px-5 text-xl font-bold text-center flex flex-row justify-between'>
        <div>
          {(search !== '') ?
            <div className='flex flex-row'>
              <p onClick={onClickReturn} className='px-3'><LeftOutlined /></p>
              <p>Result of: {search}</p>
            </div>
            :
            <p>Movies</p>
          }
        </div>
        <Link to="/search"><SearchOutlined /></Link>
      </div>


      <div className='w-full px-5 pb-4 flex flex-row items-center gap-3'>
        <div className='text-lg'>Sort by:</div>
        <select
          value={currentSortBy}
          onChange={handleLimitChange}
          className=" bg-transparent outline-white cursor-pointer focus:ring-0 focus:bg-purple-600 text-gray-300 text-md p-2"
        >
          <option value="releaseDate">Release Date</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {(data.data && data.data.length !== 0) ?
        <>
          <div className='flex flex-row justify-center items-center gap-3 '>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-blue-50'}`}
            >
              <LeftOutlined />
            </button>
            {[...Array(data.totalPages)].map((_, index) => {
              const pageNum = index + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center rounded transition-colors${isActive ? 'border bg-pink-500 shadow-sm' : 'border bg-purple-500'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data.totalPages}
              className={`w-7 h-7 flex items-center justify-center rounded transition-colors
                    ${currentPage === data.totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-blue-50'}
                  `}
            >
              <RightOutlined />
            </button>
          </div>

          <div className='w-full flex flex-col py-5 px-7 gap-3'>
            <div className='w-full grid grid-cols-2 gap-5 '>
              {loading ? <List movies={data.data} /> : null}
            </div>
          </div>

          <div className='flex flex-row justify-center items-center gap-3 '>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-blue-50'}`}
            >
              <LeftOutlined />
            </button>
            {[...Array(data.totalPages)].map((_, index) => {
              const pageNum = index + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center rounded transition-colors${isActive ? 'border bg-pink-500 shadow-sm' : 'border bg-purple-500'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data.totalPages}
              className={`w-7 h-7 flex items-center justify-center rounded transition-colors
                    ${currentPage === data.totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-blue-50'}
                  `}
            >
              <RightOutlined />
            </button>
          </div>
        </>
        :
        <div className='w-full text-center text-lg pt-10'>
          No movie found
        </div>
      }

      <div className='h-30'></div>
      <NavBar pageStatus={2} />
    </div>

  )
}

export default Movies