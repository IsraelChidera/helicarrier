import React, {useState, useEffect} from 'react';
import Box from './UI/Box';
import Text from './UI/Text';

const LAUNCHES_QUERY = `
{
  launchesPast(limit: 10) {
    mission_name
    launch_date_local
    launch_site {
      site_name
    }
    links {
      article_link
      video_link
    }
    rocket {
      rocket_name
    }
  }
}
`


const Data = () => {

  const [launches, setLaunches] = useState([]);


  const fetchData = async () => {
    await fetch("https://api.spacex.land/graphql/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({query: LAUNCHES_QUERY})
    })
    .then(response => response.json())
    .then(data => 
      setLaunches(data.data.launchesPast),
    )
  }

  useEffect(() => {
    fetchData();    
  }, [])

  console.log(launches)

  const [q, setQ] = useState("");
  // const [searchParam] = useState(["rocket"]);
  const data = Object.values(launches);
  const search_parameters = Object.keys(Object.assign({}, ...data));

  const search = (launches) => {
    return launches.filter((item) => 
        search_parameters.some((newItem) => 
            
          item[newItem]
              .toString()
              .toLowerCase()
              .includes(q)
          
        )
    );
  }

  const [filter, setFilter] = useState("");
  

  const handleClick = () => {
    const filter_items = [...new Set(launches.map((item) => item.mission_name))];
  }

  // const search = (launches) => {
  //   return launches.filter((item) => item.rocket.rocket_name.toLowerCase().includes(q))||
  //   launches.filter((item) => item.mission_name.toLowerCase().includes(q))||
  //   launches.filter((item) => item.launch_site.site_name.toLowerCase().includes(q))
  // }


  return (
    <Box className='mt-10'>
        <Box className="">
          <input
            type="search"
            name="search-btn"
            id="search-btn"  
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search mission . . ."          
            className=" rounded-md py-2 px-2 border-gray-400 border-2 w-full"
          />
        </Box>

        <Box className="block md:flex justify-center items-center mt-8 mb-20">
          <Box>
            <button className="bg-gray-600 rounded-md text-white text-sm px-6 py-2">
              Launch Site
            </button>            
          </Box>

          <Box>
            <button className="md:mx-6 my-6 md:my-0 bg-gray-600 rounded-md text-white text-sm px-6 py-2">
              Mission Name
            </button>
          </Box>

          <Box>
            <button className="bg-gray-600 rounded-md text-white text-sm px-6 py-2">
              Rocket Name
            </button>
          </Box>
        </Box>

        <Text className="text-3xl my-4 text-center font-bold">
          Space X Details
        </Text>

        <Box>
          {
            search(launches).map((launch, i) => 
              (
                <>
                  <Box 
                    key={i}
                    className="mb-6"
                  >
                    <Box 
                      className="bg-gray-500 text-white rounded-md
                      p-2 mb-2 font-semibold mt-6"
                    >                 
                      <Text>
                        {launch.launch_date_local.slice(0,10)}   
                      </Text>

                      <Text>
                        {launch.launch_date_local.slice(-10)}   
                      </Text> 
                    </Box>

                    <Box
                      
                      className="mb-10 bg-slate-900 p-6 text-white rounded-md"
                    >
                      
                      <Box className="mb-4">
                        <Text className="text-4xl pb-2 font-bold">
                          Mission
                        </Text>

                        <Text>
                          {launch.mission_name}   
                        </Text>  
                      </Box> 

                      <Box className="mb-4">
                        <Text className="text-4xl pb-2 font-bold">
                          Launch Site
                        </Text>

                        <Text>
                          {launch.launch_site.site_name}   
                        </Text>  
                      </Box> 

                      <Box>
                        <Text className="text-4xl pb-2 font-bold">
                          Rocket
                        </Text>

                        <Text>
                          {launch.rocket.rocket_name}   
                        </Text>  
                      </Box> 
                    </Box>
                  </Box>
                </>
              )
            )
          }
        </Box>
    </Box>
  )
}

export default Data