"use client"
import db from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from "./_component/QuestionsSection"
import  RecordAnswer from "./_component/RecordAnswer"

function StartInterview({params}) {

  const  [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState()
  const [activeQuestionIndex, setActiveQuestonIndex ] = useState(0)
   useEffect(() => {
    console.log();
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

      const jsonMockResp=JSON.parse(result[0].jsonMockResp) 
      console.log(jsonMockResp);
      setMockInterviewQuestion(jsonMockResp)
      setInterviewData(result[0])
  };


  return (
    <div className='grid  grid-cols-1 md:grid-cols-2  gap-10'>
        <QuestionsSection  mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>
        <RecordAnswer  mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}/> 
    </div>
  )
}

export default StartInterview