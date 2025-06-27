// App.js
import React, { useEffect, useState } from "react";
import {
  FaCode, FaLightbulb, FaUsers, FaTools, FaHandshake, FaPencilRuler,
  FaBug, FaChartLine, FaUserCheck, FaCogs, FaBriefcase
} from "react-icons/fa";
import Badge from "./Badge";

const categoryIcons = {
  "engineering": <FaCode />,
  "innovation": <FaLightbulb />,
  "leadership": <FaUsers />,
  "craftsmanship": <FaTools />,
  "collaboration": <FaHandshake />,
  "design & ux": <FaPencilRuler />,
  "testing & quality": <FaBug />,
  "data & insights": <FaChartLine />,
  "customer impact": <FaUserCheck />,
  "foundations": <FaCogs />,
  "business impact": <FaBriefcase />
};

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/badgeCategoryFrameworkWithAwards_data.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  const { categories, awardLevels } = data;
  const awardLevelList = awardLevels.map((a) => a.level);

  return (
    <div className="app-container">
      {categories.map(({ name, actions }) => (
        <div key={name} className="category-section">
          <h2 className="category-title">{name}</h2>
          <div className="badge-grid">
            {actions.map((action, index) => (
              <Badge
                key={`${name}-${index}`}
                action={action}
                category={name}
                awardLevel={awardLevelList[index % awardLevelList.length]}
                scale={1.0}
                categoryIcons={categoryIcons}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
