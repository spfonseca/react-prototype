import React, { useEffect, useState } from "react";
import "./CareerHandbill.css";

export default function CareerHandbill() {
  const [handbill, setHandbill] = useState(null);

  useEffect(() => {
    fetch("/handbill.json")
      .then((response) => response.json())
      .then((data) => setHandbill(data))
      .catch((error) => console.error("Error loading handbill:", error));
  }, []);

  if (!handbill) {
    return <div className="handbill-container">Loading...</div>;
  }

  // <img src={headshotUrl} alt="Headshot" />
  const headshotUrl = handbill.headshotUrl || "https://via.placeholder.com/120x120.png?text=Headshot";

  // Group companies in groups of 4
  const groupedCompanies = [];
  if (Array.isArray(handbill.targetCompanies)) {
    for (let i = 0; i < handbill.targetCompanies.length; i += 4) {
      groupedCompanies.push(handbill.targetCompanies.slice(i, i + 4));
    }
  }

  return (
    <div className="handbill-container">
      <div className="handbill-header">
        <div className="handbill-header-left">
          <h1 className="handbill-title">
            {handbill.title} <span className="handbill-suffix">, {handbill.suffixDesignations.join(" ")}</span>
          </h1>
          <p className="handbill-contact">
            {handbill.phoneNumber} | {handbill.emailAddress} |{" "}
            <a href={handbill.workProfileUrl} target="_blank" rel="noreferrer">
              {handbill.workProfileUrl}
            </a>
          </p>
        </div>
        <div className="handbill-headshot">
          <img src="/Headshot.jpg" alt="Headshot" />
        </div>
      </div>

      <p className="handbill-summary">{handbill.summary}</p>

      <div className="section specialties-section">
        <h2 className="section-heading">Specialties</h2>
        <ul className="section-list specialties-list">
          {handbill.specialities.map((spec, index) => (
            <li key={index}>
              <span className="specialty-title">{spec.title}:</span> {spec.description}
            </li>
          ))}
        </ul>
      </div>

      <div className="section-columns beige-section">
        <div className="column">
          <h2 className="section-heading">Target Positions</h2>
          <ul className="section-list">
            {handbill.targetPositions.map((position, index) => (
              <li key={index}>{position}</li>
            ))}
          </ul>
        </div>

        <div className="column">
          <h2 className="section-heading">Target Industries</h2>
          <ul className="section-list">
            {handbill.targetIndustries.map((industry, index) => (
              <li key={index}>{industry}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section-columns beige-section">
        <div className="column">
          <h2 className="section-heading">Target Contacts</h2>
          <ul className="section-list">
            {handbill.targetContacts.map((contact, index) => (
              <li key={index}>{contact}</li>
            ))}
          </ul>
        </div>

        <div className="column">
          <h2 className="section-heading">Target Companies</h2>
          <ul className="section-list">
            {groupedCompanies.map((group, index) => (
              <li key={index}>{group.join(", ")}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section specialties-section">
        <h2 className="section-heading">Past Employment</h2>
        <ul className="section-list">
          {handbill.pastEmployment.map((job, index) => (
            <li key={index}>
              <strong>{job.role}</strong> — {job.company}, {job.organization}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
