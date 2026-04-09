import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

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
    slowThinkingLevel3Screenshot: SlowThinkingLevel3ScreenshotImage
  },
  videos: {
    slowThinkingVideoPrototype: SlowThinkingVideoPrototype
  }
};

// Define card variant without direct theme dependency
const cardVariant = 'info';

// Project data object
const bachelorThesis = {
  id: 'bachelorThesis',
  title: "Passenger Reroute – Bachelor Thesis",
  description: "Research into how passengers interact with autonomous vehicle systems when making spontaneous route changes.",
  categories: ["Automotive UX", "UI Design", "Prototyping", "UX Research", "User Testing"],
  technologies: ["Figma", "Adobe After Effects", "Adobe Illustrator", "User Testing"],
  cardVariant: cardVariant,
  links: [
    {
      label: "View Thesis",
      url: thesisPDF,
      contentType: 'pdf',
      openInPopup: true
    },
    {
      label: "View Presentation",
      url: presentationPDF,
      contentType: 'pdf',
      openInPopup: true
    }
  ],
  sections: [
    {
      id: 'section-overview',
      type: 'default',
      title: 'Overview',
      content: (
        <>
          <Typography variant="body1" paragraph>
            When anticipating future self-driving cars, it is conceivable that passenger communication with an autonomous driving system could be difficult under a variety of possible real life scenarios. Having to give time critical commands to a driverless car with overly complex or overly simplified interfaces could cause stress, distrust, or even misuse of a novel system.
          </Typography>
          <Typography variant="body1" paragraph>
            As more omnipresent smartphone applications become interoperable with newer in-car infotainment systems, this thesis implemented a spontaneous phone-based intervention prototype. To support this specific in-time intervention for rear seat passengers and to investigate their trust relationship with an autonomous system, three phone-based user interfaces with small, medium, and large amounts of information were developed and tested.
          </Typography>
          <Typography variant="body1" paragraph>
            With autonomous driving progressing toward SAE automation levels 4 and 5 where an active driver is no longer needed, simple and intuitive controls are required to maintain passenger trust while passengers intervene in the system's driving process.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.prototypeFlows },
      layout: 'textLeft',
      anchor: 'overview',
      navigable: true
    },
    {
      id: 'section-problem',
      type: 'default',
      title: 'Problem Statement',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Cooperation between the driver and passengers has been an important part of mutually beneficial travel experiences since the invention of the automobile. Before ubiquitous computer-supported navigation, the co-driver used analog maps to give directions. If a car passenger had a wish for an intermediate stop, they only had to make it known in conversation with the trusted driver.
          </Typography>
          <Typography variant="body1" paragraph>
            However, as the technological development of autonomous driving progresses, an active driver should no longer be needed. As the way in which the passenger intervenes in the system's driving process is important to maintain the passenger's trust in the system, simple and intuitive controls are required.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Key research challenges:</strong>
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Trust maintenance:</strong> Investigating passengers' trust relationship with autonomous systems during spontaneous interventions</Typography></li>
            <li><Typography variant="body1"><strong>Information density:</strong> Testing three levels (small, medium, large) to determine optimal UI complexity</Typography></li>
            <li><Typography variant="body1"><strong>Time pressure influence:</strong> Analyzing how time constraints affect cooperation performance and trust</Typography></li>
            <li><Typography variant="body1"><strong>Interface usability:</strong> Ensuring intuitive mobile phone-based interactions for rear seat passengers</Typography></li>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.slowThinkingLevel1 },
      layout: 'textRight',
      anchor: 'problem',
      navigable: true
    },
    {
      type: 'default',
      title: 'Research Design & Questions',
      content: (
        <>
          <Typography variant="body1" paragraph>
            <strong>Participant Demographics:</strong>
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Sample size:</strong> n=30 participants total</Typography></li>
            <li><Typography variant="body1"><strong>Age distribution:</strong> 83.33% aged 20-29, 10% aged 30-39, 6.67% aged 60-69</Typography></li>
            <li><Typography variant="body1"><strong>Gender distribution:</strong> 66.67% male, 30% female, 3.33% declined to specify</Typography></li>
            <li><Typography variant="body1"><strong>Travel patterns:</strong> 43.33% traveled weekly as passengers, 36.67% monthly, 13.33% daily, 6.67% rarely</Typography></li>
          </Box>
          
          <Box sx={{ 
            display: 'grid',
            gap: 3,
            mt: 4,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(2, 1fr)'
            },
            gridTemplateRows: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(1, 1fr)',
              lg: 'repeat(1, 1fr)'
            }
          }}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Icon sx={{ fontSize: 32, mr: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
                    speed
                  </Icon>
                  <Typography variant="h6" fontWeight="bold">
                    Fast Thinking Group
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                  • Participants 1-15<br/>
                  • 3 minutes to plan stopover<br/>
                  • Simulated moving AV camera feed<br/>
                  • High time pressure context
                </Typography>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 2,
                  p: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2
                }}>
                  <Icon sx={{ fontSize: 16, mr: 1 }}>schedule</Icon>
                  <Typography variant="caption" fontWeight="medium">
                    3 minutes
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(240, 147, 251, 0.4)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Icon sx={{ fontSize: 32, mr: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
                    schedule
                  </Icon>
                  <Typography variant="h6" fontWeight="bold">
                    Slow Thinking Group
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                  • Participants 16-30<br/>
                  • 15 minutes to plan stopover<br/>
                  • Parked car camera feed<br/>
                  • Low time pressure context
                </Typography>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 2,
                  p: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2
                }}>
                  <Icon sx={{ fontSize: 16, mr: 1 }}>schedule</Icon>
                  <Typography variant="caption" fontWeight="medium">
                    15 minutes
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Typography variant="body1" paragraph>
            Both groups evaluated three information density levels in random order. This design revealed how time constraints and information complexity interact to shape user experience and decisions.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'text.secondary' }}>Research Questions</Typography>
          <Box component="ol" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5 } }}>
            <li>
              <Typography variant="body1">
                <strong>RQ1:</strong> How does the amount of information impact a passenger's cooperative performance and trust in the system? And is the time restraint relevant in this case?
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>RQ2:</strong> How much information should be presented on a UI to ensure that the passenger is able to make an intuitive, spontaneous decision?
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>RQ3:</strong> How would the degree of information capacity affect cooperative performance, willingness, and trust in the system? And is the degree of time constraints relevant in this context?
              </Typography>
            </li>
          </Box>
        </>
      ),
      layout: 'textOnly',
      anchor: 'research',
      navigable: true
    },
    {
      id: 'section-study-procedure',
      type: 'default',
      title: 'Study Procedure & User Flow',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Each participant experienced all three information density levels in a randomized order, simulating spontaneous rerouting decisions in an autonomous vehicle.
          </Typography>
          <Box sx={{ minHeight: 400, flexGrow: 1, maxWidth: 800 }}>
            <SimpleTreeView>
              <TreeItem itemId="welcome" label="1. Welcome & Consent">
                <TreeItem itemId="welcome-intro" label="Introduction to Study" />
                <TreeItem itemId="welcome-consent" label="Informed Consent Form" />
                <TreeItem itemId="welcome-demo" label="Demographic Survey" />
              </TreeItem>
              
              <TreeItem itemId="group" label="2. Group Assignment">
                <TreeItem itemId="group-ft" label="Fast Thinking Group (n=15)">
                  <TreeItem itemId="ft-context" label="Context: Moving Car" />
                  <TreeItem itemId="ft-time" label="Time Limit: 3 Minutes" />
                  <TreeItem itemId="ft-pressure" label="High Time Pressure" />
                </TreeItem>
                <TreeItem itemId="group-st" label="Slow Thinking Group (n=15)">
                  <TreeItem itemId="st-context" label="Context: Parked Car" />
                  <TreeItem itemId="st-time" label="Time Limit: 15 Minutes" />
                  <TreeItem itemId="st-pressure" label="Low Time Pressure" />
                </TreeItem>
              </TreeItem>
              
              <TreeItem itemId="baseline" label="3. Baseline Trust Survey">
                <TreeItem itemId="baseline-sts" label="System Trust Scale (STS)" />
                <TreeItem itemId="baseline-av" label="AV Experience Questions" />
              </TreeItem>
              
              <TreeItem itemId="scenarios" label="4. Rerouting Scenarios (3 Levels)">
                <TreeItem itemId="level1" label="Level 1: Simple Information">
                  <TreeItem itemId="level1-present" label="Present Scenario & Route" />
                  <TreeItem itemId="level1-suggest" label="Show Rerouting Suggestion" />
                  <TreeItem itemId="level1-choose" label="User Selects Destination" />
                  <TreeItem itemId="level1-confirm" label="Confirm Choice" />
                </TreeItem>
                <TreeItem itemId="level2" label="Level 2: Moderate Information">
                  <TreeItem itemId="level2-present" label="Present Scenario & Route" />
                  <TreeItem itemId="level2-suggest" label="Show Rerouting with Details" />
                  <TreeItem itemId="level2-choose" label="User Selects Destination" />
                  <TreeItem itemId="level2-confirm" label="Confirm Choice" />
                </TreeItem>
                <TreeItem itemId="level3" label="Level 3: Detailed Information">
                  <TreeItem itemId="level3-present" label="Present Scenario & Route" />
                  <TreeItem itemId="level3-suggest" label="Show Full Details & Map" />
                  <TreeItem itemId="level3-choose" label="User Selects Destination" />
                  <TreeItem itemId="level3-confirm" label="Confirm Choice" />
                </TreeItem>
              </TreeItem>
              
              <TreeItem itemId="evaluation" label="5. Post-Interaction Evaluation">
                <TreeItem itemId="eval-trust" label="System Trust Scale (STS)" />
                <TreeItem itemId="eval-sus" label="System Usability Scale (SUS)" />
                <TreeItem itemId="eval-preference" label="Information Level Preference" />
                <TreeItem itemId="eval-feedback" label="Qualitative Feedback" />
              </TreeItem>
              
              <TreeItem itemId="debrief" label="6. Debriefing & Thank You">
                <TreeItem itemId="debrief-discuss" label="Discussion of Experience" />
                <TreeItem itemId="debrief-questions" label="Participant Questions" />
                <TreeItem itemId="debrief-compensate" label="Compensation Provided" />
              </TreeItem>
            </SimpleTreeView>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.prototypeFlows },
      layout: 'textLeft',
      anchor: 'study-procedure',
      navigable: true
    },
    {
      id: 'section-methodology',
      type: 'timeline',
      title: 'Research Methodology Timeline',
      steps: [
        {
          phase: 'Literature Review',
          duration: '3 weeks',
          content: 'Comprehensive review of autonomous vehicle research, trust models, and human computer interaction patterns in mobility contexts. Established theoretical foundation for interface design.',
          color: 'primary',
          outcomes: [
            'Identified gaps in spontaneous rerouting research',
            'Defined trust factors for AV interfaces',
            'Established dual system theory framework (fast/slow thinking)'
          ]
        },
        {
          phase: 'Interface Design',
          duration: '4 weeks',
          content: 'Created three information density levels using Figma and Adobe After Effects. Designed for mobile interaction in rear-seat passenger context with varying detail complexity.',
          color: 'secondary',
          outcomes: [
            'Level 1: Minimal information (essential only)',
            'Level 2: Moderate detail (balanced approach)',
            'Level 3: Comprehensive information (full context)',
            'Animated prototypes for realistic testing'
          ]
        },
        {
          phase: 'Pilot Study',
          duration: '2 weeks',
          content: '11 participants validated UI designs and study protocol. Feedback informed removal of redundant screens and integration of essential route details into main interface.',
          color: 'info',
          outcomes: [
            'Validated interface comprehensibility',
            'Refined information hierarchy',
            'Optimized screen flow',
            'Confirmed study protocol effectiveness'
          ]
        },
        {
          phase: 'Main Study Execution',
          duration: '3 weeks',
          content: 'Online study conducted via Zoom due to pandemic conditions. 30 participants used Figma Mirror prototype on mobile devices while joining one-to-one video sessions. Participants split into Fast Thinking (3 minute, moving car) and Slow Thinking (15 minute, parked car) groups, each evaluating all three information levels in randomized order.',
          color: 'success',
          outcomes: [
            'Successfully adapted study to remote format',
            'Collected quantitative cooperation metrics',
            'Gathered qualitative trust assessments via video',
            'Documented decision-making patterns remotely',
            'Recorded time to decision data digitally'
          ]
        },
        {
          phase: 'Data Analysis',
          duration: '4 weeks',
          content: 'Statistical analysis of cooperation performance, trust ratings, and user preferences. Qualitative coding of participant feedback and behavioral observations.',
          color: 'primary',
          outcomes: [
            'Identified optimal information density',
            'Quantified time pressure effects',
            'Mapped trust information relationships',
            'Derived design recommendations'
          ]
        },
        {
          phase: 'Documentation',
          duration: '2 weeks',
          content: 'Compiled findings into thesis documentation with actionable design guidelines for autonomous vehicle passenger interfaces.',
          color: 'secondary',
          outcomes: [
            'Completed bachelor thesis',
            'Created design guidelines',
            'Developed interface recommendations',
            'Prepared presentation materials'
          ]
        }
      ],
      orientation: 'alternate',
      anchor: 'methodology',
      navigable: true
    },
    {
      id: 'section-methodology-details',
      type: 'default',
      title: 'Study Design Details',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Additional methodological considerations:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>UI density levels:</strong> Three interface complexities tested:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li><Typography variant="body1"><strong>Level 1 (Simple):</strong> Basic perception data including markers and speed</Typography></li>
                <li><Typography variant="body1"><strong>Level 2 (Medium):</strong> Added distance, time, battery, and weather information</Typography></li>
                <li><Typography variant="body1"><strong>Level 3 (Complex):</strong> Full trajectory details with maneuver indicators and route planning</Typography></li>
              </Box>
            </li>
          </Box>
          <Typography variant="body1" paragraph>
            Data collection used Situational Trust Scale (STS) and System Usability Scale (SUS) questionnaires, screen recordings, and semistructured interviews.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.fastThinkingLevel2GIF },
      layout: 'textLeft',
      anchor: 'methodology',
      navigable: true
    },
    {
      id: 'section-technical',
      type: 'video',
      title: 'Technical Implementation',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The study was conducted remotely via Zoom due to COVID-19 pandemic conditions. Participants used Figma Mirror app on their mobile devices during one-to-one video sessions, simulating in-car smartphone interactions.
          </Typography>
          <Typography variant="body1" paragraph>
            Adobe After Effects created traffic camera simulations with augmented reality style overlays showing vehicle trajectory and environmental awareness. Interaction scenarios involved selecting shops for spontaneous stops, categorized by decision complexity.
          </Typography>
        </>
      ),
      media: { type: 'video', src: media.videos.slowThinkingVideoPrototype },
      layout: 'textRight',
      anchor: 'technical',
      navigable: true
    },
    {
      id: 'section-findings',
      type: 'default',
      title: 'Key Findings & Results',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The study with 30 participants split into Fast Thinking (3 minute, moving car) and Slow Thinking (15 minute, parked car) groups revealed how information density and time pressure affect trust, usability, and decision making in autonomous vehicle contexts.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Key Findings:</strong>
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Trust dynamics validated:</strong> Fast Thinking participants showed higher trust in rerouting compared to Slow Thinking participants when measured against baseline trust levels, demonstrating that time pressure context influences trust formation in autonomous vehicle interactions
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Performance timing confirmed:</strong> Fast Thinking group completed rerouting tasks significantly faster (mean 51 seconds) than Slow Thinking group (mean 68 seconds), validating the experimental manipulation of time pressure on decision-making speed
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Interface preference split:</strong> 55.3% of participants preferred built-in car interfaces for autonomous driving interactions, while 45.7% favored mobile device interfaces, indicating divided preferences for interaction modality
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Age-related adaptability:</strong> Younger participants (20-29 age group representing 83.3% of sample) demonstrated greater adaptability to new technology interfaces, suggesting generational differences in technology acceptance
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>AR camera reception:</strong> Picture-in-picture AR traffic camera views were generally viewed positively, enhancing situational awareness and trust in rerouting decisions, though some participants noted potential distraction concerns
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Information density nuances:</strong> Subtle differences between information density levels affected user experience, with level transitions requiring clearer visual distinction to better distribute cognitive load across interface complexity levels
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Learning effects controlled:</strong> Random presentation order of interface levels successfully minimized learning effects on resulting data, ensuring valid comparison across information density conditions
              </Typography>
            </li>
          </Box>
          <Typography variant="body1" paragraph>
            The results of the study offer data about trust, usability, and participants' willingness to interact in staged everyday situations with time pressure as an additional factor. This rear seat passenger prototype is the first step towards more realistic, comprehensive UX design concepts, incorporating trustworthy navigational intervention in future autonomous vehicles.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Key conclusions:</strong>
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Time pressure influences trust formation:</strong> Fast Thinking participants developed higher trust in autonomous rerouting compared to Slow Thinking participants, indicating that time constraints shape user confidence in AV systems
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Interface modality preferences:</strong> 55.3% preferred built-in car interfaces while 45.7% favored mobile devices, showing divided preferences that future AV systems must accommodate through adaptive interface options
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Practical concerns remain:</strong> Both interface types raised concerns about IT security, battery life, responsiveness, and system reliability, highlighting the need for robust, user-centered design solutions
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Foundation for future AV UX:</strong> This research provides empirical evidence for designing trustworthy autonomous vehicle interfaces, particularly for spontaneous passenger interventions during travel
              </Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.fastThinkingLevel3 },
      layout: 'textLeft',
      anchor: 'findings',
      navigable: true
    },
    {
      id: 'section-recommendations',
      type: 'default',
      title: 'Recommendations & Future Work',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Design guidelines for future AV systems:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Personalization:</strong> Allow passengers to adjust UI complexity based on preferences
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Multimodal feedback:</strong> Add auditory and haptic cues to reduce visual cognitive load
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Real world validation:</strong> Test in actual vehicles under dynamic traffic conditions
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Security considerations:</strong> Address data security and operational reliability concerns
              </Typography>
            </li>
          </Box>
        </>
      ),
      layout: 'textOnly',
      anchor: 'recommendations',
      navigable: true
    },
    {
      id: 'section-impact',
      type: 'outcomes',
      title: 'Academic Impact',
      content: (
        <Typography variant="body1" paragraph>
          This research contributes practical design guidelines to human AV interaction. The findings show that balanced information presentation enhances trust and usability, informing how future autonomous systems interact with passengers.
        </Typography>
      ),
      media: { type: 'image', src: media.images.routeOverview },
      layout: 'textRight',
      anchor: 'impact',
      navigable: true,
      takeaways: [
        "Information density impacts user trust in autonomous systems",
        "Time pressure shapes decision making strategies in human machine interactions",
        "Mobile interfaces enable effective passenger AV cooperation",
        "Balanced information presentation improves usability",
        "User testing provides essential insights for autonomous vehicle interface design"
      ],
      outcomes: {
        title: "Research Impact",
        points: [
          "Validated UI design guidelines for automotive interfaces",
          "Research contributions to autonomous vehicle trust and safety"
        ]
      }
    },
    {
      id: 'section-references',
      type: 'default',
      title: 'Academic References',
      content: (
        <>
          <Typography variant="body2" paragraph sx={{ mb: 3, fontStyle: 'italic', color: 'text.secondary' }}>
            Thesis completed at LMU Munich, Department of Media Informatics, under the supervision of Jingyi Li and Prof. Dr. Andreas Butz. All project resources are available via the action buttons above.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Key Academic References
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
            <Button
              size="small"
              variant="outlined"
              color="info"
              endIcon={<OpenInNewIcon />}
              href="https://doi.org/10.1145/3371382.3378253"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Ayoub et al. (2019)
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="info"
              endIcon={<OpenInNewIcon />}
              href="https://doi.org/10.1145/3409251.3411717"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Holthausen et al. (2020) - STS-AD
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="info"
              endIcon={<OpenInNewIcon />}
              href="https://doi.org/10.1145/3173574.3174234"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Frison et al. (2019)
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="info"
              endIcon={<OpenInNewIcon />}
              href="https://doi.org/10.1145/3409251.3411730"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Walch et al. (2020)
            </Button>
          </Box>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <li>
              <Typography variant="body2">
                Ayoub, J., Zhou, F., Bao, S., & Yang, X. J. (2019). From manual driving to automated driving: A review of 10 years of AutoUI. <em>Proceedings of AutomotiveUI '19</em>, 70–90. ACM.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Bangor, A., Kortum, P., & Miller, J. (2009). Determining what individual SUS scores mean: Adding an adjective rating scale. <em>Journal of Usability Studies</em>, 4(3), 114–123.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Berger, M., Dandekar, A., Bernhaupt, R., & Pfleging, B. (2021). An AR-enabled interactive car door to extend in-car infotainment systems for rear seat passengers. <em>CHI EA '21</em>. ACM.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Frison, A.-K., Wintersberger, P., Riener, A., et al. (2019). In UX we trust: Investigation of aesthetics and usability of driver-vehicle interfaces and their impact on the perception of automated driving. <em>CHI '19</em>, 1–13. ACM.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Holthausen, B. E., Wintersberger, P., Walker, B. N., & Riener, A. (2020). Situational Trust Scale for Automated Driving (STS-AD): Development and initial validation. <em>AutomotiveUI '20</em>, 40–47. ACM.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Pfleging, B., Rang, M., & Broy, N. (2016). Investigating user needs for non-driving-related activities during automated driving. <em>MUM '16</em>, 91–99. ACM.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Rümelin, S., Siegl, P., & Butz, A. (2013). Could you please...? Investigating cooperation in the car. <em>AutomotiveUI '13 Adjunct</em>, 61–64.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Terken, J., & Pfleging, B. (2020). Toward shared control between automated vehicles and users. <em>Automotive Innovation</em>, 3(1), 53–61.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Walch, M., Li, S., Mandel, I., et al. (2020). Crosswalk cooperation: A phone-integrated driver-vehicle cooperation approach. <em>AutomotiveUI '20</em>, 74–77. ACM.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Wang, C. (2019). A framework of the non-critical spontaneous intervention in highly automated driving scenarios. <em>AutomotiveUI '19 Adjunct</em>, 421–426. ACM.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Wintersberger, P., Nicklas, H., Martlbauer, T., et al. (2020). Explainable automation: Personalized and adaptive UIs to foster trust and understanding. <em>AutomotiveUI '20</em>, 252–261. ACM.
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

// Assign the media field after initialization to avoid ReferenceError
bachelorThesis.media = (() => {
  const firstVideo = bachelorThesis.sections?.find(s => s.media && s.media.type === 'video');
  if (firstVideo) return firstVideo.media;
  const firstImage = bachelorThesis.sections?.find(s => s.media && s.media.type === 'image');
  if (firstImage) return firstImage.media;
  return undefined;
})();

export default bachelorThesis;
