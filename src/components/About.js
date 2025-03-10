import React, { useState } from 'react';
import { motion, useViewportScroll, useTransform, AnimatePresence } from 'framer-motion';
import './About.css';
import Button from './Button';
import Tooltip from './Tooltip';

// Core Competence Groups
const jobTitles = ["Sound Designer", "Audio Engineer"];
const expertiseFields = ["UX Research", "UI Design", "Human-Computer Interaction (HCI)"];
const coreSkills = ["Hardware Prototyping", "Software Prototyping", "Coding (MacOS, Linux, Windows)"];

// Additional Tag Lists for Distribution in different sections
const bioTags = ["Sound Design", "UX Design", "Frontend Coding", "Teamplayer", "Innovative", "User Focused"];
const experienceTags = ["Research", "Prototyping", "Collaboration"];
const passionTags = ["Music", "Sports", "Family"];

// Biography content for accordion tabs
const bioSections = {
  background: `I studied media informatics at LMU Munich with a focus on human-machine interaction 
and trained as a certified audio designer at Deutsche Pop in Munich. 
My preference for audio became evident during my bachelor's degree when I wrote a seminar paper on how audio guides our human perception in VR.`,
  interests: `I'm passionate about exploring new haptic feedback solutions and immersive sound design, constantly merging technology with human-centred design.`,
  aspirations: `I aim to join a large UX department where I can continue to expand my expertise 
in interaction design and research to create transformative user experiences.`
};

// Framer Motion variant for sections
const sectionVariant = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", bounce: 0.2, duration: 0.8 }
  }
};

// Reusable component for rendering a list of tags with an optional tooltip
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

// Reusable component to render core competence tags (with section title)
const CompetenceTagList = ({ title, competences }) => (
  <div className="competence-tag-section">
    <h4>{title}</h4>
    <div className="competence-taglist">
      {competences.map((comp, idx) => (
        <Tooltip key={idx} text={`Learn more about ${comp}`}>
          <span className="competence-tag">{comp}</span>
        </Tooltip>
      ))}
    </div>
  </div>
);

const About = () => {
  // State for accordion tabs in the biography section
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
        className="container about-content"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Intro Heading with Parallax & Fade-In */}
        <motion.h2 
          className="about-heading" 
          style={{ y: parallaxHeading }}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          About Me
        </motion.h2>

        {/* Core Competences Section */}
        <motion.div className="about-core" variants={sectionVariant}>
          <h3>Core Competences</h3>
          <CompetenceTagList title="Professional Roles" competences={jobTitles} />
          <CompetenceTagList title="Fields of Expertise" competences={expertiseFields} />
          <CompetenceTagList title="Core Skills" competences={coreSkills} />
        </motion.div>

        {/* Biography Section with Accordion */}
        <motion.div className="about-bio" variants={sectionVariant}>
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
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="accordion-content"
            >
              <p>{bioSections[activeTab]}</p>
            </motion.div>
          </AnimatePresence>
          {/* Additional Tags in Biography Section */}
          <TagList title="My Focus:" tags={bioTags} />
        </motion.div>

        {/* Professional Experience Section */}
        <motion.div className="about-experience" variants={sectionVariant}>
          <h3>Professional Experience</h3>
          <motion.p>
            From 01.2020 to 12.2022, I worked as a research assistant in the nuclear medicine department at the University Hospital of Munich—setting up podcast environments focused on themes like women in the medical field.
            In early 2022, I interned as a UX researcher and prototyper at DJay in Munich. Now, I aim to join a large UX department to expand my expertise in interaction design.
          </motion.p>
          {/* Experience Tags */}
          <TagList title="Key Areas:" tags={experienceTags} />
        </motion.div>

        {/* Additional Interests Section */}
        <motion.div className="about-extra" variants={sectionVariant}>
          <h3>More About Me</h3>
          <div className="extra-details">
            <div className="extra-item">
              <h4>User Experience Research</h4>
              <p>
                My professional journey began as a media informatics student where I conducted in-depth user interviews and testing across diverse fields such as automated driving, nuclear medicine, and audio engineering.
              </p>
            </div>
            <div className="extra-item">
              <h4>Prototyping</h4>
              <p>
                In my first UX design internship, I pushed the boundaries of prototyping using tools like Adobe XD, Figma, Fresco, After Effects, and Ableton Live 11.
              </p>
            </div>
            <div className="extra-item">
              <h4>When I'm Not Working</h4>
              <p>
                <strong>Music:</strong> I’ve been producing and mixing music since 2015—performing as Din-Z and occasionally working as a HipHop producer. I also sing and play multiple instruments.
              </p>
              <p>
                <strong>Sports:</strong> A lifelong fussball player and enthusiast, I keep fit and enjoy professional matches, especially as a dedicated FC Schalke 04 fan.
              </p>
              <p>
                <strong>Family:</strong> Being the seventh child in a large family, I frequently travel between Hamburg, München, Berlin, and Bonn to see loved ones.
              </p>
            </div>
          </div>
          {/* Passion Tags */}
          <TagList title="I Love:" tags={passionTags} />
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div className="about-cta" variants={sectionVariant}>
          <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to Top
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;