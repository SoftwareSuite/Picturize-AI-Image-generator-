import { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

import { useNavigate } from 'react-router-dom'

const Header = () => {

    const {user, setShowLogin} = useContext(AppContext)
    
    const navigate = useNavigate();

    const onClickHandler = ()=> {
        if(user) {
            navigate('/result')
        }else {
            setShowLogin(true);
        }
    }

  return (
    <div className='flex flex-col justify-center items-center text-center my-20'>
        <div className='text-stone-500 text-center bg-white px-6 py-1 rounded-full border border-neutral-500 inline-flex gap-2'>
            <p>
                Generate images from text with just a click
            </p>
            <img src={assets.star_icon} alt="" />
        </div>

        <h1 className='text-gray-500 text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>
            Turn text to <span className='bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent'>image</span>, in seconds
        </h1>

        <p className='text-center text-gray-600 max-w-xl mx-auto mt-5'>
            Unleash your creativity with AI. Turn your imagination into visual art in 
            seconds - just type and watch the magic happen. 
        </p>

        <button
        onClick={onClickHandler}
        className=' sm:text-lg text-white bg-black w-auto mt-8 px-12 
            py-2.5 flex items-center gap-2 rounded-full hover:scale-110 transition-all duration-500'>
            Generate Images
            <img className='h-6' src={assets.star_group}/>
        </button>
    </div>
  )
}

export default Header