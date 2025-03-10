import React, { useState } from 'react';
import { motion, useViewportScroll, useTransform, AnimatePresence } from 'framer-motion';
import './About.css';
import Button from './Button';
import Tooltip from './Tooltip';

// Core Competence Groups
const jobTitles = ["Sound Designer", "Audio Engineer"];
const expertiseFields = ["UX Research", "UI Design", "Human-Computer Interaction (HCI)"];
const coreSkills = ["Hardware Prototyping", "Software Prototyping", "Coding (Mac, Linux, Windows)"];

// Additional Tag Lists for Distribution
const bioTags = ["Sound Design", "UX Design", "Frontend Coding", "Teamplayer", "Innovative", "User Focused"];
const experienceTags = ["Research", "Prototyping", "Collaboration"];
const passionTags = ["Music", "Sports", "Family"];

// Biography content for accordion tabs
const bioSections = {
  background: `I studied media informatics at LMU Munich with a focus on human-machine interaction 
and trained as a certified audio designer at Deutsche Pop in Munich. 
During my bachelor's I explored how audio can shape our perception in virtual reality.`,
  interests: `I'm passionate about combining interactive sound and design to create better haptic feedback and immersive experiences.`,
  aspirations: `I aim to join a large UX team where I can further evolve my interaction design and research expertise.`
};

// Framer Motion variant for sections
const sectionVariant = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20, duration: 0.8 }
  }
};

// Reusable component for rendering a list of tags with tooltips
const TagList = ({ title, tags }) => (
  <div className="tag-section">
    {title && <h4>{title}</h4>}
    <div className="tag-list">
      {tags.map((tag, idx) => (
        <Tooltip key={idx} text={`More about ${tag}`}>
          <span className="tag">{tag}</span>
        </Tooltip>
      ))}
    </div>
  </div>
);

// Reusable component for core competence tag groups
const CompetenceTagList = ({ title, competences }) => (
  <div className="tag-group">
    <h4>{title}</h4>
    <div className="tag-list">
      {competences.map((comp, idx) => (
        <Tooltip key={idx} text={`Learn more about ${comp}`}>
          <span className="tag">{comp}</span>
        </Tooltip>
      ))}
    </div>
  </div>
);

const About = () => {
  const [activeTab, setActiveTab] = useState('background');
  const { scrollY } = useViewportScroll();
  const parallaxHeading = useTransform(scrollY, [0, 300], [0, -30]);

  return (
    <section
      id="about"
      className="about-section"
      style={{ backgroundImage: "url('../assets/css/images/Moosach Musik Moritz.jpg')" }}
    >
      <div className="about-overlay" />
      <motion.div
        className="about-content container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Intro Heading */}
        <motion.h2 
          className="about-heading"
          style={{ y: parallaxHeading }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          About Me
        </motion.h2>

        {/* Core Competences */}
        <motion.div className="section-block competence-section" variants={sectionVariant}>
          <h3>Core Competences</h3>
          <CompetenceTagList title="Professional Roles" competences={jobTitles} />
          <CompetenceTagList title="Fields of Expertise" competences={expertiseFields} />
          <CompetenceTagList title="Core Skills" competences={coreSkills} />
        </motion.div>

        {/* Biography Accordion */}
        <motion.div className="section-block bio-section" variants={sectionVariant}>
          <h3>Who Am I?</h3>
          <div className="accordion-tabs">
            {['background', 'interests', 'aspirations'].map((tab) => (
              <button 
                key={tab}
                className={`accordion-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                aria-expanded={activeTab === tab}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="accordion-content"
            >
              <p>{bioSections[activeTab]}</p>
            </motion.div>
          </AnimatePresence>
          <TagList title="My Focus:" tags={bioTags} />
        </motion.div>

        {/* Professional Experience */}
        <motion.div className="section-block experience-section" variants={sectionVariant}>
          <h3>Professional Experience</h3>
          <motion.p className="section-text">
            From 01.2020 to 12.2022 I worked as a research assistant at the University Hospital of Munich – setting up podcast environments highlighting women in medicine.
            In early 2022 I interned as a UX researcher and prototyper at DJay in Munich. I now seek to join a large UX department and grow my skills further.
          </motion.p>
          <TagList title="Key Areas:" tags={experienceTags} />
        </motion.div>

        {/* Additional Interests */}
        <motion.div className="section-block extra-section" variants={sectionVariant}>
          <h3>More About Me</h3>
          <div className="extra-details">
            <div className="extra-item">
              <h4>User Experience Research</h4>
              <p>
                My journey started with in-depth user interviews and testing across diverse fields – from automotive to medicine.
              </p>
            </div>
            <div className="extra-item">
              <h4>Prototyping</h4>
              <p>
                I experimented with tools like Adobe XD, Figma, and After Effects, pushing the limits of interactive design.
              </p>
            </div>
            <div className="extra-item">
              <h4>When I'm Not Working</h4>
              <p><strong>Music:</strong> I've produced and mixed music since 2015 and perform as Din-Z.</p>
              <p><strong>Sports:</strong> A passionate fussball player and dedicated FC Schalke 04 fan.</p>
              <p><strong>Family:</strong> I often travel between Hamburg, München, Berlin, and Bonn to spend time with loved ones.</p>
            </div>
          </div>
          <TagList title="I Love:" tags={passionTags} />
        </motion.div>

        {/* Call-to-Action */}
        <motion.div className="section-block cta-section" variants={sectionVariant}>
          <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to Top
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;