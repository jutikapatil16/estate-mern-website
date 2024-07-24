import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


  return (
    <header className='bg-[#dbe4ff] shadow-sm'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
           <h1 className='font-bold text-sm sm:text-xl md:text-2xl '>
            <span className='text-zinc-900 text-4xl'>ELITE
            </span>
            <span className='text-slate-500 '>estates🏠</span>
          </h1>
          <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
          <ul className='flex gap-4'>
            <Link to='/'>
            <li className='hidden sm:inline cursor-pointer hover:text-zinc-500'>HOME</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline  hover:text-zinc-500 cursor-pointer'>ABOUT</li>
            </Link>
            {/* if current user stored in the cookies than use its profile picture */}
           
            {currentUser ? (
               <Link to='/profile'>
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
              </Link>
            ) : (
              <Link to='/sign-in'>
              <li className=' text-slate-700 hover:underline'> Sign in</li>
              </Link>
            )}
          
          </ul>
      </div>
      </header>
  )
}
