/**
 * Green Wallet Project Data
 *
 * This file contains the structured data for the Green Wallet sustainable tourism project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LaunchIcon from '@mui/icons-material/Launch';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Import from centralized mediaConfig
import { projectMedia, getProjectMediaPath } from '../../../../config/mediaConfig';

// Define video paths properly
const GWHighlightreelVideo = getProjectMediaPath('greenWallet', 'videos', 'highlightreel');
const GWPresentationVideo = getProjectMediaPath('greenWallet', 'videos', 'presentation');

// Define card variant without direct theme dependency
const cardVariant = 'success';

// Project data object
const greenWallet = {
  id: 4,
  title: "Green Wallet – Sustainable Tourism",
  description: "A gamified cashless payment system for sustainable tourism developed during a hackathon.",
  categories: ["UI Design", "UX Research", "Sustainable UX", "Tourism", "Gamification"],
  
  sections: [
    {
      id: 'section-overview',
      title: 'Project Overview',
      content: (
        <Typography variant="body1" paragraph>
          The Green Wallet was developed during the Tourism Technology Festival 2023 Hackathon in Salzburg, as part of Mastercard's challenge to promote the adoption of cashless payments in tourism and gastronomy sectors. Our team, representing FH Salzburg, created an innovative gamified solution that simultaneously benefits tourists, local shop owners, Mastercard, and regional sustainability efforts.
        </Typography>
      ),
      media: { type: 'image', src: projectMedia.greenWallet.images.overview },
      layout: 'textLeft'
    },
    {
      id: 'section-hackathon',
      title: 'Hackathon Context',
      content: (
        <Typography variant="body1" paragraph>
          The Tourism Technology Festival 2023 brought together tech innovators, tourism experts, and students to address challenges in the rapidly evolving tourism industry. Our team participated in Mastercard's specific challenge track focused on increasing cashless payment adoption while enhancing the overall tourist experience.
        </Typography>
      ),
      layout: 'textOnly'
    },
    {
      id: 'section-problem',
      title: 'Problem Statement',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Many smaller gastronomy businesses and tourist-oriented shops continue to prefer cash over cashless transactions, despite proven advantages. Our on-site research revealed common obstacles:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Perceived high transaction fees for digital payments</Typography></li>
            <li><Typography variant="body1">Security concerns about electronic payment systems</Typography></li>
            <li><Typography variant="body1">Lack of immediate visible incentives for shop owners</Typography></li>
            <li><Typography variant="body1">Inefficient tourist distribution across regional attractions</Typography></li>
            <li><Typography variant="body1">Limited mechanisms for promoting sustainable tourism</Typography></li>
          </Box>
        </>
      ),
      layout: 'textRight'
    },
    {
      id: 'section-concept',
      title: 'Innovative Concept: Green Wallet',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Green Wallet addresses these multi-faceted challenges through an engaging, gamified user experience that motivates both tourists and shop owners to shift towards cashless transactions, aligning commercial incentives with environmental responsibility.
          </Typography>
          
          <Typography variant="h4">Core Functionalities</Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Gamified Events:</strong> Shop owners create limited-time special events where Mastercard users receive increased reward points, attracting customers and distributing tourists to less crowded areas
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Eco-conscious Reward System:</strong> Users accumulate points from transactions redeemable for environmentally positive actions like planting trees
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Real-time Analytics:</strong> Shop owners receive immediate insights into sales performance, event participation, and customer demographics
              </Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'image', src: projectMedia.greenWallet.images.solution },
      layout: 'textLeft'
    },
    {
      id: 'section-process',
      title: 'Research & Development Process',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Our team employed a robust user-centered approach during the 24-hour hackathon:
          </Typography>
          <Box component="ol" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Stakeholder Interviews (On-site Research):</strong> We interviewed local businesses to identify pain points regarding cashless payment adoption, revealing needs for tangible incentives and simplified systems
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Rapid Prototyping:</strong> Created detailed Figma prototypes with separate customer and shop owner user interfaces
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Gamification Mechanics:</strong> Designed visually appealing elements like reward multipliers, event countdown timers, and sustainability achievements
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Interactive User Flow Presentation:</strong> Scripted and presented a live demonstration walking through realistic usage scenarios from both user perspectives
              </Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'video', src: GWHighlightreelVideo },
      layout: 'textRight'
    },
    {
      id: 'section-benefits',
      title: 'Multi-stakeholder Benefits',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The Green Wallet creates a win-win scenario for all involved parties:
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Tourists</Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <li><Typography variant="body1">Financial incentives through rewards and special offers</Typography></li>
              <li><Typography variant="body1">Discovery of new local businesses and experiences</Typography></li>
              <li><Typography variant="body1">Contribution to environmental sustainability</Typography></li>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Shop Owners</Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <li><Typography variant="body1">Increased customer traffic through gamified events</Typography></li>
              <li><Typography variant="body1">Improved brand image through sustainable practices</Typography></li>
              <li><Typography variant="body1">Enhanced analytics and customer insights</Typography></li>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Mastercard</Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <li><Typography variant="body1">Increased card usage and transaction volume</Typography></li>
              <li><Typography variant="body1">Enhanced brand image as environmentally responsible</Typography></li>
              <li><Typography variant="body1">Valuable customer behavior data and insights</Typography></li>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Tourism Regions</Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <li><Typography variant="body1">Better visitor distribution across attractions</Typography></li>
              <li><Typography variant="body1">Reduced overcrowding at popular locations</Typography></li>
              <li><Typography variant="body1">Positive environmental impact from eco-initiatives</Typography></li>
            </Box>
          </Box>
        </>
      ),
      layout: 'textOnly'
    },
    {
      id: 'section-outcome',
      title: 'Hackathon Outcome',
      content: (
        <Typography variant="body1" paragraph>
          The Green Wallet concept was awarded first place in the hackathon, recognized for its innovative approach to sustainable tourism and business viability. The judges particularly appreciated our multi-stakeholder benefit model, scalability potential, and measurable environmental impact metrics.
        </Typography>
      ),
      media: { type: 'video', src: GWPresentationVideo },
      layout: 'textLeft'
    },
    {
      id: 'section-future',
      title: 'Future Directions',
      content: (
        <Typography variant="body1" paragraph>
          Future refinements could include geolocation-based event notifications, expanded eco-friendly activities, enhanced analytics tools, and scaling to broader geographic contexts to maximize environmental and commercial impacts.
        </Typography>
      ),
      layout: 'textOnly'
    }
  ],

  galleryImages: [
    projectMedia.greenWallet.images.overview,
    projectMedia.greenWallet.images.solution,
    { type: 'video', src: GWHighlightreelVideo },
    { type: 'video', src: GWPresentationVideo }
  ],
  technologies: ["Figma", "Adobe Illustrator", "Adobe Premiere Pro"],
  cardVariant: cardVariant,
  media: { type: 'image', src: projectMedia.greenWallet.images.overview },
  featuredImages: {
    overview: projectMedia.greenWallet.images.overview,
    problem: projectMedia.greenWallet.images.overview,
    solution: projectMedia.greenWallet.images.solution
  },
  links: [
    {
      label: "Try Prototype",
      url: "https://embed.figma.com/proto/9BlQKTEFOIPKA1qSexIQMP/Mastercard-App--Copy-?node-id=89-9677&starting-point-node-id=89%3A9677&embed-host=share",
      icon: <LaunchIcon fontSize="small" />,
      contentType: 'iframe'
    },
    {
      label: "View Presentation",
      url: "src/assets/information/Green Wallet/Green_Wallet_Presentation.pdf",
      icon: <SlideshowIcon fontSize="small" />,
      contentType: 'pdf'
    },
    {
      label: "Hackathon Winner",
      url: "https://tourism-technology-festival.at/",
      icon: <EmojiEventsIcon fontSize="small" />,
      contentType: 'external'
    }
  ],
  takeaways: [
    "Gamification can effectively drive sustainable behaviors",
    "Creating mutual benefit is key to adoption of eco-friendly solutions",
    "Visual feedback on environmental impact increases user motivation",
    "Digital wallets can bridge economic and environmental incentives",
    "Rapid prototyping techniques are essential for time-constrained projects"
  ],
  
  outcomes: {
    title: "Project Achievements",
    points: [
      "First place in the Tourism Technology Festival 2023 Hackathon",
      "Solution recommended for pilot implementation by Mastercard",
      "Positive reception from local tourism stakeholders"
    ]
  }
};

export default greenWallet;