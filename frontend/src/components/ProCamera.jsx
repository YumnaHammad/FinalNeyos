import React from 'react'
import Productcards from '../components/cards/Productcards'
import Contact from './Contact'
import BannerProCamera from './BannerProCamera'

function ProCamera() {
  return (
    <div className=''>
        <BannerProCamera/>
      <Productcards/>
      <Contact/>
    </div>
  )
}

export default ProCamera
