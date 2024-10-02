import React from 'react'
import AddNewInterview from "./_component/AddNewInterview"
import interviewList from "./_component/interviewList"

function Dashboard() {
  return (
    <div>
      <h2 className='font-bold text-2xl '>Dashboard</h2>
      <h2 className='text-gray-500'>Create and Start your Al-Amin Tech AI Mockup  Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      <interviewList/>
    </div>
  )
}

export default Dashboard