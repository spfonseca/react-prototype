// App.js
import React, { useEffect, useState } from "react";
import {
  FaCode, FaLightbulb, FaUsers, FaTools, FaHandshake, FaPencilRuler,
  FaBug, FaChartLine, FaUserCheck, FaCogs, FaBriefcase
} from "react-icons/fa";
import Badge from "./Badge";

const App = () => {
  const [data, setData] = useState(null);


  useEffect(() => {
    fetch("/BadgeFramework.json")
      .then((res) => res.json())
      .then(setData);

  }, []);

  if (!data) return <div>Loading...</div>;

  const { categories, awardLevels } = data;
  const awardLevelList = awardLevels.map((a) => a.level);

  const awardLevelColorList = awardLevels.map((a) => a.color);

  return (
    <div className="app-container">
      {categories.map(({ name, actions, iconLibrary, iconComponentName  }) => (
        <div key={name} className="category-section">
          <h2 className="category-title">{name}</h2>
          <div className="badge-grid">
            {actions.map((action, index) => (
              <Badge
                key={`${name}-${index}`}
                action={action}
                categoryName={name}
                awardLevel={awardLevelList[index % awardLevelList.length]}
                scale={1.0}
                color={awardLevelColorList[index % awardLevelColorList.length]}

                iconLibrary={iconLibrary}
                iconComponentName={iconComponentName}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
