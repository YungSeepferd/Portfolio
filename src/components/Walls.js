import React from 'react';
import { Typography } from '@mui/material';

export const wallsData = [
  {
    title: "Skills",
    content: (
      <>
        <Typography variant="body2">
          <strong>Research &amp; UX:</strong> I began my career as a media informatics student,
          gaining hands-on experience in designing and conducting in-depth interviews and user testing.
        </Typography>
        <Typography variant="body2" mt={1}>
          <strong>Prototyping &amp; Tools:</strong> Proficient with Adobe XD, Figma, and multimedia tools,
          along with coding languages like C++, Python, JavaScript, and React.
        </Typography>
      </>
    ),
    defaultDirection: 0 // Front face
  },
  {
    title: "Interests",
    content: (
      <>
        <Typography variant="body2">
          <strong>Music &amp; Audio:</strong> Producing, mixing, and conceptualizing music since 2015 under the alias Din-Z,
          with skills in various instruments.
        </Typography>
        <Typography variant="body2" mt={1}>
          <strong>Sports &amp; Family:</strong> A lifelong passion for Fussball and a commitment to staying connected with family.
        </Typography>
      </>
    ),
    defaultDirection: Math.PI / 2 // Right face
  },
  {
    title: "Motivations",
    content: (
      <>
        <Typography variant="body2">
          <strong>Academic &amp; Professional Journey:</strong> Currently pursuing a Joint M.Sc. in Human-Computer Interaction
          after a B.Sc in Media Informatics, merging research with practical industry experience.
        </Typography>
        <Typography variant="body2" mt={1}>
          <strong>Growth &amp; Collaboration:</strong> Eager to further expertise in UX design and software engineering through innovative ideas.
        </Typography>
      </>
    ),
    defaultDirection: Math.PI // Back face
  },
  {
    title: "Vision",
    content: (
      <>
        <Typography variant="body2">
          <strong>Design Philosophy:</strong> Believing in technology that is nearly invisible, empowering users seamlessly.
        </Typography>
        <Typography variant="body2" mt={1}>
          <strong>Innovative Projects:</strong> Projects range from affective state haptic feedback to cashless payment solutions,
          demonstrating interdisciplinary research and transformative design.
        </Typography>
      </>
    ),
    defaultDirection: -Math.PI / 2 // Left face
  }
];
