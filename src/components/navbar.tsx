"use client"

import React from 'react'
import NavbarDesktop from './navbarDesktop'
import { useMediaQuery } from 'usehooks-ts'
import NavbarMobile from './navbarMobile'


const Navbar = () => {
const isDesktop=useMediaQuery("(min-width:640px)",{
    initializeWithValue:false,
});
    if (isDesktop){
        return(<NavbarDesktop/>)
    }
    return (<NavbarMobile/>)
    
}

export default Navbar