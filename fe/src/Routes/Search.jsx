import React from 'react'
import NavBar from '../Components/NavBar'
import { Link, useNavigate } from 'react-router'
import { LeftOutlined, SearchOutlined } from '@ant-design/icons'
import { MdArrowOutward } from "react-icons/md";
import { useSearchParams } from 'react-router';
import List from '../Components/List';


const Search = () => {
  const nav = useNavigate();
  const pageStatus = 2
  const [searchParams, setSearchParams] = useSearchParams()

  const [inputValue, setInputValue] = React.useState('')
  const onChangeInput = (e) => {
    setInputValue(e.target.value)
  }
  const onSearch = () => {
    nav(`/movies?search=${inputValue.toLocaleLowerCase()}`)
  }
  const onClickReturn = () => {
    history.back()
  }

  return (
    <>
      <div className='w-screen min-h-screen p-7'>
        <div className='flex flex-row justify-between gap-3 pb-5'>
          <p onClick={onClickReturn} className='py-2'><LeftOutlined /></p>
          <div className='py-2 pl-3 w-full rounded-lg border-2 border-white'><SearchOutlined /> <input onChange={onChangeInput} type="text" placeholder='Search for' /></div>
          <div onClick={onSearch} className='border-b-2 border-r-2 border-gray-200 bg-pink-500 px-3 py-2 rounded-lg'>Search</div>
        </div>
        {(searchParams.get('key')) ?
          <div className='w-full flex flex-row flex-wrap justify-between gap-5 '>
            <List movies={movies} searchItems={searchParams.get('key')} />
          </div>
          :
          <div className='text-xl flex flex-col gap-1'>
            <Link to='/movies?search=comedy'>
              <div className='py-2 flex flex-row items-center gap-2'><MdArrowOutward /> Comedy</div>
            </Link>
            <hr />
            <Link to='/movies?search=romance'>
              <div className='py-2 flex flex-row items-center gap-2'><MdArrowOutward /> Romance</div>
            </Link>
            <hr />
            <Link to='/movies?search=science+fiction'>
              <div className='py-2 flex flex-row items-center gap-2'><MdArrowOutward /> Science fiction</div>
            </Link>
            <hr />
            <Link to='/movies?search=action'>
              <div className='py-2 flex flex-row items-center gap-2'><MdArrowOutward /> Action</div>
            </Link>
          </div>}
      </div>

      <NavBar pageStatus={pageStatus} />
    </>
  )
}

export default Search