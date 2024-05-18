import { FormEvent, useState,useContext } from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { JSONPlaceholderContext } from '../../contexts/JSONPlaceholder';
import { toast } from 'react-toastify'
import LightModeIcon from '../../assets/icons/LightModeIcon';
import DarkModeIcon from '../../assets/icons/DarkModeIcon';
import { TNavbar } from '../../types';

const Navbar = ({ dark, darkModeHandler }: TNavbar) => {
  const [searchUserQuery, setSearchUserQuery] = useState('')
  const { currentPage, setCurrentPage, setCurrentUser, searchUserByFullName } = useContext(JSONPlaceholderContext)
  const navigate = useNavigate()  
  console.count('Navbar')

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const userId = await searchUserByFullName(searchUserQuery)

      if (!userId) {
        toast.warning('User doesn\'t exist.', { hideProgressBar: true })
        return;
      }

      setSearchUserQuery('')
      navigate(`/user/${userId}`)
    } catch (err) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between p-4">
        <div className="logo text-[1.2rem] md:text-3xl text-gray-900 dark:text-gray-100">JSONPlaceholder</div>
        <div className='hidden md:block md:order-3'>
          <button onClick={()=> darkModeHandler()}>
            {dark ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
        </div>
        <div className="flex md:order-2">
          <div className='md:hidden self-center h-6 fill-gray-700'>
            <button onClick={()=> darkModeHandler()}>
              {dark ? <LightModeIcon /> : <DarkModeIcon />}
            </button>
          </div>
          <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <form onSubmit={handleSearch}>
              <input value={searchUserQuery} onChange={(e) => setSearchUserQuery(e.target.value)} type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leanne Graham..." required/>
            </form>
          </div>
          <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <form onSubmit={handleSearch}>
              <input value={searchUserQuery} onChange={(e) => setSearchUserQuery(e.target.value)} type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leanne Graham..." required/>
            </form>
          </div>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to={'/'} onClick={() => setCurrentPage('dashboard')} className={`block py-2 px-3 ${currentPage === 'dashboard' ? 'dark:text-blue-700 text-blue-700' : 'text-gray-900 dark:text-white'} rounded md:hover:text-blue-700 md:bg-transparent md:p-0 dark:text-blue-500`} aria-current="page">Dashboard</Link>
            </li>
            <li>
              <Link to={'/users'} onClick={() => setCurrentPage('users')} className={`block py-2 px-3 ${currentPage === 'users' ? 'text-blue-500' : 'text-gray-900 dark:text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700`}>Users</Link>
            </li>
            <li>
              <Link to={'/posts'} onClick={() => setCurrentPage('posts')} className={`block py-2 px-3 ${currentPage === 'posts' ? 'text-blue-500' : 'text-gray-900 dark:text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700`}>Posts</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
