import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useProjectQuery } from '../../src/services/projectsApi';
import GlobalButton from '../../components/buttons/GlobalButton';
export default function ProjectDetails() {
    const location = useLocation();
    // Use URLSearchParams to parse the query string
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const {data} = useProjectQuery(id)
  return (
    <div  className={`projectContainer`}>
        <img src={data?.image} alt="name" className='cardDetailsImage'/>
       
        <div className='cardDetailsText'>
        
      <GlobalButton project={data}/>
      <div style={{marginTop:'30px'}}>
        <h2>{data?.name}</h2>
        <p>{data?.description}</p>
        </div>
        </div>
    </div>
  )
}
