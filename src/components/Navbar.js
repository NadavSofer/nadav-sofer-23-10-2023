import React from 'react';
import AppBar from '@mui/material/AppBar';

import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';
import { redirect } from 'react-router';
import SearchBar from './SearchBar';




const Navbar = () => {
    return (
        <AppBar>
            <div className='py-2 flex'>
                <SearchBar/>
                <Link to={'/'}>
                    <Button key='home' sx={{ color: '#fff' }}>
                        home
                    </Button>
                </Link>
                <Link to={'/favorites'}>
                    <Button key='favorite' sx={{ color: '#fff' }}>
                        favorites
                    </Button>
                </Link>
            </div>

        </AppBar>
    )
}

export default Navbar