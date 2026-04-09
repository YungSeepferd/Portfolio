/**
 * Green Wallet Project Data
 *
 * This file contains the structured data for the Green Wallet sustainable tourism project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

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
import presentationPDF from '../../../../assets/information/Greenwallet/GreenWallet_Presentation.pdf';

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
    conceptOverview6: ConceptOverview6Image
  },
  videos: {
    highlightReel: HighlightReelVideo,
    presentation: PresentationVideo
  }
};

// Define card variant without direct theme dependency
const cardVariant = 'success';

// Project data object
const greenWallet = {
  id: 'greenWallet',
  title: "Green Wallet – Sustainable Tourism",
  description: "A gamified cashless payment system promoting sustainable tourism, developed at a 24 hour hackathon.",
  categories: ["UI Design", "UX Research", "Sustainable UX", "Tourism", "Gamification"],
  technologies: ["Figma", "Adobe Illustrator", "Adobe Premiere Pro"],
  cardVariant: cardVariant,
  links: [
    {
      label: "Try Prototype",
      url: "https://embed.figma.com/proto/9BlQKTEFOIPKA1qSexIQMP/Mastercard-App--Copy-?node-id=89-9677&starting-point-node-id=89%3A9677&embed-host=share",
      contentType: 'iframe',
      openInPopup: true
    },
    {
      label: "View Presentation",
      url: presentationPDF,
      contentType: 'pdf',
      openInPopup: true
    },
    {
      label: "Hackathon Winner",
      url: "https://www.linkedin.com/posts/alles-fuer-den-gast_allesfaesrdengast-gastmesse-gastrohackathon-activity-7129517120463192064-_11i?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC2Uif8Be-XBXBcxg2OW-UH9jV1ETYju6Dw",
      contentType: 'external',
      openInPopup: true
    }
  ],
  sections: [
    {
      id: 'section-overview',
      type: 'default',
      title: 'Project Overview',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Green Wallet emerged from the Tourism Technology Festival 2023 Hackathon in Salzburg as a response to Mastercard's challenge: increase cashless payment adoption in tourism and gastronomy.
          </Typography>
          <Typography variant="body1" paragraph>
            Our FH Salzburg team created a gamified solution that benefits tourists, shop owners, Mastercard, and regional sustainability simultaneously.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.overview },
      layout: 'textLeft',
      anchor: 'overview',
      navigable: true
    },
    {
      id: 'section-hackathon',
      type: 'default',
      title: 'Hackathon Context',
      content: (
        <Typography variant="body1" paragraph>
          The Tourism Technology Festival 2023 united tech innovators, tourism experts, and students to solve challenges in the evolving tourism industry. Our team tackled Mastercard's challenge track focused on cashless payment adoption and enhanced tourist experiences.
        </Typography>
      ),
      media: { type: 'image', src: media.images.hackathonTeam },
      layout: 'textRight',
      anchor: 'hackathon',
      navigable: true
    },
    {
      id: 'section-problem',
      type: 'default',
      title: 'Problem Statement',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Many smaller gastronomy businesses and tourist shops prefer cash despite the advantages of digital payments. Onsite research revealed key obstacles:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Transaction costs:</strong> Perceived high fees for digital payments</Typography></li>
            <li><Typography variant="body1"><strong>Security concerns:</strong> Worries about electronic payment system safety</Typography></li>
            <li><Typography variant="body1"><strong>Missing incentives:</strong> No immediate visible benefits for shop owners</Typography></li>
            <li><Typography variant="body1"><strong>Tourist distribution:</strong> Uneven visitor flow across regional attractions</Typography></li>
            <li><Typography variant="body1"><strong>Sustainability gaps:</strong> Limited mechanisms promoting responsible tourism</Typography></li>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.cashlessPayment },
      layout: 'textLeft',
      anchor: 'problem',
      navigable: true
    },
    {
      id: 'section-concept',
      type: 'default',
      title: 'Innovative Concept: Green Wallet',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Green Wallet addresses these challenges through gamification that motivates tourists and shop owners to adopt cashless transactions while aligning commercial goals with environmental responsibility.
          </Typography>
          
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Core Features</Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Gamified events:</strong> Shop owners create limited time events with bonus reward points, attracting customers and distributing tourists to less crowded areas</Typography></li>
            <li><Typography variant="body1"><strong>Eco reward system:</strong> Transaction points redeem for environmental actions like tree planting</Typography></li>
            <li><Typography variant="body1"><strong>Real time analytics:</strong> Shop owners track sales, event participation, and customer demographics instantly</Typography></li>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.prototypeUI },
      layout: 'textRight',
      anchor: 'concept',
      navigable: true
    },
    {
      id: 'section-process',
      type: 'video',
      title: 'Research & Development Process',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The team used a user centered approach during the 24 hour hackathon:
          </Typography>
          <Box component="ol" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Stakeholder interviews:</strong> Local business conversations identified pain points, revealing needs for tangible incentives and simplified systems</Typography></li>
            <li><Typography variant="body1"><strong>Rapid prototyping:</strong> Figma prototypes with separate customer and shop owner interfaces</Typography></li>
            <li><Typography variant="body1"><strong>Gamification design:</strong> Visual elements including reward multipliers, countdown timers, and sustainability achievements</Typography></li>
            <li><Typography variant="body1"><strong>Live demonstration:</strong> Interactive presentation walking through realistic scenarios from both user perspectives</Typography></li>
          </Box>
        </>
      ),
      media: { type: 'video', src: media.videos.highlightReel },
      layout: 'textLeft',
      anchor: 'process',
      navigable: true
    },
    {
      id: 'section-user-journey',
      type: 'default',
      title: 'User Journey & Stakeholder Flows',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Green Wallet supports three interconnected user journeys, creating a sustainable ecosystem benefiting tourists, local businesses, and tourism regions.
          </Typography>
          <Box sx={{ minHeight: 400, flexGrow: 1, maxWidth: 800 }}>
            <SimpleTreeView>
              <TreeItem itemId="tourist" label="Tourist Journey">
                <TreeItem itemId="tourist-arrive" label="1. Arrive in Tourism Region" />
                <TreeItem itemId="tourist-discover" label="2. Discover Green Wallet">
                  <TreeItem itemId="tourist-download" label="Download App" />
                  <TreeItem itemId="tourist-link" label="Link Mastercard" />
                  <TreeItem itemId="tourist-onboard" label="Complete Onboarding" />
                </TreeItem>
                <TreeItem itemId="tourist-explore" label="3. Explore Region">
                  <TreeItem itemId="tourist-map" label="View Interactive Map" />
                  <TreeItem itemId="tourist-events" label="See Nearby Events & Offers" />
                  <TreeItem itemId="tourist-recommendations" label="Get Less Crowded Recommendations" />
                </TreeItem>
                <TreeItem itemId="tourist-engage" label="4. Engage with Local Business">
                  <TreeItem itemId="tourist-visit" label="Visit Participating Shop/Restaurant" />
                  <TreeItem itemId="tourist-pay" label="Pay with Linked Mastercard" />
                  <TreeItem itemId="tourist-earn" label="Earn Green Points (4x during events)" />
                </TreeItem>
                <TreeItem itemId="tourist-impact" label="5. Environmental Impact">
                  <TreeItem itemId="tourist-dashboard" label="View Impact Dashboard" />
                  <TreeItem itemId="tourist-redeem" label="Redeem Points to Plant Trees" />
                  <TreeItem itemId="tourist-share" label="Share Achievements" />
                </TreeItem>
              </TreeItem>
              
              <TreeItem itemId="owner" label="Shop Owner Journey">
                <TreeItem itemId="owner-join" label="1. Join Green Wallet Program">
                  <TreeItem itemId="owner-register" label="Register Business" />
                  <TreeItem itemId="owner-setup" label="Set Up Payment Integration" />
                </TreeItem>
                <TreeItem itemId="owner-create" label="2. Create Events & Offers">
                  <TreeItem itemId="owner-schedule" label="Schedule Pop-up Events" />
                  <TreeItem itemId="owner-multiplier" label="Set Point Multipliers" />
                  <TreeItem itemId="owner-promote" label="Add Promotional Details" />
                </TreeItem>
                <TreeItem itemId="owner-manage" label="3. Manage Operations">
                  <TreeItem itemId="owner-analytics" label="View Real-time Analytics" />
                  <TreeItem itemId="owner-track" label="Track Customer Engagement" />
                  <TreeItem itemId="owner-earnings" label="See Earnings Instantly" />
                </TreeItem>
                <TreeItem itemId="owner-grow" label="4. Grow Customer Base">
                  <TreeItem itemId="owner-attract" label="Attract New Customers via App" />
                  <TreeItem itemId="owner-retain" label="Build Loyalty through Rewards" />
                  <TreeItem itemId="owner-sustainability" label="Promote Sustainability Initiatives" />
                </TreeItem>
              </TreeItem>
              
              <TreeItem itemId="region" label="Tourism Region Benefits">
                <TreeItem itemId="region-distribution" label="1. Even Visitor Distribution">
                  <TreeItem itemId="region-overcrowding" label="Reduce Overcrowding in Hotspots" />
                  <TreeItem itemId="region-promote" label="Promote Hidden Gems" />
                </TreeItem>
                <TreeItem itemId="region-data" label="2. Data-Driven Insights">
                  <TreeItem itemId="region-patterns" label="Track Visitor Movement Patterns" />
                  <TreeItem itemId="region-optimize" label="Optimize Regional Planning" />
                </TreeItem>
                <TreeItem itemId="region-sustainability" label="3. Sustainability Goals">
                  <TreeItem itemId="region-carbon" label="Reduce Carbon Footprint" />
                  <TreeItem itemId="region-greening" label="Increase Regional Greening" />
                  <TreeItem itemId="region-image" label="Improve Green Tourism Image" />
                </TreeItem>
              </TreeItem>
            </SimpleTreeView>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.phoneScreen1 },
      layout: 'textLeft',
      anchor: 'user-journey',
      navigable: true
    },
    {
      id: 'section-user-interfaces',
      type: 'default',
      title: 'User Interfaces',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Green Wallet features two interconnected interfaces:
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>Tourist Interface</Typography>
          <Typography variant="body1" paragraph>
            Emphasizes simplicity and engagement with interactive maps showing nearby events, a progress dashboard tracking environmental impact, and a reward redemption system.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>Shop Owner Interface</Typography>
          <Typography variant="body1" paragraph>
            Provides tools for creating and managing events, viewing real time analytics, and tracking customer engagement to optimize strategies.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.shopOwnerInterface1 },
      layout: 'textRight',
      anchor: 'user-interfaces',
      navigable: true
    },
    {
      id: 'section-benefits',
      type: 'cardGrid',
      title: 'Multi-Stakeholder Benefits',
      content: 'Green Wallet creates value for all participants in the tourism ecosystem through a carefully balanced approach.',
      items: [
        {
          title: 'Tourists',
          icon: '🧳',
          color: 'primary.main',
          description: 'Enhanced travel experiences with sustainable rewards and local discovery.',
          benefits: [
            'Earn rewards and special offers through eco friendly choices',
            'Discover authentic local businesses and hidden gems',
            'Contribute to environmental sustainability',
            'Seamless cashless payment experience',
            'Gamified exploration of the region'
          ]
        },
        {
          title: 'Shop Owners',
          icon: '🏪',
          color: 'success.main',
          description: 'Increased visibility and customer engagement through sustainable practices.',
          benefits: [
            'Attract more customers through gamified events',
            'Improve brand image via sustainability commitment',
            'Access to customer analytics and insights',
            'Reduced cash handling costs and risks',
            'Participation in regional tourism network'
          ]
        },
        {
          title: 'Mastercard',
          icon: '💳',
          color: 'warning.main',
          description: 'Strategic positioning as a sustainability leader in payment solutions.',
          benefits: [
            'Increased card usage and transaction volume',
            'Brand positioning as environmentally responsible',
            'Valuable customer behavior data and insights',
            'Competitive advantage in sustainable tourism',
            'Partnership opportunities with local businesses'
          ]
        },
        {
          title: 'Environment',
          icon: '🌱',
          color: 'success.dark',
          description: 'Measurable positive impact on regional sustainability goals.',
          benefits: [
            'Reduced paper waste from receipts and vouchers',
            'Incentivized sustainable business practices',
            'Trackable environmental impact metrics',
            'Support for local eco friendly initiatives',
            'Long term behavioral change toward sustainability'
          ]
        }
      ],
      columns: { xs: 1, sm: 2, md: 2, lg: 2 },
      cardVariant: 'elevation',
      anchor: 'benefits',
      navigable: true
    },
    {
      id: 'section-outcome',
      type: 'video',
      title: 'Hackathon Outcome',
      content: (
        <Typography variant="body1" paragraph>
          Green Wallet won first place at the hackathon. Judges recognized the innovative approach to sustainable tourism, multi stakeholder benefit model, scalability potential, and measurable environmental impact metrics.
        </Typography>
      ),
      media: { type: 'video', src: media.videos.presentation },
      layout: 'textLeft',
      anchor: 'outcome',
      navigable: true
    },
    {
      id: 'section-future',
      type: 'outcomes',
      title: 'Future Directions',
      content: (
        <Typography variant="body1" paragraph>
          Future development opportunities include geolocation based event notifications, expanded eco friendly activities, enhanced analytics, and geographic scaling to maximize environmental and commercial impact.
        </Typography>
      ),
      media: { type: 'image', src: media.images.exhibition },
      layout: 'textRight',
      anchor: 'future',
      navigable: true,
      takeaways: [
        "Gamification drives sustainable behaviors",
        "Mutual benefit is key to eco friendly solution adoption",
        "Visual environmental impact feedback increases motivation",
        "Digital wallets bridge economic and environmental incentives",
        "Rapid prototyping is essential for time constrained projects"
      ],
      outcomes: {
        title: "Project Achievements",
        points: [
          "Competed in the Tourism Technology Festival 2023 Hackathon (November 11, 2023)",
          "Developed solution addressing Mastercard's challenge track",
          "Created gamified concept connecting sustainability with tourism economics"
        ]
      }
    },
    {
      id: 'section-references',
      type: 'default',
      title: 'Project Context',
      content: (
        <>
          <Typography variant="body2" paragraph sx={{ mb: 3, fontStyle: 'italic', color: 'text.secondary' }}>
            24-hour hackathon project developed at Tourism Technology Festival 2023, Salzburg. Winner of Mastercard's challenge track for cashless payment innovation. All project resources are available via the action buttons above.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Related Topics & Concepts
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body2">
                <strong>Sustainable tourism:</strong> Balancing economic growth with environmental responsibility
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Gamification in fintech:</strong> Using game mechanics to drive behavioral change
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Cashless payment adoption:</strong> Reducing barriers for small businesses
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Multi-stakeholder design:</strong> Creating value for tourists, businesses, and regions
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Environmental impact tracking:</strong> Measurable sustainability metrics in digital products
              </Typography>
            </li>
          </Box>
        </>
      ),
      layout: 'textOnly',
      anchor: 'references',
      navigable: true
    }
  ]
};

greenWallet.media = (() => {
  const firstVideo = greenWallet.sections?.find(s => s.media && s.media.type === 'video');
  if (firstVideo) return firstVideo.media;
  const firstImage = greenWallet.sections?.find(s => s.media && s.media.type === 'image');
  if (firstImage) return firstImage.media;
  return undefined;
})();

export default greenWallet;
