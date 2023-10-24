import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBar = () => {
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                id="SearchBarInput"
                freeSolo
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => <TextField {...params} label="SearchBarInput" />}
            />
        </Stack>
    );
}

export default SearchBar