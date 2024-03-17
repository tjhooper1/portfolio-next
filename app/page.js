import Image from "next/image";
import WorkList from "@/app/experience.json";
import WorkExperience from "@/components/WorkExperience";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1">
          <div className="flex max-w-screen-sm flex-col items-center justify-center">
            <div className="rounded-lg p-8 shadow-lg">
              <Image
                src="/pp.jpeg"
                alt="Profile Picture"
                width={200}
                height={200}
                className="rounded-full"
                priority
              />
            </div>
            <h1 className="mt-4 text-2xl font-bold">Tom Hooper</h1>
            <p className="text-gray-500">Software Developer</p>
            <hr />
            <h2 className="mb-3 text-xl font-bold">Skills</h2>
            <p className="mb-3">
              Javascript, Typescript, C#, Java, HTML, CSS, React.js, Redux,
              .Net, Node.js AWS, Azure, SQL, MongoDB, Git, Jira, Agile
            </p>
            <h2 className="m-3 text-2xl font-medium text-yellow-400">
              Experience
            </h2>
            {WorkList.work.map((work) => (
              <WorkExperience
                key={work.id}
                name={work.name}
                location={work.location}
                position={work.position}
                date={work.date}
                responsibilities={work.responsibilities}
              />
            ))}
          </div>
        </div>
        <div className=" order-first col-span-2 md:order-none">
          <Chat />
        </div>
      </div>
    </main>
  );
}
