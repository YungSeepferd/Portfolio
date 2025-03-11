import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './About.css';
import Button from './Button';
import Tooltip from './Tooltip';

// Data for Core Competences
const jobTitles = ["Sound Designer", "Audio Engineer"];
const expertiseFields = ["UX Research", "UI Design", "HCI"];
const coreSkills = ["Hardware Prototyping", "Software Prototyping", "Coding"];

// Reduced additional tags for overview (used in Biography tile’s TagList)
const bioTags = ["Sound", "UX", "Code"];
const experienceTags = ["Research", "Prototype"];
const passionTags = ["Music", "Sports"];

// Biography content (only two parts now)
const bioSections = {
  background:
    "I studied media informatics at LMU Munich and trained as an audio designer. My work shows how audio guides perception.",
  interests:
    "I explore haptic feedback and immersive sound design, always keeping the user at the centre."
};

// Standardized motion variant for all content sections
const contentVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Core Competences Section
const CompetenceSection = () => (
  <motion.div className="tile-content" variants={contentVariant}>
    <h3>Core Competences</h3>
    <div className="competence-groups">
      <div className="competence-group">
        <h4>Roles</h4>
        <div className="tag-list">
          {jobTitles.map((role, idx) => (
            <Tooltip key={idx} text={role}>
              <span className="tag">{role}</span>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="competence-group">
        <h4>Expertise</h4>
        <div className="tag-list">
          {expertiseFields.map((field, idx) => (
            <Tooltip key={idx} text={field}>
              <span className="tag">{field}</span>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="competence-group">
        <h4>Skills</h4>
        <div className="tag-list">
          {coreSkills.map((skill, idx) => (
            <Tooltip key={idx} text={skill}>
              <span className="tag">{skill}</span>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Interactive Tile (Highlights) – reduced to two options
const InteractiveTile = () => {
  const tileData = {
    Overview:
      "I bring innovation to UX design by fusing sound and visuals into cohesive experiences.",
    Collaborative:
      "Teamwork and collaboration are at the core of how I build and iterate on ideas."
  };
  const tags = Object.keys(tileData);
  const [activeTile, setActiveTile] = useState(tags[0]);

  return (
    <motion.div className="tile-content interactive-tile" variants={contentVariant}>
      <h3>Highlights</h3>
      <div className="tile-tags">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tile-tag ${activeTile === tag ? 'active' : ''}`}
            onClick={() => setActiveTile(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="tile-text">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTile}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {tileData[activeTile]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Biography Section with two sub-tabs
const BiographySection = () => {
  const [activeSubTab, setActiveSubTab] = useState('background');

  return (
    <motion.div className="tile-content biography-section" variants={contentVariant}>
      <h3>Who Am I?</h3>
      <div className="sub-tabs">
        {['background', 'interests'].map((tab) => (
          <button
            key={tab}
            className={`sub-tab ${activeSubTab === tab ? 'active' : ''}`}
            onClick={() => setActiveSubTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="subtab-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            <p>{bioSections[activeSubTab]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <TagList title="Overview:" tags={bioTags} />
    </motion.div>
  );
};

// Reusable TagList
const TagList = ({ title, tags }) => (
  <motion.div className="tag-section" variants={contentVariant}>
    {title && <h4>{title}</h4>}
    <div className="tag-list">
      {tags.map((tag, idx) => (
        <Tooltip key={idx} text={tag}>
          <span className="tag">{tag}</span>
        </Tooltip>
      ))}
    </div>
  </motion.div>
);

// Main About Component with a simplified tabs menu
const About = () => {
  // Reduced to three main tabs for clarity
  const tabs = ["Core", "Highlights", "Biography"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { scrollY } = useScroll();
  const parallaxHeading = useTransform(scrollY, [0, 300], [0, -30]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Core":
        return <CompetenceSection />;
      case "Highlights":
        return <InteractiveTile />;
      case "Biography":
        return <BiographySection />;
      default:
        return null;
    }
  };

  return (
    <section
      id="about"
      className="about-section"
      style={{ backgroundImage: "url('../assets/css/images/Moosach Musik Moritz.jpg')" }}
    >
      <div className="about-overlay" />
      <motion.div
        className="about-content container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main Heading with Parallax */}
        <motion.h2
          className="about-heading"
          style={{ y: parallaxHeading }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          About Me
        </motion.h2>

        {/* Tabs Navigation */}
        <nav className="about-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`about-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="tab-wrapper">
          <motion.div className="tab-content" variants={contentVariant}>
            {renderActiveTab()}
          </motion.div>
        </div>

        {/* Call-to-Action */}
        <motion.div className="cta-section" variants={contentVariant}>
          <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to Top
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;