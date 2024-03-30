import React, { useState } from 'react'
import "./Projects.css"
import ProjectCard from './ProjectCard'
import { useProjectsQuery } from '../../src/services/projectsApi'
import AddEditProject from '../../components/projects/AddEditProject'
import SearchComponent from '../../components/searchFolder/SearchComponent'
import Spinner from '../../components/spinner/Spinner'
import Layout from '../../components/Layout/Layout'

export default function Projects() {
  const {data, error, isLoading, isFetching, isSuccess} = useProjectsQuery();
  const [searchTerm, setSearchTerm] = useState('')
  const filteredProjects = isSuccess ? data.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  return (
    <div className='projectsContainer'>
      <div className='projectsHeader'>
        <SearchComponent setSearchTerm={setSearchTerm}/>
        {/* <h2>Projects</h2> */}
        <AddEditProject />
        </div>
        {isLoading && <Layout><Spinner/></Layout>}

        {error && <h2>something went wrong</h2>}
        {isSuccess && (
          <div className='projectsCss'>
            {filteredProjects.map(project =>{
              return  <ProjectCard key={project._id} project={project} isFetching={isFetching}/>})}
          </div>
        )}
        {/* <ProjectCard/> */}
        </div>
  )
}
