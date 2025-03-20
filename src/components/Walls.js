// Extensive summary: This data module supplies content for the parallax slides. 
// Each slide entry contains its title, rich content using MUI Typography and framer-motion animations,
// as well as default direction data that could later be used to drive individualized animation behaviors.
import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

export const wallsData = [
  {
    title: "Skills",
    content: (
      <>
        <Typography variant="body2" component="span" sx={{ fontSize: '1.25rem', textAlign: 'left' }}>
          <strong>Research &amp; UX:</strong> I began my career with a strong foundation in media informatics...
        </Typography>
        <Typography variant="body2" component="span" sx={{ fontSize: '1.25rem', mt: 1, display: 'block', textAlign: 'left' }}>
          <strong>Prototyping &amp; Tools:</strong> I’m proficient in Adobe XD, Figma, and advanced prototyping techniques...
        </Typography>
        <motion.img
          src="https://via.placeholder.com/400x300"
          alt="Skills placeholder"
          whileHover={{ scale: 1.05 }}
          style={{ marginTop: '1rem', width: '100%', borderRadius: '8px' }}
        />
      </>
    ),
    defaultDirection: 0
  },
  {
    title: "Interests",
    content: (
      <Box
        sx={{
          backgroundImage: 'url(/src/assets/images/moosach music moritz.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '1rem',
          borderRadius: '8px'
        }}
      >
        <Typography variant="body2" component="span" sx={{ fontSize: '1.25rem', textAlign: 'left' }}>
          <strong>Music &amp; Audio:</strong> My creative journey includes producing, mixing, and performance under the alias Din-Z...
        </Typography>
        <Typography variant="body2" component="span" sx={{ fontSize: '1.25rem', mt: 1, display: 'block', textAlign:'left' }}>
          <strong>Sports &amp; Family:</strong> Whether it’s the thrill of Fussball or the warmth of family gatherings, I value the balance...
        </Typography>
        <motion.img
          src="https://via.placeholder.com/400x300"
          alt="Interests placeholder"
          whileHover={{ scale: 1.05 }}
          style={{ marginTop: '1rem', width: '100%', borderRadius: '8px' }}
        />
      </Box>
    ),
    defaultDirection: Math.PI / 2
  },
  {
    title: "Motivations",
    content: (
      <>
        <Typography variant="body2" component="span" sx={{ fontSize: '1.25rem', textAlign: 'left' }}>
          <strong>Academic &amp; Professional Journey:</strong> Currently pursuing a Joint M.Sc. in Human-Computer Interaction, I fuse academic rigor with real-world design challenges to create user-centered interfaces.
        </Typography>
        <Typography variant="body2" component="span" sx={{ fontSize: '1.25rem', mt: 1, display: 'block', textAlign: 'left' }}>
          <strong>Growth &amp; Collaboration:</strong> I continuously seek innovative projects and collaborative opportunities that push the boundaries of UX design and software engineering.
        </Typography>
        <motion.img
          src="https://via.placeholder.com/400x300"
          alt="Motivations placeholder"
          whileHover={{ scale: 1.05 }}
          style={{ marginTop: '1rem', width: '100%', borderRadius: '8px' }}
        />
      </>
    ),
    defaultDirection: Math.PI
  },
  {
    title: "Vision",
    content: (
      <>
        <Typography variant="body2" component="span" sx={{ fontSize: '1.25rem', textAlign: 'left' }}>
          <strong>Design Philosophy:</strong> I believe technology should empower users by being nearly invisible—seamless, intuitive, and supportive of their needs.
        </Typography>
        <Typography variant="body2" component="span" sx={{ fontSize: '1.25rem', mt: 1, display: 'block', textAlign: 'left' }}>
          <strong>Innovative Projects:</strong> My projects, ranging from haptic feedback systems to cashless payment solutions, exemplify a blend of interdisciplinary research and cutting-edge design.
        </Typography>
        <motion.img
          src="https://via.placeholder.com/400x300"
          alt="Vision placeholder"
          whileHover={{ scale: 1.05 }}
          style={{ marginTop: '1rem', width: '100%', borderRadius: '8px' }}
        />
      </>
    ),
    defaultDirection: -Math.PI / 2
  }
];
