import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { setCityDataAction } from '../redux/actions';
import { useNavigate } from 'react-router-dom';


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const SearchBar = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [searchInput, setSearchInput] = React.useState('');
    const [searchResult, setSearchResult] = React.useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSelectSearchResult = (data) => {
        dispatch(setCityDataAction(data));
        navigate('/');
        setSearchResult([]);
        setSearchInput('');
    }

    useEffect(() => {
        if (searchInput.length) {
            fetch(`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchInput}`)
                .then(res => res.json())
                .then(data => {
                    setSearchResult(data);
                    console.log(data);
                })
                .catch(e => {
                    console.log(e);
                })
        }
        else {
            setSearchResult([]);
        }
    }, [searchInput]);

    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                />
            </Search>
            {searchInput && (
                <div className='absolute bg-blue-500 top-10 w-80 rounded-lg flex flex-col gap-4 justify-center p-5'>
                    {searchResult?.map((result, i) => (
                        <div key={i} onClick={() => handleSelectSearchResult({ city: result.LocalizedName, country: result.Country.LocalizedName, cityKey: result.Key })}>
                            <p >{result.LocalizedName}, {result.Country.LocalizedName}</p>
                        </div>
                    ))}
                </div>
            )
            }

        </Stack>
    );
}

export default SearchBar