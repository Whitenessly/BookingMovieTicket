import React from 'react'
import NavBar from '../Components/NavBar'
import { SearchOutlined } from '@ant-design/icons';
import { MdArrowOutward } from "react-icons/md";
import { useSearchParams } from 'react-router';
import List from '../Components/List';


const Search = () => {
  localStorage.removeItem("staffLogin")
  const pageStatus = 2
  const [searchParams, setSearchParams] = useSearchParams()

  const [inputValue, setInputValue] = React.useState('')
  const onChangeInput = (e) => {
    setInputValue(e.target.value)
  }
  const onSearch = () => {
    setSearchParams({ key: `${inputValue}` })
  }

  const onSearchRecommend_1 = () => {
    setSearchParams({ key: 'comedy' })
  }
  const onSearchRecommend_2 = () => {
    setSearchParams({ key: 'romance' })
  }
  const onSearchRecommend_3 = () => {
    setSearchParams({ key: 'science+fiction' })
  }
  const onSearchRecommend_4 = () => {
    setSearchParams({ key: 'action' })
  }

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

  return (
    <>
      <div className='w-screen min-h-screen p-7'>
        <div className='flex flex-row justify-between gap-2 pb-5'>
          <div className='py-2 pl-3 w-full rounded-lg border-2 border-white'><SearchOutlined /> <input onChange={onChangeInput} type="text" placeholder='wut u want 2 search 4 ?' /></div>
          <div onClick={onSearch} className='border-b-2 border-r-2 border-gray-200 bg-pink-500 px-3 py-2 rounded-lg'>Search</div>
        </div>
        {(searchParams.get('key')) ?
          <div className='w-full flex flex-row flex-wrap justify-between gap-5 '>
            <List movies={movies} searchItems={searchParams.get('key')} />
          </div>
          :
          <div className='text-xl flex flex-col gap-1'>
            <div onClick={onSearchRecommend_1} className='py-2 flex flex-row items-center gap-2'><MdArrowOutward /> comedy</div>
            <hr />
            <div onClick={onSearchRecommend_2} className='py-2 flex flex-row items-center gap-2'><MdArrowOutward /> romance</div>
            <hr />
            <div onClick={onSearchRecommend_3} className='py-2 flex flex-row items-center gap-2'><MdArrowOutward /> science fiction</div>
            <hr />
            <div onClick={onSearchRecommend_4} className='py-2 flex flex-row items-center gap-2'><MdArrowOutward /> action</div>
          </div>}
      </div>

      <NavBar pageStatus={pageStatus} />
    </>
  )
}

export default Search