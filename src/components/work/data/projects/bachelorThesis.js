/**
 * Bachelor Thesis Project Data
 * 
 * This file contains the structured data for the Passenger Reroute Bachelor Thesis project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';

// Import project images and videos
import FTLevel2GIF from '../../../../assets/images/Bachelorthesis/FT Level 2 GIF.gif';
import PrototypeFlows from '../../../../assets/images/Bachelorthesis/3_prototype_flows_Figmabboard.png';
import Level1STUI from '../../../../assets/images/Bachelorthesis/Level 1 ST UI.png';
import Level2FTUI from '../../../../assets/images/Bachelorthesis/Level 2 FT UI.png';
import Level3FTUI from '../../../../assets/images/Bachelorthesis/Level 3 FT UI.png';
import Level2STUI from '../../../../assets/images/Bachelorthesis/Level 2 ST UI.png';
import Level3STUI from '../../../../assets/images/Bachelorthesis/Level 3 ST UI.png';
import Endscreen from '../../../../assets/images/Bachelorthesis/Endscreen.png';
import Routenuebersicht from '../../../../assets/images/Bachelorthesis/Routenuebersicht.PNG';
import ReroutingProcessVideo from '../../../../assets/images/Bachelorthesis/VideoPrototype_ST3.mp4';

// Define card variant without direct theme dependency
const cardVariant = 'info';

// Project data object
const bachelorThesis = {
  id: 6,
  title: "Passenger Reroute – Bachelor Thesis",
  description: "Investigating passenger interaction with autonomous vehicle systems for spontaneous route adjustments.",
  categories: ["Automotive UX", "UI Design", "Prototyping", "UX Research", "User Testing"],
  layoutType: "academic-research",
  details: (
    <>
      <Typography variant="h3">Overview</Typography>
      <Typography variant="body1" paragraph>
        This Bachelor thesis investigated passenger interaction with autonomous vehicle (AV) systems, specifically focusing on <strong>rear-seat passenger cooperation</strong> in non-critical spontaneous rerouting scenarios (NCSS). As autonomous driving technologies evolve to SAE levels 4 and 5, passengers engage increasingly in non-driving related activities (NDRAs), introducing unique challenges in maintaining trust and ensuring intuitive cooperation between passengers and AV systems.
      </Typography>
      
      <Typography variant="h3">Problem Statement</Typography>
      <Typography variant="body1">
        In a future where AVs handle driving tasks autonomously, passengers' trust in the vehicle's decisions becomes crucial. While engaging in NDRAs, passengers may still need to spontaneously adjust routes. Traditional verbal communication with human drivers isn't applicable with autonomous systems, creating potential distrust if interfaces are poorly designed. Key challenges included:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body1"><strong>Maintaining passenger trust</strong> in spontaneous rerouting scenarios</Typography></li>
        <li><Typography variant="body1"><strong>Balancing information density</strong> on phone-based UIs for intuitive decision-making</Typography></li>
        <li><Typography variant="body1"><strong>Understanding the impact of time pressure</strong> on cooperative performance</Typography></li>
      </Box>
      
      <Typography variant="h3">Research Questions</Typography>
      <Typography variant="body1">
        The thesis explored two main research questions:
      </Typography>
      <Box component="ol" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body1">How do varying amounts of information in an AV navigation UI affect passengers' user experience, cooperative performance, and trust? Is time pressure relevant in this context?</Typography></li>
        <li><Typography variant="body1">What is the optimal level of information density that supports passengers' spontaneous decision-making in autonomous driving scenarios?</Typography></li>
      </Box>
      
      <Typography variant="h3">Comprehensive Research Methodology</Typography>
      <Typography variant="body1" paragraph>
        The research was structured into multiple clearly defined phases:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body1">
            <strong>Pilot Study:</strong> Conducted with 11 participants to validate preliminary UI designs, resulting in removal of redundant screens and integration of essential route information
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Main User Study:</strong> Included 30 participants divided into two groups under different time constraints:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Fast Thinking (FT):</strong> 3-minute limit, simulated moving car scenario</Typography></li>
            <li><Typography variant="body1"><strong>Slow Thinking (ST):</strong> 15-minute limit, simulated parked car scenario</Typography></li>
          </Box>
        </li>
        <li>
          <Typography variant="body1">
            <strong>UI Information Density Levels:</strong> Three distinct interface designs tested:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Level 1 (Simple):</strong> Basic perception information (pedestrian and vehicle markers, current speed)</Typography></li>
            <li><Typography variant="body1"><strong>Level 2 (Medium):</strong> Added comprehension-level details (distance/time remaining, battery status, weather)</Typography></li>
            <li><Typography variant="body1"><strong>Level 3 (Complex):</strong> Additional trajectory-level details (maneuver indications, detailed route planning)</Typography></li>
          </Box>
        </li>
      </Box>

      <Typography variant="body1" paragraph>
        Data collection included pre/post-interaction trust questionnaires using the Situational Trust Scale (STS), usability evaluations with the System Usability Scale (SUS), screen recordings of user interactions, and semi-structured interviews for qualitative insights.
      </Typography>
      
      <Typography variant="h3">Technical Implementation</Typography>
      <Typography variant="body1" paragraph>
        Prototypes were designed in Figma and tested using the Figma Mirror app. Traffic camera simulations were created using Adobe After Effects, adding augmented reality-style overlays indicating vehicle trajectory and environmental awareness. Interaction scenarios involved shop selection for spontaneous stops categorized by complexity.
      </Typography>
      
      <Typography variant="h3">Key Findings & Results</Typography>
      <Typography variant="body1">
        Significant findings from the study revealed important insights about passenger-AV interaction:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body1">
            <strong>Trust Measurements:</strong> Post-interaction trust levels (Mean: 5.82) significantly increased compared to baseline trust (Mean: 4.63), validating the effectiveness of UI interventions
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Usability Assessments:</strong> The SUS evaluation yielded a high overall usability score (75.38 out of 100), categorized as "good" to "excellent"
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Time Pressure Effects:</strong> FT participants completed tasks more quickly (avg. 51 seconds) with fewer steps than ST participants (avg. 68 seconds)
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Shop Selection Patterns:</strong> Time pressure influenced decision-making strategies—FT participants typically chose locations farther from their position while ST participants favored closer shops
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Information Density Preferences:</strong> Level 1 (simple UI) received the highest quantitative trust ratings, while Level 3 (complex UI) ranked highest in qualitative interviews
          </Typography>
        </li>
      </Box>
      
      <Typography variant="h3">Recommendations & Future Work</Typography>
      <Typography variant="body1" paragraph>
        The research provides practical guidelines for designing user-centered interventions in future AV systems:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body1">
            <strong>Customization & Personalization:</strong> Allow passengers to personalize UI complexity based on individual preferences
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Multimodal Interaction:</strong> Incorporate auditory and haptic feedback to reduce visual cognitive load
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Real-world Testing:</strong> Extend the study to actual vehicles in dynamic traffic conditions
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Data Security & Reliability:</strong> Address concerns regarding data security and operational contingencies
          </Typography>
        </li>
      </Box>

      <Typography variant="h3">Academic Impact</Typography>
      <Typography variant="body1" paragraph>
        This research contributes valuable insights to the growing field of human-AV interaction, offering practical design guidelines for the automotive industry's UI/UX strategies. The findings demonstrate that balanced information presentation significantly enhances trust and usability, directly influencing how future autonomous systems will interact with human users.
      </Typography>
    </>
  ),
  images: [
    FTLevel2GIF,
    PrototypeFlows,
    Level1STUI,
    Level2FTUI,
    Level3FTUI,
    Level2STUI,
    Level3STUI,
    Endscreen,
    Routenuebersicht,
    { type: 'video', src: ReroutingProcessVideo }
  ],
  tools: ["Figma", "Adobe After Effects", "Adobe Illustrator", "User Testing"],
  cardVariant: cardVariant,
  media: { type: 'image', src: FTLevel2GIF },
  featuredImages: {
    overview: PrototypeFlows,
    problem: Level1STUI,
    solution: Level2FTUI,
    prototypeShowcase: [
      Level3FTUI, 
      Level2STUI, 
      Level3STUI,
      { type: 'video', src: ReroutingProcessVideo }
    ]
  },
  links: [
    {
      label: "View Presentation",
      url: "src/assets/information/Bachelor thesis/PassengerReroute-BachelorThesis.pdf",
      icon: <SlideshowIcon fontSize="small" />,
      contentType: 'pdf'
    },
    {
      label: "View Thesis",
      url: "src/assets/information/Bachelor thesis/Vincent_Göke - Phonebased intervention in self-driving cars.pdf",
      icon: <ArticleIcon fontSize="small" />,
      contentType: 'pdf'
    },
    {
      label: "Academic Publication",
      url: "https://dl.acm.org/doi/10.1145/3411763.3451713",
      icon: <SchoolIcon fontSize="small" />,
      contentType: 'external'
    }
  ],
  keyTakeaways: [
    "Information density significantly impacts user trust in autonomous systems",
    "Time pressure affects decision-making strategies in human-machine interactions",
    "Mobile interfaces are effective tools for passenger-AV cooperation",
    "Balanced information presentation enhances usability in complex systems",
    "User testing reveals critical insights for future autonomous vehicle interfaces"
  ],
  layoutSuggestions: {
    sectionOrder: ["overview", "problem", "research", "methodology", "findings", "recommendations", "impact"],
    specialSections: [
      {
        type: "comparativeAnalysis",
        title: "UI Information Density Comparison",
        layout: "three-column",
        content: "Side-by-side comparison of the three UI information density levels"
      },
      {
        type: "userJourney",
        title: "Passenger Decision Process",
        layout: "full-width",
        content: "Visual representation of how passengers interact with the rerouting interface"
      },
      {
        type: "dataVisualization",
        title: "Trust & Usability Measurements",
        layout: "side-by-side",
        content: "Charts showing the quantitative results from trust and usability assessments"
      }
    ]
  }
};

export default bachelorThesis;