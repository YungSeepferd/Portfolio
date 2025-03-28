import React from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

// Expanded and refined wallsData with merged categories
export const wallsData = [
  {
    title: "🤓 About Me",
    content: (
      <>
        <Typography variant="body1" gutterBottom>
          Hi! I’m Vincent Göke 🚀, a Human-Computer Interaction Master’s graduate, sound designer, and interaction technologist 💻. My work is centered around designing <strong>emotion-driven experiences 😊</strong> through <strong>affective haptics, UX research, and multi-sensory interaction design 🎨</strong>.
        </Typography>
        <Typography variant="body1" gutterBottom>
          With a background in media informatics and audio design 🎧, I transitioned into <strong>haptic interaction design</strong>—an underexplored but promising field that bridges touch, sound, and technology to create intuitive and immersive user experiences ✨.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🎶 <strong>Beyond Work</strong>: Producing and mixing music under the aliases <em>Din-Z</em> and <em>Superior Motive</em> since 2015. I occasionally contribute to <strong>HipHop production</strong> and <strong>audio post-production 🎚️</strong>.
        </Typography>
        <Typography variant="body1" gutterBottom>
          ⚽ <strong>Sports</strong>: Passionate about football, former player, and lifelong <strong>FC Schalke 04</strong> supporter ⚡.
        </Typography>
      </>
    ),
  },
  {
    title: "🎓 Education",
    content: (
      <>
        <Typography variant="body1" gutterBottom>
          ✅ M.Sc. Human-Computer Interaction – FH Salzburg & PLUS Salzburg
        </Typography>
        <Typography variant="body1" gutterBottom>
        ✅ B.Sc. Media Informatics – LMU Munich
        </Typography>
        <Typography variant="body1" gutterBottom>
        ✅ Diploma in Audio Design – Deutsche POP, Munich
        </Typography>
      </>
    ),
  },
  {
    title: "🔍 My Evolution",
    content: (
      <>
        <Typography variant="body1" gutterBottom>
          🎧 Originally trained in <strong>audio design & perceptual soundscapes</strong>, I explored how <strong>spatial sound and sound cues</strong> enhance user perception and guide attention.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🔄 My research pivoted towards <strong>haptic interaction</strong>, where I apply my <strong>audio design background</strong> to explore the emotional and perceptual impact of <strong>tactile feedback</strong>.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🛠️ Today, I specialize in <strong>multi-sensory UX</strong>, integrating <strong>sound, touch, and AI-driven interaction</strong> to create intuitive, emotion-centered design solutions.
        </Typography>
      </>
    ),
  },
  {
    title: "💡 Core Skills",
    content: (
      <>
        <Typography variant="body1" gutterBottom>
          🎛️ <strong>Affective Haptics & Sensory UX</strong> – Bridging emotional design & technology to enhance human perception.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🔊 <strong>Audio-Driven Interaction Design</strong> – Exploring how sound can serve as an intuitive guide for user experiences.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🎨 <strong>UX Research & Prototyping</strong> – Merging cognitive science with hands-on iterative design and user testing.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🏎️ <strong>Automated Driving UX</strong> – Investigated user trust factors in self-driving car interfaces (Bachelor Thesis).
        </Typography>
        <Typography variant="body1" gutterBottom>
          🏥 <strong>Healthcare UX</strong> – Explored interaction design in <strong>nuclear medicine</strong> applications.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🎵 <strong>Affective Computing & ADHD Support</strong> – Researched UX-driven approaches to <strong>emotional self-regulation</strong>.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🎭 <strong>Emotion-Centered Interfaces</strong> – Applying psychological models to craft engaging, meaningful interactions.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🖥️ <strong>Frontend Development</strong> – Leveraging <strong>React, Three.js, Tone.js, AI APIs</strong> for interactive experiences.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🏗️ <strong>Prototyping Expertise</strong> – Developed <strong>on-body haptic feedback systems</strong> using <strong>Hapticlabs DevKit</strong>.
        </Typography>
      </>
    ),
  },
  {
    title: "🌟 Professional Experience",
    content: (
      <>
        <Typography variant="body1" gutterBottom>
          🎵 <strong>UX Intern @ DJay Munich (2022)</strong> – Conducted user research and prototyped new interaction models for music-related applications.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🎧 <strong>IT & Podcast Production Support @ University Hospital Munich (2020–2022)</strong> – Provided technical support and developed an audio production pipeline for podcast content.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🎼 <strong>Freelance Audio Producer / Sound Designer (Din-Z) – Since 2015</strong> – Created original music compositions, mixed audio for projects, and collaborated with artists.
        </Typography>
      </>
    ),
  },
  {
    title: "🎶 Tools & Tech",
    content: (
      <>
        <Typography variant="body1" gutterBottom>
          🎨 <strong>Design & Research</strong> – Figma, Miro, Adobe XD, Illustrator, After Effects.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🎧 <strong>Audio Processing</strong> – Ableton Live, Adobe Audition, spatial sound design.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🖥️ <strong>Frontend Development</strong> – React, Three.js, Tone.js, Bootstrap, EmailJS.
        </Typography>
        <Typography variant="body1" gutterBottom>
          🛠️ <strong>Prototyping Hardware</strong> – Hapticlabs DevKit + Studio, Arduino.
        </Typography>
      </>
    ),
  }
];
