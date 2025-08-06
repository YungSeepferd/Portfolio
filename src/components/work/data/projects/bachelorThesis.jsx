import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ArticleIcon from '@mui/icons-material/Article';

// Import project images and videos with standardized names
import PrototypeFlowsImage from '../../../../assets/images/Bachelorthesis/prototype_flows_overview.png';
import EndScreenImage from '../../../../assets/images/Bachelorthesis/end_screen.png';
import FastThinkingLevel2GIF from '../../../../assets/images/Bachelorthesis/fast_thinking_level2.gif';
import SlowThinkingLevel1Image from '../../../../assets/images/Bachelorthesis/slow_thinking_level1.png';
import FastThinkingLevel2Image from '../../../../assets/images/Bachelorthesis/fast_thinking_level2_ui.png';
import SlowThinkingLevel2Image from '../../../../assets/images/Bachelorthesis/slow_thinking_level2.png';
import FastThinkingLevel3Image from '../../../../assets/images/Bachelorthesis/fast_thinking_level3.png';
import SlowThinkingLevel3Image from '../../../../assets/images/Bachelorthesis/slow_thinking_level3.png';
import RouteOverviewImage from '../../../../assets/images/Bachelorthesis/route_overview.png';
import SlowThinkingLevel3ScreenshotImage from '../../../../assets/images/Bachelorthesis/slow_thinking_level3_screenshot.png';
import SlowThinkingVideoPrototype from '../../../../assets/images/Bachelorthesis/slow_thinking_video_prototype.mp4';

import presentationPDF from '../../../../assets/information/Bachelor thesis/PassengerReroute_Presentation.pdf';
import thesisPDF from '../../../../assets/information/Bachelor thesis/PassengerReroute_Thesis.pdf';

// Create a media object to hold all our imported media
const media = {
  images: {
    prototypeFlows: PrototypeFlowsImage,
    endScreen: EndScreenImage,
    fastThinkingLevel2GIF: FastThinkingLevel2GIF,
    slowThinkingLevel1: SlowThinkingLevel1Image,
    fastThinkingLevel2: FastThinkingLevel2Image,
    slowThinkingLevel2: SlowThinkingLevel2Image,
    fastThinkingLevel3: FastThinkingLevel3Image,
    slowThinkingLevel3: SlowThinkingLevel3Image,
    routeOverview: RouteOverviewImage,
    slowThinkingLevel3Screenshot: SlowThinkingLevel3ScreenshotImage,
  },
  videos: {
    slowThinkingVideoPrototype: SlowThinkingVideoPrototype,
  },
};

// Define card variant without direct theme dependency
const cardVariant = 'info';

// Project data object
const bachelorThesis = {
  id: 'bachelorThesis',
  title: 'Passenger Reroute – Bachelor Thesis',
  description:
    'Investigating passenger interaction with autonomous vehicle systems for spontaneous route adjustments.',
  shortDescription: 'Study on passenger trust in autonomous vehicle UI for route changes.',
  categories: ['Automotive UX', 'UI Design', 'Prototyping', 'UX Research', 'User Testing'],
  technologies: ['Figma', 'Adobe After Effects', 'Adobe Illustrator', 'User Testing'],
  cardVariant: cardVariant,
  links: [
    {
      label: 'View Presentation',
      url: presentationPDF,
      icon: <SlideshowIcon fontSize="small" />,
      contentType: 'pdf',
      openInPopup: true,
    },
    {
      label: 'View Thesis',
      url: thesisPDF,
      icon: <ArticleIcon fontSize="small" />,
      contentType: 'pdf',
      openInPopup: true,
    },
  ],
  sections: [
    // 1. Overview
    {
      id: 'section-overview',
      type: 'overview',
      title: 'Overview',
      content: (
        <Typography variant="body1" paragraph>
          This Bachelor thesis investigated passenger interaction with autonomous vehicle (AV)
          systems, specifically focusing on <strong>rear-seat passenger cooperation</strong> in
          non-critical spontaneous rerouting scenarios (NCSS). As autonomous driving technologies
          evolve to SAE levels 4 and 5, passengers engage increasingly in non-driving related
          activities (NDRAs), introducing unique challenges in maintaining trust and ensuring
          intuitive cooperation between passengers and AV systems.
        </Typography>
      ),
      media: { type: 'image', src: media.images.prototypeFlows },
      layout: 'textLeft',
      anchor: 'overview',
      navigable: true,
    },
    // 2. Problem
    {
      id: 'section-problem',
      type: 'problem',
      title: 'Problem Statement',
      content: (
        <>
          <Typography variant="body1">
            In a future where AVs handle driving tasks autonomously, passengers' trust in the
            vehicle's decisions becomes crucial. While engaging in NDRAs, passengers may still need
            to spontaneously adjust routes. Traditional verbal communication with human drivers
            isn't applicable with autonomous systems, creating potential distrust if interfaces are
            poorly designed. Key challenges included:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Maintaining passenger trust</strong> in spontaneous rerouting scenarios
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Balancing information density</strong> on phone-based UIs for intuitive
                decision-making
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Understanding the impact of time pressure</strong> on cooperative
                performance
              </Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.slowThinkingLevel1 },
      layout: 'textRight',
      anchor: 'problem',
      navigable: true,
    },
    // 3. Research
    {
      id: 'section-research',
      type: 'research',
      title: 'Research Questions',
      content: (
        <>
          <Typography variant="body1">The thesis explored two main research questions:</Typography>
          <Box component="ol" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                How do varying amounts of information in an AV navigation UI affect passengers' user
                experience, cooperative performance, and trust? Is time pressure relevant in this
                context?
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                What is the optimal level of information density that supports passengers'
                spontaneous decision-making in autonomous driving scenarios?
              </Typography>
            </li>
          </Box>
        </>
      ),
      layout: 'textOnly',
      anchor: 'research',
      navigable: true,
    },
    // 4. Methodology
    {
      id: 'section-methodology',
      type: 'methodology',
      title: 'Comprehensive Research Methodology',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The research was structured into multiple clearly defined phases:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Pilot Study:</strong> Conducted with 11 participants to validate preliminary
                UI designs, resulting in removal of redundant screens and integration of essential
                route information
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Main User Study:</strong> Included 30 participants divided into two groups
                under different time constraints:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1">
                    <strong>Fast Thinking (FT):</strong> 3-minute limit, simulated moving car
                    scenario
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Slow Thinking (ST):</strong> 15-minute limit, simulated parked car
                    scenario
                  </Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography variant="body1">
                <strong>UI Information Density Levels:</strong> Three distinct interface designs
                tested:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1">
                    <strong>Level 1 (Simple):</strong> Basic perception information (pedestrian and
                    vehicle markers, current speed)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Level 2 (Medium):</strong> Added comprehension-level details
                    (distance/time remaining, battery status, weather)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Level 3 (Complex):</strong> Additional trajectory-level details
                    (maneuver indications, detailed route planning)
                  </Typography>
                </li>
              </Box>
            </li>
          </Box>
          <Typography variant="body1" paragraph>
            Data collection included pre/post-interaction trust questionnaires using the Situational
            Trust Scale (STS), usability evaluations with the System Usability Scale (SUS), screen
            recordings of user interactions, and semi-structured interviews for qualitative
            insights.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.fastThinkingLevel2GIF },
      layout: 'textLeft',
      anchor: 'methodology',
      navigable: true,
    },
    // 5. Technical
    {
      id: 'section-technical',
      type: 'technical',
      title: 'Technical Implementation',
      content: (
        <Typography variant="body1" paragraph>
          Prototypes were designed in Figma and tested using the Figma Mirror app. Traffic camera
          simulations were created using Adobe After Effects, adding augmented reality-style
          overlays indicating vehicle trajectory and environmental awareness. Interaction scenarios
          involved shop selection for spontaneous stops categorized by complexity.
        </Typography>
      ),
      media: { type: 'video', src: media.videos.slowThinkingVideoPrototype },
      layout: 'textRight',
      anchor: 'technical',
      navigable: true,
    },
    // 6. Findings
    {
      id: 'section-findings',
      type: 'findings',
      title: 'Key Findings & Results',
      content: (
        <>
          <Typography variant="body1">
            Significant findings from the study revealed important insights about passenger-AV
            interaction:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Trust Measurements:</strong> Post-interaction trust levels (Mean: 5.82)
                significantly increased compared to baseline trust (Mean: 4.63), validating the
                effectiveness of UI interventions
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Usability Assessments:</strong> The SUS evaluation yielded a high overall
                usability score (75.38 out of 100), categorized as "good" to "excellent"
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Time Pressure Effects:</strong> FT participants completed tasks more quickly
                (avg. 51 seconds) with fewer steps than ST participants (avg. 68 seconds)
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Shop Selection Patterns:</strong> Time pressure influenced decision-making
                strategies—FT participants typically chose locations farther from their position
                while ST participants favored closer shops
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Information Density Preferences:</strong> Level 1 (simple UI) received the
                highest quantitative trust ratings, while Level 3 (complex UI) ranked highest in
                qualitative interviews
              </Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.fastThinkingLevel3 },
      layout: 'textLeft',
      anchor: 'findings',
      navigable: true,
    },
    // 7. Recommendations
    {
      id: 'section-recommendations',
      type: 'recommendations',
      title: 'Recommendations & Future Work',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The research provides practical guidelines for designing user-centered interventions in
            future AV systems:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Customization & Personalization:</strong> Allow passengers to personalize UI
                complexity based on individual preferences
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Multimodal Interaction:</strong> Incorporate auditory and haptic feedback to
                reduce visual cognitive load
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Real-world Testing:</strong> Extend the study to actual vehicles in dynamic
                traffic conditions
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Data Security & Reliability:</strong> Address concerns regarding data
                security and operational contingencies
              </Typography>
            </li>
          </Box>
        </>
      ),
      layout: 'textOnly',
      anchor: 'recommendations',
      navigable: true,
    },
    // 8. Outcomes (Impact)
    {
      id: 'section-impact',
      type: 'outcomes',
      title: 'Academic Impact',
      content: (
        <Typography variant="body1" paragraph>
          This research contributes valuable insights to the growing field of human-AV interaction,
          offering practical design guidelines for the automotive industry's UI/UX strategies. The
          findings demonstrate that balanced information presentation significantly enhances trust
          and usability, directly influencing how future autonomous systems will interact with human
          users.
        </Typography>
      ),
      media: { type: 'image', src: media.images.routeOverview },
      layout: 'textRight',
      anchor: 'impact',
      navigable: true,
      takeaways: [
        'Information density significantly impacts user trust in autonomous systems',
        'Time pressure affects decision-making strategies in human-machine interactions',
        'Mobile interfaces are effective tools for passenger-AV cooperation',
        'Balanced information presentation enhances usability in complex systems',
        'User testing reveals critical insights for future autonomous vehicle interfaces',
      ],
      outcomes: {
        title: 'Research Impact',
        points: [
          'Development of validated UI design guidelines for automotive interfaces',
          'Contribution to autonomous vehicle trust and safety research',
        ],
      },
    },
  ],
};

// Assign the media field after initialization to avoid ReferenceError
bachelorThesis.media = (() => {
  const firstVideo = bachelorThesis.sections?.find((s) => s.media && s.media.type === 'video');
  if (firstVideo) return firstVideo.media;
  const firstImage = bachelorThesis.sections?.find((s) => s.media && s.media.type === 'image');
  if (firstImage) return firstImage.media;
  return undefined;
})();

export default bachelorThesis;
