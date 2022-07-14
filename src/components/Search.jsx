import React, {useState} from 'react';
import Box from './UI/Box';
import Text from './UI/Text';

const Search = () => {

  const [q, setQ] = useState("");
  const [searchParams] = useState(["rockets", "ships"]);

  return (
    <Box>    

      <Box className="">
        <input
          type="search"
          name="search-btn"
          id="search-btn"  
          value={q}
          onChange={(e) => setQ(e.target.value)}
          // style={{border:"2px solid #334", width:"100%"}}            
          className=" rounded-md py-2 px-2 border-gray-400 border-2 w-full"
        />
        </Box>
        
    </Box>
  )
}

export default Search