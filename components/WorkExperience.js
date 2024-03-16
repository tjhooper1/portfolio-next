import Dropdown from "./Dropdown";

const WorkExperience = ({
  name,
  location,
  position,
  date,
  responsibilities,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl text-gray-100">
        {name}, {location} <span className="">&#8212; {position}</span>
      </p>

      <p className="mb-3">{date}</p>

      <Dropdown>
        <ul className="">
          {responsibilities.map((responsibility, i) => (
            <li key={i} className="">
              {responsibility}
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
};

export default WorkExperience;
