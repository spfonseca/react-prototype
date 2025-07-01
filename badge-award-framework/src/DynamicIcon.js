import React, { Suspense } from "react";

/**
 * Component that dynamically loads and renders a React icon from react-icons.
 * @param {string} libKey - Short key for the icon library, e.g. 'react-icons/fa'.
 * @param {string} iconName - The exact named export for the icon, e.g. 'FaCode'.
 * @param {object} props - Additional props to pass to the icon.
 */
const DynamicIcon = ({ libKey, iconName, ...props }) => {
  let libImport;

  switch (libKey) {
    case "react-icons/fa":
      libImport = import("react-icons/fa");
      break;
    case "react-icons/md":
      libImport = import("react-icons/md");
      break;
    default:
      throw new Error("Unsupported icon library");
  }

  const LazyIcon = React.lazy(() =>
    libImport.then((module) => ({
      default: module[iconName],
    }))
  );

  return (
    <Suspense fallback={<span>Loading icon...</span>}>
      <LazyIcon {...props} />
    </Suspense>
  );
};

export default DynamicIcon;
