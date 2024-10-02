"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

import chatSession from "@/utils/GeminiAiModal";

import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import db from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserAnswer } from "@/utils/schema";

function RecordAnswer({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };
  const UpdateUserAnswer = async () => {
    try {
      console.log(userAnswer);
      setLoading(true);
      
      // Chat session logic here...
      
      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });
  
      console.log("Insert Response:", resp);
  
      if (resp) {
        toast("User Answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      } else {
        toast("Failed to record user answer");
      }
    } catch (error) {
      console.error("Error:", error);
      toast("An error occurred while recording the answer");
    } finally {
      setLoading(false);
    }
  };
  
  // const UpdateUserAnswer = async () => {
  //   console.log(userAnswer);
  //   setLoading(true);
  //   const feedbackPrompt =
  //     "Question:" +
  //     mockInterviewQuestion[activeQuestionIndex]?.question +
  //     ", User Answer:" +
  //     userAnswer +
  //     ",Depends on question and  user answer for give interview question " +
  //     " please give us rating for answer and feedback as area of improvemant if any" +
  //     "in just 3  lines  to improve it  in JSON format with  rating field and  feedback field ";
  //   const result = await chatSession.sendMessage(feedbackPrompt);
  //   const mockJsonResp = result.response.text()
  //     .replace("```json", "")
  //     .replace("```", "");
  //   console.log(mockJsonResp);

  //   const JsonFeedbackResp = JSON.parse(mockJsonResp);

  //   const resp = await db.insert(UserAnswer).values({
  //     mockIdRef: interviewData?.mockId,
  //     question: mockInterviewQuestion[activeQuestionIndex]?.question,
  //     correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
  //     userAns: userAnswer,
  //     feedback: JsonFeedbackResp?.feedback,
  //     rating: JsonFeedbackResp?.rating,
  //     userEmail: user?.primaryEmailAddress?.emailAddress,
  //     createdAt: moment().format("DD-MM-YYYY"),
  //   });
  //   if (resp) {
  //     toast("User Answer recorded successfully");
  //     // console.log('succeess');
  //     setUserAnswer("");
  //     setResults([]);
  //   }
  //   setResults([])

  //   setLoading(false);
  // };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col  justify-center items-center bg-black rounded-lg p-5  mt-20">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute "
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button
        disabled={loading}
        variant={"outline"}
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            {" "}
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswer;
