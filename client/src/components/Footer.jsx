import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 px-4 py-3 mt-44'>
        <Link to='/'>    
        <h2 className='text-sm sm:text-3xl font-semibold uppercase italic-text bg-gradient-to-r from-teal-500 to-orange-500 bg-clip-text text-transparent'>Picturize</h2>
        </Link>
        <p className='flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @usmanghori.com | All right reserved.</p>
        <div className='flex gap-2.5'>
            <img width={40} src={assets.facebook_icon} alt="" />
            <img width={40} src={assets.twitter_icon} alt="" />
            <img width={40} src={assets.instagram_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer;