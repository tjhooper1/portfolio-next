import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-between p-24">
      <div className="flex flex-col justify-center items-center max-w-screen-sm">
        <div className="p-8 rounded-lg shadow-lg">
          <Image
            src="/dpp.jpeg"
            alt="Profile Picture"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        <h1 className="text-2xl font-bold mt-4">Tom Hooper</h1>
        <p className="text-gray-500">Software Developer</p>
        <hr />
        <h2 className="text-xl font-bold mb-3">Skills</h2>
        <p className="mb-3">
          Javascript, Typescript, C#, Java, HTML, CSS, React.js, Redux, .Net,
          Node.js AWS, Azure, SQL, MongoDB, Git, Jira, Agile
        </p>
        <h2 className="m-3 text-2xl font-medium text-blue-300">Experience</h2>
        <p className=" text-gray-100 text-2xl">
          Alaska Air, Seattle WA{" "}
          <span className="">&#8212; Software Engineer</span>
        </p>
        <p className="mb-3">September 2022 - Present</p>
        <ul className="">
          <li className="">
            Supported new business initiatives in legacy .Net 4.1 MVC framework
          </li>
          <li className="">
            Led various features to reduce call volume to our call center during
            irregular operations seasons.
          </li>
          <li className="">
            Participated in modernization efforts to bring legacy code into .Net
            Core microservices.
          </li>
          <li className="l">
            Enhanced our React.js microsite to support more audiences
          </li>
        </ul>
      </div>
    </main>
  );
}
