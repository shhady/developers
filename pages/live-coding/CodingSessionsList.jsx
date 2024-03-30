import React ,{useContext, useEffect, useState}from 'react'
import { AuthContext } from '../../components/context/userContext'
import { useLiveCodingEventsByOwnerQuery, useLiveCodingEventsQuery } from '../../src/services/liveCodingAPI'
import Spinner from '../../components/spinner/Spinner'
import './LiveCodingtime.css'
import { Link } from 'react-router-dom';
import RenderCodingEvents from './RenderCodingEvents'
export default function CodingSessionsList() {
  const [filteredData, setFilteredData]= useState([])
  const {user} = useContext(AuthContext)
    const {data, error, isLoading, isSuccess} = useLiveCodingEventsQuery();
    const {data:myData, error:myError, isLoading:myIsLoading, isSuccess:myIsSuccess}=useLiveCodingEventsByOwnerQuery(user?._id, {
      skip: !user?._id, // Skip this query if `user?._id` is not available
    })
   
    useEffect(() => {
      // Filter the allData only when allData and user are defined.
      if (data && user) {
        const newData = data.filter(event => event.user._id !== user?._id);
        setFilteredData(newData);
      }
    }, [data, user]);

    if(isLoading || myIsLoading) return <Spinner />
    if(error|| myError) return <div>Something went wrong</div>
    
    
  return (
    <div>
     {myData.length > 0 && <><h2>My Coding Events</h2>
      <RenderCodingEvents events={myData} isSuccess={myIsSuccess} user={user}/></> }
      {filteredData?.length > 0 && <><h2>Coding Events</h2>
      <RenderCodingEvents events={filteredData} isSuccess={isSuccess} user={user}/></>}
     </div>
  )
}
