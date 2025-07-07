import {Search } from 'lucide-react'
import { useState } from 'react'
import blank_image from "../assets/blank_image.jpg"

export default function Home() {

    const[search, setSearch] = useState()
    const[data, setData] = useState()

    function handlesearchinput(event){
        setSearch(event.target.value);
    }

    const getmovies = async () => {
        const movies = await fetch(`https://www.omdbapi.com/?apikey=3760d0c0&s=${search}`)
        const moviesdata = await movies.json()
        setData(moviesdata.Search)
        console.log(data)
    }

    return(
    <div className="min-h-[100vh] bg-white">
        <header className="min-h-[10vh] bg-blue-300">
            <div className="flex items-center justify-between md:mx-15 md:p-4 p-2">
                <div>
                    <h1 className="text-3xl font-bold">Movie Gallery</h1>
                </div>
                <div className="text-xl font-semibold grid grid-cols-1 md:grid-cols-4 md:gap-5 place-items-center md:p-4 p-2">
                    <h4>Popular</h4>
                    <h4>Drama</h4>
                    <h4>Action</h4>
                    <h4>Comedy</h4>
                </div>
            </div>
        </header>
        <section className="p-5 w-full min-h-[90vh] ">
            <div className="flex items-center justify-center m-5">
                <input type="text" onChange={handlesearchinput} className="w-[40%] h-10 ring-2 ring-slate-400 focus:ring-2 focus:ring-slate-600 rounded-4xl shadow-2xl p-4"/>
                <button className='text-xl h-10 w-fit border-2 border-slate-400 rounded-4xl flex items-center justify-between p-5 m-2 hover:border-slate-600' onClick={getmovies}>Search <Search className='m-2'/></button>
            </div>
            {
                !data ? <p className='place-items-center text-center text-2xl'>Movies not found....!</p> :
                <div className='md:mx-15 p-5 grid grid-cols-1 md:grid-cols-4 gap-10'>
                    {data.map((d,index) => {
                        return(
                            <div key={index} className='group relative h-[60vh] p-2 border border-slate-300 shadow-xl rounded-2xl flex flex-col items-center '>
                                <img src={d.Poster !== "N/A" ? d.Poster : blank_image} alt={`${d.Title} Poster`} className='h-[45vh] md:h-full rounded-2xl group-hover:opacity-25 transition-opacity duration-500'/>
                                <div className='md:absolute md:hidden w-full group-hover:block m-2 md:m-0 px-2'>
                                    <h2 className='text-lg w-fit h-fit p-2 bg-black border text-white font-bold rounded-2xl'>Year : {d.Year}</h2>
                                    <div className='flex flex-col items-start justify-left w-full md:my-4 font-bold md:gap-2'>
                                        <h2 className='text-auto md:text-4xl '><span className='md:hidden'>Title : </span>{d.Title}</h2>
                                        <h2 className='text-auto md:text-lg'>Type: {d.Type}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </section>
    </div>
    )
    
}