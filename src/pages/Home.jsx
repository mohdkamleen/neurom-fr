import React from 'react'
import TeamCarousel from './Team'
import MainBanner from './component/Banner'
import Team from './Team'
import Contact from './Contact'
import Add from './Ad' 

const Home = () => {
    return (
        <> 
            <MainBanner />
            {/* <Team /> */}
            <Contact />
            <Add />
        </>
    )
}

export default Home