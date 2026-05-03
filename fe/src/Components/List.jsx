import React from 'react'
import Item from './Item'

const List = (props) => {
    if (props.searchItems) {
        const filtered = props.movies.filter((movie) => {
            const searchValue = props.searchItems.toLowerCase();

            const searchTitle = movie.title.toLowerCase();
            const searchGenres = movie.genres.toLowerCase();

            return searchTitle.includes(searchValue) || searchGenres.includes(searchValue)
        })
        if (filtered.length) {
            return filtered.map((movie) => {
                return <Item movie={movie} />
            })
        } else {
            return (
                <div className='w-full h-full gap-5 text-center'>
                    <img src="https://i.pinimg.com/736x/4a/20/88/4a2088896fdce876858ca85b4b3b8098.jpg" alt="Error" />
                    <p className='text-xl font-semibold'>404 Not found :C</p>
                </div>
            )
        }
    } else if (props.rating) {
        return props.movies.map((movie) => {
            return <Item movie={movie} />
        })
    } else {
        return props.movies.map((movie) => {
            return <Item movie={movie} />
        })
    }
}

export default List