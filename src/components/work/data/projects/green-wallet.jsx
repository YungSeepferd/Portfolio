/**
 * Green Wallet Project Data
 *
 * This file contains the structured data for the Green Wallet sustainable tourism project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

// Import all project images and videos directly
import OverviewImage from '../../../../assets/images/GreenWallet/green_wallet_logo.png';
import CashlessPaymentImage from '../../../../assets/images/GreenWallet/cashless_payment_overview.png';
import PrototypeUIImage from '../../../../assets/images/GreenWallet/prototype_ui.png';
import HackathonTeamImage from '../../../../assets/images/GreenWallet/hackathon_team.jpeg';
import ExhibitionImage from '../../../../assets/images/GreenWallet/exhibition_photo.jpg';
import PhoneScreen1Image from '../../../../assets/images/GreenWallet/phone_screen_1.png';
import PhoneScreen2Image from '../../../../assets/images/GreenWallet/phone_screen_2.png';
import PhoneScreen3Image from '../../../../assets/images/GreenWallet/phone_screen_3.png';
import PhoneScreen4Image from '../../../../assets/images/GreenWallet/phone_screen_4.png';
import ShopOwnerInterface1Image from '../../../../assets/images/GreenWallet/shop_owner_interface_1.png';
import ShopOwnerInterface2Image from '../../../../assets/images/GreenWallet/shop_owner_interface_2.png';
import ShopOwnerScreen1Image from '../../../../assets/images/GreenWallet/shop_owner_screen_1.png';
import ShopOwnerScreen2Image from '../../../../assets/images/GreenWallet/shop_owner_screen_2.png';
import ConceptOverview1Image from '../../../../assets/images/GreenWallet/concept_overview_1.png';
import ConceptOverview2Image from '../../../../assets/images/GreenWallet/concept_overview_2.png';
import ConceptOverview3Image from '../../../../assets/images/GreenWallet/concept_overview_3.png';
import ConceptOverview4Image from '../../../../assets/images/GreenWallet/concept_overview_4.png';
import ConceptOverview5Image from '../../../../assets/images/GreenWallet/concept_overview_5.png';
import ConceptOverview6Image from '../../../../assets/images/GreenWallet/concept_overview_6.png';
import HighlightReelVideo from '../../../../assets/images/GreenWallet/highlight_reel.mp4';
import PresentationVideo from '../../../../assets/images/GreenWallet/presentation_video.mp4';
// Import presentation PDF from GreenWallet directory
import presentationPDF from '../../../../assets/information/GreenWallet/GreenWallet_Presentation.pdf';

// Create a media object to hold all our imported media
const media = {
  images: {
    overview: OverviewImage,
    cashlessPayment: CashlessPaymentImage,
    prototypeUI: PrototypeUIImage,
    hackathonTeam: HackathonTeamImage,
    exhibition: ExhibitionImage,
    phoneScreen1: PhoneScreen1Image,
    phoneScreen2: PhoneScreen2Image,
    phoneScreen3: PhoneScreen3Image,
    phoneScreen4: PhoneScreen4Image,
    shopOwnerInterface1: ShopOwnerInterface1Image,
    shopOwnerInterface2: ShopOwnerInterface2Image,
    shopOwnerScreen1: ShopOwnerScreen1Image,
    shopOwnerScreen2: ShopOwnerScreen2Image,
    conceptOverview1: ConceptOverview1Image,
    conceptOverview2: ConceptOverview2Image,
    conceptOverview3: ConceptOverview3Image,
    conceptOverview4: ConceptOverview4Image,
    conceptOverview5: ConceptOverview5Image,
    conceptOverview6: ConceptOverview6Image,
  },
  videos: {
    highlightReel: HighlightReelVideo,
    presentation: PresentationVideo,
  },
};

// Define card variant without direct theme dependency
const cardVariant = 'success';

// Project data object
const greenWallet = {
  id: 'greenWallet',
  title: 'Green Wallet – Sustainable Tourism',
  description:
    'A gamified cashless payment system for sustainable tourism developed during a hackathon.',
  shortDescription: 'Mobile app promoting eco-tourism through gamified cashless payments.',
  categories: ['UI Design', 'UX Research', 'Sustainable UX', 'Tourism', 'Gamification'],
  technologies: ['Figma', 'Adobe Illustrator', 'Adobe Premiere Pro'],
  cardVariant: cardVariant,
  links: [
    {
      label: 'Try Prototype',
      url: 'https://embed.figma.com/proto/9BlQKTEFOIPKA1qSexIQMP/Mastercard-App--Copy-?node-id=89-9677&starting-point-node-id=89%3A9677&embed-host=share',
      icon: <SmartphoneIcon fontSize="small" />,
      contentType: 'iframe',
      openInPopup: true,
    },
    {
      label: 'View Presentation',
      url: presentationPDF,
      icon: <SlideshowIcon fontSize="small" />,
      contentType: 'pdf',
      openInPopup: true,
    },
    {
      label: 'Hackathon Winner',
      url: 'https://www.linkedin.com/posts/alles-fuer-den-gast_allesfaesrdengast-gastmesse-gastrohackathon-activity-7129517120463192064-_11i?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC2Uif8Be-XBXBcxg2OW-UH9jV1ETYju6Dw',
      icon: <EmojiEventsIcon fontSize="small" />,
      contentType: 'external',
      openInPopup: true,
    },
  ],
  sections: [
    // 1. Overview
    {
      id: 'section-overview',
      type: 'overview',
      title: 'Project Overview',
      content: (
        <Typography variant="body1" paragraph>
          The Green Wallet was developed during the Tourism Technology Festival 2023 Hackathon in
          Salzburg, as part of Mastercard's challenge to promote the adoption of cashless payments
          in tourism and gastronomy sectors. Our team, representing FH Salzburg, created an
          innovative gamified solution that simultaneously benefits tourists, local shop owners,
          Mastercard, and regional sustainability efforts.
        </Typography>
      ),
      media: { type: 'image', src: media.images.overview },
      layout: 'textLeft',
      anchor: 'overview',
      navigable: true,
    },
    // 2. Context
    {
      id: 'section-hackathon',
      type: 'context',
      title: 'Hackathon Context',
      content: (
        <Typography variant="body1" paragraph>
          The Tourism Technology Festival 2023 brought together tech innovators, tourism experts,
          and students to address challenges in the rapidly evolving tourism industry. Our team
          participated in Mastercard's specific challenge track focused on increasing cashless
          payment adoption while enhancing the overall tourist experience.
        </Typography>
      ),
      media: { type: 'image', src: media.images.hackathonTeam },
      layout: 'textRight',
      anchor: 'hackathon',
      navigable: true,
    },
    // 3. Problem
    {
      id: 'section-problem',
      type: 'problem',
      title: 'Problem Statement',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Many smaller gastronomy businesses and tourist-oriented shops continue to prefer cash
            over cashless transactions, despite proven advantages. Our on-site research revealed
            common obstacles:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                Perceived high transaction fees for digital payments
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Security concerns about electronic payment systems
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Lack of immediate visible incentives for shop owners
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Inefficient tourist distribution across regional attractions
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Limited mechanisms for promoting sustainable tourism
              </Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.cashlessPayment },
      layout: 'textLeft',
      anchor: 'problem',
      navigable: true,
    },
    // 4. Concept
    {
      id: 'section-concept',
      type: 'concept',
      title: 'Innovative Concept: Green Wallet',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Green Wallet addresses these multi-faceted challenges through an engaging, gamified user
            experience that motivates both tourists and shop owners to shift towards cashless
            transactions, aligning commercial incentives with environmental responsibility.
          </Typography>

          <Typography variant="h4">Core Functionalities</Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Gamified Events:</strong> Shop owners create limited-time special events
                where Mastercard users receive increased reward points, attracting customers and
                distributing tourists to less crowded areas
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Eco-conscious Reward System:</strong> Users accumulate points from
                transactions redeemable for environmentally positive actions like planting trees
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Real-time Analytics:</strong> Shop owners receive immediate insights into
                sales performance, event participation, and customer demographics
              </Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.prototypeUI },
      layout: 'textRight',
      anchor: 'concept',
      navigable: true,
    },
    // 5. Methodology
    {
      id: 'section-process',
      type: 'methodology',
      title: 'Research & Development Process',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Our team employed a robust user-centered approach during the 24-hour hackathon:
          </Typography>
          <Box component="ol" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Stakeholder Interviews (On-site Research):</strong> We interviewed local
                businesses to identify pain points regarding cashless payment adoption, revealing
                needs for tangible incentives and simplified systems
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Rapid Prototyping:</strong> Created detailed Figma prototypes with separate
                customer and shop owner user interfaces
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Gamification Mechanics:</strong> Designed visually appealing elements like
                reward multipliers, event countdown timers, and sustainability achievements
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Interactive User Flow Presentation:</strong> Scripted and presented a live
                demonstration walking through realistic usage scenarios from both user perspectives
              </Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'video', src: media.videos.highlightReel },
      layout: 'textLeft',
      anchor: 'process',
      navigable: true,
    },
    // 6. Technical (User Interfaces)
    {
      id: 'section-user-interfaces',
      type: 'technical',
      title: 'User Interfaces',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The Green Wallet features two distinct but interconnected interfaces:
          </Typography>

          <Typography variant="h5" sx={{ mb: 1 }}>
            Tourist Interface
          </Typography>
          <Typography variant="body1" paragraph>
            Designed with a focus on simplicity and engagement, the tourist interface includes
            interactive maps showing nearby event locations, a progress dashboard tracking
            environmental impact, and a reward redemption system.
          </Typography>

          <Typography variant="h5" sx={{ mb: 1 }}>
            Shop Owner Interface
          </Typography>
          <Typography variant="body1" paragraph>
            The business-oriented interface provides tools for creating and managing special events,
            viewing real-time analytics, and tracking customer engagement patterns to optimize
            business strategies.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.shopOwnerInterface1 },
      layout: 'textRight',
      anchor: 'user-interfaces',
      navigable: true,
    },
    // 7. Benefits
    {
      id: 'section-benefits',
      type: 'benefits',
      title: 'Multi-stakeholder Benefits',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The Green Wallet creates a win-win scenario for all involved parties:
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Tourists
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <li>
                <Typography variant="body1">
                  Financial incentives through rewards and special offers
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Discovery of new local businesses and experiences
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Contribution to environmental sustainability
                </Typography>
              </li>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Shop Owners
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <li>
                <Typography variant="body1">
                  Increased customer traffic through gamified events
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Improved brand image through sustainable practices
                </Typography>
              </li>
              <li>
                <Typography variant="body1">Enhanced analytics and customer insights</Typography>
              </li>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Mastercard
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <li>
                <Typography variant="body1">Increased card usage and transaction volume</Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Enhanced brand image as environmentally responsible
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Valuable customer behavior data and insights
                </Typography>
              </li>
            </Box>
          </Box>
        </>
      ),
      layout: 'textOnly',
      anchor: 'benefits',
      navigable: true,
    },
    // 8. Outcomes
    {
      id: 'section-outcome',
      type: 'outcomes',
      title: 'Hackathon Outcome',
      content: (
        <Typography variant="body1" paragraph>
          The Green Wallet concept was awarded first place in the hackathon, recognized for its
          innovative approach to sustainable tourism and business viability. The judges particularly
          appreciated our multi-stakeholder benefit model, scalability potential, and measurable
          environmental impact metrics.
        </Typography>
      ),
      media: { type: 'video', src: media.videos.presentation },
      layout: 'textLeft',
      anchor: 'outcome',
      navigable: true,
    },
    // 9. Future
    {
      id: 'section-future',
      type: 'future',
      title: 'Future Directions',
      content: (
        <Typography variant="body1" paragraph>
          Future refinements could include geolocation-based event notifications, expanded
          eco-friendly activities, enhanced analytics tools, and scaling to broader geographic
          contexts to maximize environmental and commercial impacts.
        </Typography>
      ),
      media: { type: 'image', src: media.images.exhibition },
      layout: 'textRight',
      anchor: 'future',
      navigable: true,
      takeaways: [
        'Gamification can effectively drive sustainable behaviors',
        'Creating mutual benefit is key to adoption of eco-friendly solutions',
        'Visual feedback on environmental impact increases user motivation',
        'Digital wallets can bridge economic and environmental incentives',
        'Rapid prototyping techniques are essential for time-constrained projects',
      ],
      outcomes: {
        title: 'Project Achievements',
        points: [
          'First place in the Tourism Technology Festival 2023 Hackathon',
          'Solution recommended for pilot implementation by Mastercard',
          'Positive reception from local tourism stakeholders',
        ],
      },
    },
  ],
};

greenWallet.media = (() => {
  const firstVideo = greenWallet.sections?.find((s) => s.media && s.media.type === 'video');
  if (firstVideo) return firstVideo.media;
  const firstImage = greenWallet.sections?.find((s) => s.media && s.media.type === 'image');
  if (firstImage) return firstImage.media;
  return undefined;
})();

export default greenWallet;
