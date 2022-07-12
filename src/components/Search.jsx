import React from 'react';
import Box from './UI/Box';
import Text from './UI/Text';

const Search = () => {
  return (
    <Box>    

      <Box className="">
        <input
          type="text"
          name="search-btn"
          id="search-btn"  
          // style={{border:"2px solid #334", width:"100%"}}            
          className=" rounded-md py-2 pl-2 border-gray-400 border-2 w-full"
        />
        </Box>
        
    </Box>
  )
}

export default Search