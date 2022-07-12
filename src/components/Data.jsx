import React, {useState, useEffect} from 'react';
import Box from './UI/Box';
import Text from './UI/Text';

const LAUNCHES_QUERY = `
{
  launchesPast(limit: 10) {
    launch_date_local
    links {
      article_link
      video_link
    }
    rocket {
      rocket_name
    }
    ships {
      name
      model
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

  return (
    <Box className='mt-10'>
        <Box className="flex justify-center items-center">
          <Box className="border py-2 px-12 text-white font-bold
           bg-gray-300 rounded-md mr-4"
          >
            <Text className="text-sm">
              Ships
            </Text>            
          </Box>

          <Box className="border py-2 px-12 text-white font-bold
           bg-gray-300 rounded-md"
          >
            <Text className="text-sm">
              Rockets
            </Text>
          </Box>
        </Box>

        <Box>
          {
            launches.map((launch, i) => 
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
                        <Text className="text-2xl font-bold">
                          Ships
                        </Text>

                        <Text>
                          {launch.ships.length>0 ? launch.ships.map((ship,i)=>(
                            <p key={i}>
                              {ship.name}
                            </p>
                          )): "0 Ships were launched this day. . . "}   
                        </Text>  
                      </Box> 

                      <Box>
                        <Text className="text-2xl font-bold">
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