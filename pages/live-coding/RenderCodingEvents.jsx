import React from 'react'

import { Link } from 'react-router-dom'

const RenderCodingEvents = React.memo(({ events, isSuccess, user }) => {
  console.log(events);
  return (
    <div>{isSuccess && events?.length > 0 && <div>
        <div className='listOfLiveSessionsTitles'>
          <div>name</div>
          <div>projectName</div>
          <div>tags</div>
          <div>date</div>
          <div>time</div>
          <div>join</div>
        </div>
        {events?.map((liveSession)=>{
          return <div className='listOfLiveSessionsDesktop' key={liveSession._id}>
            <div className='flex-center'>{liveSession.user.userName}</div>
            <div className='flex-center'>{liveSession.projectName}</div>
            <div className='flex-center'>{liveSession.tags}</div>
            <div className='flex-center'>{liveSession.date.split('T')[0]}</div>
            <div className='flex-center'>{liveSession.time}</div>
            {liveSession?.user._id === user?._id && <Link to={`/live-coding/${liveSession._id}`}><button className='joinButton'>{liveSession.active ? 'Join': 'Start'}</button></Link>}
            {liveSession?.user._id !== user?._id && <div>{liveSession.active ? <Link to={`/live-coding/${liveSession._id}`}><button className='joinButton Active'>Join</button></Link>:<button className='joinButton notActive'>Inactive</button>}</div>}
          </div>
        })}
         {events?.map((liveSession)=>{
          return <div className='listOfLiveSessionsMobile' key={liveSession._id}>
            <div>
            <div className='flex-start'><h6 className='liveSessionsTitlesHiddenDesktop'>name: </h6>{liveSession.user.userName}</div>
            <div className='flex-start'><h6 className='liveSessionsTitlesHiddenDesktop'>projectName: </h6>{liveSession.projectName}</div>
            <div className='flex-start'><h6 className='liveSessionsTitlesHiddenDesktop'>tags: </h6>{liveSession.tags}</div>
            </div>
            <div>
            <div className='flex-start'><h6 className='liveSessionsTitlesHiddenDesktop'>date: </h6>{liveSession.date.split('T')[0]}</div>
            <div className='flex-start'><h6 className='liveSessionsTitlesHiddenDesktop'>time: </h6>{liveSession.time}</div>
            {liveSession?.user._id === user?._id && <Link to={`/live-coding/${liveSession._id}`}><button className='joinButton'>{liveSession.active ? 'Join': 'Start'}</button></Link>}
            {liveSession?.user._id !== user?._id && <div>{liveSession.active ? <Link to={`/live-coding/${liveSession._id}`}><button className='joinButton Active'>Join</button></Link>:<button className='joinButton notActive'>Inactive</button>}</div>}
            {/* <Link to={liveSession.active ? `/live-coding/${liveSession._id}`: ''}>{liveSession?.user._id === user?._id ? <button className='joinButton'>Start</button>:<button className={liveSession.active ? 'joinButton Active' : 'joinButton notActive'}>{liveSession.active ? "Join" : "Inactive"}</button>}</Link>  */}
            </div>
            
          </div>
        })}
      </div>}</div>
  )
});

export default RenderCodingEvents;