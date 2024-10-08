import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Header from "./dashboard/_component/Header";

export default function Home() {
  return (
    <div className="px-10 md:px-28 lg:px-44 mt-10">
      <Header/>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div>
          <h2 className="text-[65px] text-blue-900 font-extrabold py-10">
           Start AI interview to test Your Skills
          </h2>
          <p className="text-2xl text-blue-300 font-light">
            Create fun and personalised stories that bring your child's
            adventures to life and spark their passion for reading.It only takes
            few seconds!{" "}
          </p>
          <Link href={"/dashboard"}>
            <Button
              size="lg"
              color="primary"
              className="mt-5 font-bold text-2xl p-8  bg-blue-900 "
            >
              Start Interview
            </Button>
          </Link>
        </div>
        <div>
          <Image src={"/ai.png"} alt="hero" width={700} height={400} />
        </div>
      </div>
    </div>
  );
}
