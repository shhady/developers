import React,{useState} from 'react'
import CreateLiveCoding from './CreateLiveCoding'
import Layout from '../../components/Layout/Layout'
import SearchComponent from '../../components/searchFolder/SearchComponent'
import "./LiveCodingtime.css"
import CodingSessionsList from './CodingSessionsList'

export default function LiveCodingSessions() {
    const [searchTerm, setSearchTerm] = useState('')
  return (
    <Layout>
        <div className='flex-space-between'>
        <SearchComponent setSearchTerm={setSearchTerm}/>
        <CreateLiveCoding/>
        </div>
        <h2>Live Coding Sessions</h2>
        <div>
            <CodingSessionsList />
        </div>
        
        </Layout>
  )
}
