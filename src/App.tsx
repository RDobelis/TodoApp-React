import "./styles/App.scss";

const name = "Rihards";
const position = "Software Developer";
const skills = [
  "C#",
  ".NET",
  "TypeScript",
  "JavaScript",
  "React",
  "Node.js",
  "Git",
  "HTML",
  "CSS",
  "SASS",
];
const hobbies = {
  Gaming: "CS:GO,  League of Legends",
  Poker: "Texas Holdem",
  Weightlifting: "Strength Training",
} as any;

function App() {
  return (
    <div>
      <h2 className="nameHeader">{name}</h2>
      <h3 className="positionHeader">{position}</h3>
      <h3 className="skillsHeader">Skills</h3>
      <ul className="skillsList">
        {skills.map((skill, index) => {
          return <li key={index}>{skill}</li>;
        })}
      </ul>
      <h3 className="hobbiesHeader">Hobbies</h3>
      <ul className="hobbiesList">
        {Object.keys(hobbies).map((hobby, index) => {
          return (
            <li key={index}>
              {hobby}: {hobbies[hobby]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
