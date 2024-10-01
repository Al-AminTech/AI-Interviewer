// "use client"
// import React, { useState } from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'

// function AddNewInterview() {
//   const [openDialog,setOpenDialog] = useState(false)
//     const [jobs, setJobs ] = useState({
//       JobPosition: '',
//       JobDesc: "",
//       JobExperience: "",
//     })
//   return (
//     <div>
//       <div className='p-10 border rounded-lg bg-secondary  hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true )}>
//         <h2 className=' text-lg text-center'>+ Add New </h2>
//       </div>
//       <Dialog open={openDialog}>
//   <DialogContent className='max-w-2xl  '>
//     <DialogHeader>
//       <DialogTitle className='text-2xl '>Tell us more about your job interviewing</DialogTitle>
//       <DialogDescription>
//         <form >
//         <div>
    
//           <h2>Add Details about your job position/role., Job description and years of experience</h2>

//            <div className='mt-7 my-3'>
//             <label>Job Role/Job Position</label>
//             <Input placeholder='Ex.Full Stack Developer' onChange={(e) => setJobs(e.target.value)} required/>
//            </div>
//            <div className='mt-7 my-3'>
//             <label>Job Description/Tech Stack (In Short) </label>
//             <Textarea placeholder='Ex. React, Developer' onChange={(e) => setJobs(e.target.value)} required/>
//            </div>
//            <div className='mt-7 my-3'>
//             <label>Years of experience </label>
//           <Input placeholder='Ex.3' type='number' max={'100'} required/>
//            </div>
//         </div>
//         This action cannot be undone. This will permanently delete your account
//         and remove your data from our servers.
//         <div className='flex gap-5 justify-end'>
//           <Button  type='button' variant={"ghost"} onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button type='submit'> Start Interview</Button>
//         </div>
//         </form>
//       </DialogDescription>
//     </DialogHeader>
//   </DialogContent>
// </Dialog>

//     </div>
//   )
// }

// export default AddNewInterview


// "use client"
// import React, { useState } from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import chatSession from "@/utils/GeminiAiModal"
// import db from "@/utils/db"
// import { LoaderCircle } from 'lucide-react'
// import { v4 as uuidv4 } from 'uuid';
// import { useUser } from '@clerk/nextjs'
// import moment from "moment"
// import { MockInterview } from '@/utils/schema'

// function AddNewInterview() {
//   const [openDialog, setOpenDialog] = useState(false)
//   const [jobs, setJobs] = useState({
//     JobPosition: '',
//     JobDesc: '',
//     JobExperience: '',
//   });
//   const [JsonResponse, setJsonResponse] = useState([]);
//   const [loading, setLoading] = useState(false)
//   const {user} = useUser();

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setJobs((prevJobs) => ({
//       ...prevJobs,
//       [name]: value,
//     }))
//   }

//   const onSubmit = async (e) => {
//     setLoading(true)
//     e.preventDefault()
//       console.log(jobs);
//       const InputPrompt ="Job Position:"+jobs.JobPosition+", Job Description: "+jobs.JobDesc+" Years Of Experience: "+jobs.JobExperience+",Depend on this information please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview question with answers in JSON format. Give Question and answers as field in JSON";
      
//       const result = await chatSession.sendMessage(InputPrompt);
//       const MockJsonResp=(result.response.text()).replace('```json', '').replace('```', '')
//       console.log(JSON.parse(MockJsonResp));
//       setJsonResponse(MockJsonResp)
//       if(MockJsonResp){
//       const resp = await db.insert(MockInterview)
//       .values({
//         mockId: uuidv4(),
//         jsonMockResp:MockJsonResp,
//     jobPosition: jobs.JobPosition,
//     jobDesc: jobs.JobDesc,
//     JobExperience:jobs.JobExperience,
//     createdBy:user?.primaryEmailAddress?.emailAddress,
//     createdAt: moment().format('DD-MM-yyyy')

//       }).returning({mockId:MockInterview.mockId})
//       console.log("InserTed id:", resp);
//     }else{
//       console.log("Error ");
//     }
//       setLoading(false)
//   }

//   return (
//     <div>
//       <div
//         className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
//         onClick={() => setOpenDialog(true)}
//       >
//         <h2 className='text-lg text-center'>+ Add New </h2>
//       </div>

//       <Dialog open={openDialog}>
//         <DialogContent className='max-w-2xl'>
//           <DialogHeader>
//             <DialogTitle className='text-2xl'>Tell us more about your job interviewing</DialogTitle>
//             <DialogDescription>
//               <form onSubmit={onSubmit}>  
//                 <div>
//                   <h2>Add Details about your job position/role, Job description and years of experience</h2>

//                   <div className='mt-7 my-3'>
//                     <label>Job Role/Job Position</label>
//                     <Input
//                       name="JobPosition"
//                       placeholder='Ex. Full Stack Developer'
//                       value={jobs.JobPosition}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   <div className='mt-7 my-3'>
//                     <label>Job Description/Tech Stack (In Short)</label>
//                     <Textarea
//                       name="JobDesc"
//                       placeholder='Ex. React, Developer'
//                       value={jobs.JobDesc}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   <div className='mt-7 my-3'>
//                     <label>Years of experience</label>
//                     <Input
//                       name="JobExperience"
//                       placeholder='Ex. 3'
//                       type='number'
//                       max='100'
//                       value={jobs.JobExperience}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <p>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
//                 <div className='flex gap-5 justify-end'>
//                   <Button type='button' variant='ghost' onClick={() => setOpenDialog(false)}>
//                     Cancel
//                   </Button>
//                   <Button type='submit' disabled={loading}>
                     
//                     {loading? <>
//                       <LoaderCircle className='animate-spin'/>'Generating from AI'
//                     </> : "Start Interview"}</Button>
//                 </div>
//               </form>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// export default AddNewInterview
"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import chatSession from "@/utils/GeminiAiModal";
import db from "@/utils/db";
import { LoaderCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from "moment";
import { MockInterview } from '@/utils/schema';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobs, setJobs] = useState({
    JobPosition: '',
    JobDesc: '',
    JobExperience: '',
  });
  const [JsonResponse, setJsonResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobs((prevJobs) => ({
      ...prevJobs,
      [name]: value,
    }));
  }; 

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `Job Position: ${jobs.JobPosition}, Job Description: ${jobs.JobDesc}, Years Of Experience: ${jobs.JobExperience}. Depend on this information, please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. Provide questions and answers as fields in JSON.`;

    try {
  
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = (await result.response.text()).replace('```json', '').replace('```', '');
      
    
      let parsedMockJsonResp;
      try {
        parsedMockJsonResp = JSON.parse(MockJsonResp);
      } catch (error) {
        console.error("Error parsing JSON response:", error);
        setLoading(false);
        return;  
      }
      
      setJsonResponse(parsedMockJsonResp);
      console.log(parsedMockJsonResp);
      
    
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResp,
        jobPosition: jobs.JobPosition,
        jobDesc: jobs.JobDesc,
        jobExperience: jobs.JobExperience, 
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      }).returning({ mockId: MockInterview.mockId });

      console.log("Inserted ID:", resp);
      if(resp) {
        setOpenDialog(false)
        router.push('/dashboard/interview/'+ resp[0]?.mockId)
      }
    } catch (error) {
      console.error("Error during API request or database insertion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='text-lg text-center'>+ Add New </h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about your job interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add details about your job position/role, job description, and years of experience</h2>

                  <div className='mt-7 my-3'>
                    <label>Job Role/Job Position</label>
                    <Input
                      name="JobPosition"
                      placeholder='Ex. Full Stack Developer'
                      value={jobs.JobPosition}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='mt-7 my-3'>
                    <label>Job Description/Tech Stack (In Short)</label>
                    <Textarea
                      name="JobDesc"
                      placeholder='Ex. React, Developer'
                      value={jobs.JobDesc}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='mt-7 my-3'>
                    <label>Years of experience</label>
                    <Input
                      name="JobExperience"
                      placeholder='Ex. 3'
                      type='number'
                      max='100'
                      value={jobs.JobExperience}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <p>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
                <div className='flex gap-5 justify-end'>
                  <Button type='button' variant='ghost' onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type='submit' disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className='animate-spin' /> 'Generating from AI'
                      </>
                    ) : 'Start Interview'}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
