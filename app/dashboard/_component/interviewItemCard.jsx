import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function interviewItemCard({ interview }) {
    const router = useRouter()
    const Onstart = () => {
        router.push('/dashboard/interview'+interview?.mockId)
    }

    const onFeedback = ()=>{
        router.push('/dashboard/interview/'+interview.mockId+"/feedback")
    }


  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.Experience} Years of Experience
      </h2>
      <h2 className="text-s text-gray-500">
        {" "}
        Created At{interview?.createdAt}{" "}
      </h2>

      <div className="flex justify-between mt-2  gap-5">



     <Link href={"/dashboard/interview"+interview?.mockId } className="w-full">




     <Button size={"sm"} variant={"outline"} onClick={onFeedback}>
      Feedback


        </Button>
     </Link>



        <Button size={"sm"} className="w-full" onClick={Onstart}>Start</Button>
      </div>
    </div>
  );
}

export default interviewItemCard;
