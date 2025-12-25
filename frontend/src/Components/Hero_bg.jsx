import React from 'react'
import '../Index.css';
import gradient from "../Images/gradient.png"
import Header from './Header';

const Hero_bg = () => {
  return (
    <main>
      {/* gradient image bg */}
      <img src={gradient} alt="gradient" loading='lazy' className='absolute top-0 right-0 opacity-60 -z-10'/>

      {/* blur background effect */}
      <div className='h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] -rotate-[30deg] -z-10'> 

      </div>

      <Header />
    </main>
  )
}

export default Hero_bg
