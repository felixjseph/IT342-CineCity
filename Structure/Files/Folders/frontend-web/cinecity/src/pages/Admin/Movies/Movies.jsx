import { IoIosAddCircle } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";


export default function Movies() {
    return (
        <div className="px-8 mt-4">
            <div className="flex justify-between">
                <h1 className="text-white font-medium text-2xl">Movies</h1>
                <button className="cursor-pointer flex items-center text-white bg-[#2E2F33] px-4 py-2 rounded"><IoIosAddCircle className="text-[#2FBD59] text-2xl mr-2" />Add new movie</button>
            </div>
            <div>
                <div className="text-white flex w-fit px-4 py-1 rounded mt-4 text-sm bg-[#2FBD59]">
                    <h1 className="text-white mr-8">All</h1>
                    <p className="bg-gray-500/30 px-2 rounded">0</p>
                </div>
                <div className="w-[50%] flex items-center rounded-3xl px-4 py-2 bg-[#2E2F33] mt-4">
                    <IoSearchSharp className="text-[#2FBD59] mr-2"/>
                    <input type="text" placeholder="Search movies" className="focus:outline-none w-full border-l-1 pl-2 border-gray-500 placeholder-gray-400"/>
                </div>
            </div>
        </div>
    )
}