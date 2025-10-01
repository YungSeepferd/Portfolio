/**
 * Master Thesis Project Data
 * 
 * This file contains the structured data for the Prototyping Emotions master thesis project.
 */
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

// Import project images directly with standardized naming
import OverviewImage from '../../../../assets/images/Masterthesis/headerimagemasterthesis.png';
import ProcessImage from '../../../../assets/images/Masterthesis/workshop_agenda.png';
import CircumplexModelImage from '../../../../assets/images/Masterthesis/circumplex_model.png';
import BodyMappingImage from '../../../../assets/images/Masterthesis/body_map_template.png';
import PrototypeImage from '../../../../assets/images/Masterthesis/prototype_session_1.jpg';
import HapticLabsImage from '../../../../assets/images/Masterthesis/haptic_labs.jpg';
import WorkshopImage from '../../../../assets/images/Masterthesis/workshop.jpg';
import MetaphorElicitationImage from '../../../../assets/images/Masterthesis/metaphor_elicitation_template.jpg';
import AudioHapticsImage from '../../../../assets/images/Masterthesis/audio_haptics.png';
import AffectivePrototype1Image from '../../../../assets/images/Masterthesis/affective_prototype_1.png';
import AffectivePrototype2Image from '../../../../assets/images/Masterthesis/affective_prototype_2.png';
import BodyMapQuestionsImage from '../../../../assets/images/Masterthesis/body_map_questions.jpg';
import WorkshopBodyMapsImage from '../../../../assets/images/Masterthesis/workshop_body_maps.jpg';

// Import project PDFs
import presentationPDF from '../../../../assets/information/Master thesis/Prototyping_Emotions_Thesis_Defense_Presentation_0225.pdf';
import thesisPDF from '../../../../assets/information/Master thesis/Vincent_Master_Thesis0225.pdf';

// Create a media object to hold all our imported media
const media = {
  images: {
    overview: OverviewImage,
    process: ProcessImage,
    circumplex: CircumplexModelImage,
    bodyMapping: BodyMappingImage,
    prototype: PrototypeImage,
    hapticLabs: HapticLabsImage,
    workshop: WorkshopImage,
    metaphorElicitation: MetaphorElicitationImage,
    audioHaptics: AudioHapticsImage,
    affectivePrototype1: AffectivePrototype1Image,
    affectivePrototype2: AffectivePrototype2Image,
    bodyMapQuestions: BodyMapQuestionsImage,
    workshopBodyMaps: WorkshopBodyMapsImage
  }
};

// Define card variant without direct theme dependency
const cardVariant = 'primary';

// Define links array with consistent format (main project resources only)
const links = [
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
  },
  {
    label: "Miro Template",
    url: "https://miro.com/app/live-embed/uXjVLZy8Sr4=/?moveToViewport=-23778,-21432,70849,35904&embedId=821121874827",
    contentType: 'iframe',
    openInPopup: true
  }
];

// Project data object
const masterThesis = {
  id: 'masterThesis',
  title: "Prototyping Emotions – Master Thesis",
  description: "A structured methodology for creating emotionally resonant haptic feedback, designed for novice interaction designers.",
  categories: ["UX Research", "Interaction Design", "HCI Methodologies", "Haptic Design"],
  technologies: ["Figma", "Miro", "Hapticlabs DevKit", "Hapticlabs Studio"],
  cardVariant: cardVariant,
  links: links,
  sections: [
    {
      id: 'section-overview',
      type: 'default',
      title: 'Project Overview',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The need for accessible and intuitive design methodologies for novice interaction designers in affective haptic design is highlighted by recent literature. These resources underscore the importance of creating easy to understand, context appropriate methodologies for ethical and effective affective haptic design. To foster responsible and effective affective haptic system design, novice interaction designers and researchers need easy to understand, context appropriate methodologies that ensure affective haptic systems are ethically designed and reactive to users' emotional needs.
          </Typography>
          <Typography variant="body1" paragraph>
            This thesis proposes the concept of a modular methodological toolkit for novice interaction designers, drawing on principles such as Haptipedia's design framework, exemplary toolkits like Haptic Bits Lab's low cost haptic prototyping tools, and Moussette's 'Simple Haptics' design philosophy. Thereby this research addresses the problem of inaccessible affective haptic design tools by proposing an approach to simplify emotional design and prototyping processes while maintaining flexibility for individual user contexts.
          </Typography>
          <Typography variant="body1" paragraph>
            The modular methodological toolkit draws on these principles to adjust to the fact that single modal haptic experiences are highly personal and context dependent. The toolkit provides novice interaction designers with a structured approach to acquiring and employing methodologies applicable to single modal affective haptic design, including body maps, embodied metaphor elicitation, Emotion Typology, the Circumplex Model of Affect, and Experience Prototyping principles.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.overview },
      layout: 'textLeft',
      anchor: 'overview',
      navigable: true
    },
    {
      id: 'section-gallery',
      type: 'gallery',
      title: 'Project Gallery',
      content: 'A selection of workshop moments, prototypes, and templates used during the study.',
      media: [
        { src: media.images.workshop, alt: 'Workshop session' },
        { src: media.images.prototype, alt: 'On body prototyping' },
        { src: media.images.bodyMapping, alt: 'Body mapping template' },
        { src: media.images.metaphorElicitation, alt: 'Metaphor elicitation template' },
        { src: media.images.hapticLabs, alt: 'Hapticlabs DevKit' },
        { src: media.images.affectivePrototype1, alt: 'Affective prototype variant 1' }
      ],
      layout: 'gallery-small',
      anchor: 'gallery',
      navigable: true
    },
    {
      id: 'section-process-flow',
      type: 'default',
      title: 'Research Process Overview',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The research followed a systematic approach combining literature review, iterative prototyping, and empirical validation through a structured workshop study with 6 participants.
          </Typography>
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
              xs: 'repeat(4, 1fr)',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(2, 1fr)'
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
                    school
                  </Icon>
                  <Typography variant="h6" fontWeight="bold">
                    Phase 1: Emotional Frameworks
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                  • Introduction to Emotion Typology and Circumplex Model of Affect<br/>
                  • Haptic feedback theory and actuator types (ERM, LRA, Piezoelectric)<br/>
                  • Initial survey and personal object identification
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
                    30 minutes
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
                    psychology
                  </Icon>
                  <Typography variant="h6" fontWeight="bold">
                    Phase 2: Metaphor & Body Mapping
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                  • Embodied metaphor elicitation for emotional objects<br/>
                  • Body mapping to identify haptic feedback locations<br/>
                  • Documentation of physical sensations and temporal patterns
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
                    50 minutes
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(79, 172, 254, 0.4)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Icon sx={{ fontSize: 32, mr: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
                    build
                  </Icon>
                  <Typography variant="h6" fontWeight="bold">
                    Phase 3: Tandem Prototyping
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                  • Two 45-minute sessions alternating designer/user roles<br/>
                  • Hapticlabs DevKit implementation on identified body locations<br/>
                  • Real-time feedback and iterative pattern refinement
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
                    2×45 minutes
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                background: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 184, 148, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 184, 148, 0.4)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Icon sx={{ fontSize: 32, mr: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
                    feedback
                  </Icon>
                  <Typography variant="h6" fontWeight="bold">
                    Phase 4: Reflection & Survey
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                  • Group discussion on challenges and insights<br/>
                  • Individual quantitative feedback survey<br/>
                  • Documentation upload and final reflections
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
                    25 minutes
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{
            mt: 4,
            p: 3,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.light', fontWeight: 'bold' }}>
              📊 Workshop Timeline Summary
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Total Duration: <strong>3 hours 50 minutes</strong> • 6 Participants • Mixed-methods evaluation
            </Typography>
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              mt: 2,
              '& > *': {
                flex: '1 1 auto',
                minWidth: '200px'
              }
            }}>
              <Box sx={{
                p: 2,
                bgcolor: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 1,
                borderLeft: '4px solid #667eea',
                textAlign: 'center'
              }}>
                <Typography variant="h4" sx={{ color: '#667eea', fontWeight: 'bold' }}>30</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>Phase 1: Theory</Typography>
              </Box>
              <Box sx={{
                p: 2,
                bgcolor: 'rgba(240, 147, 251, 0.1)',
                borderRadius: 1,
                borderLeft: '4px solid #f093fb',
                textAlign: 'center'
              }}>
                <Typography variant="h4" sx={{ color: '#f093fb', fontWeight: 'bold' }}>50</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>Phase 2: Mapping</Typography>
              </Box>
              <Box sx={{
                p: 2,
                bgcolor: 'rgba(79, 172, 254, 0.1)',
                borderRadius: 1,
                borderLeft: '4px solid #4facfe',
                textAlign: 'center'
              }}>
                <Typography variant="h4" sx={{ color: '#4facfe', fontWeight: 'bold' }}>90</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>Phase 3: Tandem</Typography>
              </Box>
              <Box sx={{
                p: 2,
                bgcolor: 'rgba(0, 184, 148, 0.1)',
                borderRadius: 1,
                borderLeft: '4px solid #00b894',
                textAlign: 'center'
              }}>
                <Typography variant="h4" sx={{ color: '#00b894', fontWeight: 'bold' }}>25</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>Phase 4: Reflection</Typography>
              </Box>
            </Box>
          </Box>
        </>
      ),
      layout: 'textOnly',
      anchor: 'process-flow',
      navigable: true
    },
    {
      id: 'section-problem',
      type: 'default',
      title: 'Motivation & Problem Statement',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Novice interaction designers struggle to translate abstract emotions into tangible tactile experiences. The need for accessible methodologies is critical as affective computing and emotionally rich interactions play an increasing role in HCI.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Key challenges identified:</strong>
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Inaccessible design tools:</strong> Existing haptic prototyping tools present steep technical learning curves that prevent novice designers from focusing on emotional design aspects</Typography></li>
            <li><Typography variant="body1"><strong>Framework gaps:</strong> Few structured emotional frameworks exist that bridge emotion theory with practical haptic design implementation</Typography></li>
            <li><Typography variant="body1"><strong>Limited integration:</strong> Resources rarely combine emotion theory with iterative prototyping methodologies in educational contexts</Typography></li>
            <li><Typography variant="body1"><strong>Context dependency:</strong> Single modal haptic experiences are highly personal and context dependent, requiring flexible yet structured approaches</Typography></li>
            <li><Typography variant="body1"><strong>Technical barriers:</strong> Hardware and software complexity often overshadows the human centered design process</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            This thesis addresses these obstacles by proposing an accessible methodological toolkit that helps novice designers deal with technical challenges while teaching how to design affective haptic feedback or create affective haptic design systems that can be tested for emotional impact.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.circumplex },
      layout: 'textRight',
      anchor: 'problem',
      navigable: true
    },
    {
      id: 'section-research-questions',
      type: 'default',
      title: 'Research Questions & Hypotheses',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The primary purpose of this thesis is to develop and test a comprehensive methodological toolkit designed to support novice interaction designers in creating affective haptic feedback. The toolkit leverages existing design methodologies including embodied metaphor elicitation, the Circumplex Model of Affect, and Experience Prototyping to provide novice designers with structured, accessible approaches to creating affective haptic systems.
          </Typography>
          <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'primary.main' }}>Research Questions</Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5 } }}>
            <li>
              <Typography variant="body1">
                <strong>RQ1:</strong> What is the impact of using embodied metaphors in combination with body maps on the design and communication process of affective haptic feedback for novice interaction designers?
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>RQ2:</strong> How can low fidelity on body tandem prototyping sessions with haptic feedback be structured to elicit valuable insights into emotional responses from users?
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>RQ3:</strong> What specific challenges do novice interaction designers encounter when integrating haptic feedback into low fidelity on body prototype design concepts?
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>RQ4:</strong> What tools and methodologies are needed to make on body affective haptic prototyping accessible to novice interaction designers?
              </Typography>
            </li>
          </Box>
          <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'secondary.main' }}>Research Hypotheses</Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5 } }}>
            <li>
              <Typography variant="body1">
                <strong>H1:</strong> The use of embodied metaphors and body maps will significantly improve the ability of novice interaction designers to communicate and design affective haptic feedback.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>H2:</strong> Structured low fidelity on body tandem prototyping sessions will elicit valuable insights into users' emotional responses, enhancing the design process.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>H3:</strong> Novice interaction designers will face specific challenges related to technical complexities and emotional translation when integrating haptic feedback into low fidelity prototypes.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>H4:</strong> The combination of beginner friendly haptic hardware toolkits and structured design methodologies will make on body affective haptic prototyping more accessible and reduce technical barriers for novice interaction designers.
              </Typography>
            </li>
          </Box>
        </>
      ),
      layout: 'textOnly',
      anchor: 'research-questions',
      navigable: true
    },
    {
      id: 'section-methodology',
      type: 'timeline',
      title: 'Research Methodology Timeline',
      steps: [
        {
          phase: 'Literature Review',
          content: '2 weeks',
          duration: 'Comprehensive review of emotion theory, haptic design literature, and existing frameworks. Established theoretical foundation combining Circumplex Model of Affect and Delft Emotion Typology.',
          color: 'primary',
          outcomes: [
            'Identified gaps in novice friendly haptic design resources',
            'Defined research scope and participant criteria',
            'Established theoretical framework for toolkit'
          ]
        },
        {
          phase: 'Toolkit Development',
          content: '4 weeks',
          duration: 'Created educational materials including visual templates for metaphor elicitation, body mapping guides, and emotion categorization frameworks. Integrated with Hapticlabs DevKit for hands on prototyping.',
          color: 'secondary',
          outcomes: [
            'Developed metaphor elicitation templates',
            'Created body mapping visualization tools',
            'Prepared Miro collaboration boards'
          ]
        },
        {
          phase: 'Workshop Planning',
          content: '2 weeks',
          duration: 'Designed structured workshop agenda with four distinct phases: emotional framework introduction, metaphor elicitation, tandem prototyping, and reflective feedback sessions.',
          color: 'primary',
          outcomes: [
            'Finalized workshop structure and timing',
            'Prepared participant materials and guides',
            'Set up physical and digital workspaces'
          ]
        },
        {
          phase: 'Workshop Execution',
          content: '1 day',
          duration: 'Conducted hands on workshop with 6 participants from diverse backgrounds in human computer interaction and interaction design. Participants alternated roles between designer and user in tandem teams, exploring emotional frameworks, creating body maps, and developing haptic prototypes.',
          color: 'success',
          outcomes: [
            'Collected qualitative feedback from 6 participants',
            'Documented prototyping patterns and role alternation dynamics',
            'Observed learning curves, collaboration patterns, and technical challenges'
          ]
        },
        {
          phase: 'Analysis & Refinement',
          content: '3 weeks',
          duration: 'Analyzed workshop feedback, survey responses, and prototype documentation. Refined toolkit based on participant insights and identified patterns for emotional haptic design.',
          color: 'primary',
          outcomes: [
            'Derived emotion to haptic mapping patterns',
            'Identified optimal actuator placement strategies',
            'Refined toolkit templates based on feedback'
          ]
        },
        {
          phase: 'Documentation',
          content: '2 weeks',
          duration: 'Compiled findings into comprehensive thesis documentation. Packaged toolkit materials for future educational use and created guidelines for implementation.',
          color: 'secondary',
          outcomes: [
            'Completed thesis documentation',
            'Created reusable toolkit package',
            'Developed implementation guidelines'
          ]
        }
      ],
      orientation: 'left',
      outcomesAlign: 'left',
      anchor: 'methodology',
      navigable: true
    },
    {
      id: 'section-workshop-flow',
      type: 'default',
      title: 'Workshop Flow & Structure',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The workshop follows a structured four phase approach that guides participants from theoretical understanding to hands on haptic prototyping. Click any phase or step to see detailed methodology.
          </Typography>
          <Box sx={{ minHeight: 400, flexGrow: 1, maxWidth: 800 }}>
            {React.createElement(() => {
              const [selectedItem, setSelectedItem] = React.useState(null);
              
              const itemDescriptions = {
                'phase1': {
                  title: 'Phase 1: Understanding Emotional Frameworks',
                  description: 'Participants are introduced to the foundational concepts for this Affective Haptics workshop. This includes a presentation of the Emotion Typology, the Circumplex Model of Affect, which categorizes emotions based on their valence (positive-negative) and arousal (high-low), and an introduction to the basic terminologies of haptics, setting the focus on tactile feedback design. This phase provides participants with the necessary background to think critically about the emotional and technical components of haptic design.',
                  scientific: 'Grounded in Russell, J. A. (1980). "A circumplex model of affect" [DOI: 10.1037/h0077714] and Delft Institute\'s Emotion Typology framework for systematic emotional categorization.',
                  citations: [
                    { text: 'Russell (1980)', url: 'https://doi.org/10.1037/h0077714' },
                    { text: 'Posner et al. (2005)', url: 'https://doi.org/10.1017/S0954579405050340' }
                  ]
                },
                'phase1-intro': {
                  title: 'Emotion Typology Introduction',
                  description: 'Participants are introduced to the Emotion Typology developed by the Delft Institute of Positive Design. This tool categorizes a wide range of emotions and serves as a conceptual framework to help participants understand the various emotional responses that can be elicited through design.',
                },
                'phase1-circumplex': {
                  title: 'Circumplex Model of Affect',
                  description: 'The Circumplex Model categorizes emotions based on two dimensions: valence (positive to negative) and arousal (high to low energy). This model serves as a key theoretical tool for guiding participants in mapping emotional states to haptic feedback patterns, providing a structured approach to emotional design.',
                },
                'phase1-haptics': {
                  title: 'Introduction to Haptic Feedback',
                  description: 'Participants are given an overview of the technical aspects of haptics, including how haptic actuators work, what tactile feedback entails, and the different types of sensations that can be generated through haptic devices. Three actuator types are introduced: ERM (simple, strong vibrations), LRA (precise, responsive), and Piezoelectric (high-fidelity, fastest response).',
                },
                'phase2': {
                  title: 'Phase 2: Metaphor Elicitation & Body Mapping',
                  description: 'The second phase is designed to deepen participants\' engagement with both the emotional and physical aspects of haptic feedback design by using embodied metaphor elicitation and body mapping techniques. Through structured activities, participants explore the emotional resonance of objects they brought with them and begin to associate specific bodily sensations with these emotions. Each tandem group engages with an emotional object, mapping their object-related emotions to specific body parts.',
                  scientific: 'Based on Bakker, S., Antle, A. N., & van den Hoven, E. (2012). "Embodied metaphors in tangible interaction design" [DOI: 10.1007/s00779-011-0410-4] and Turmo Vidal, L. et al. (2023). "Towards Advancing Body Maps as Research Tool" [DOI: 10.1145/3569009.3573838] for translating abstract emotions into tangible design parameters.',
                  citations: [
                    { text: 'Bakker et al. (2012)', url: 'https://doi.org/10.1007/s00779-011-0410-4' },
                    { text: 'Turmo Vidal et al. (2023)', url: 'https://doi.org/10.1145/3569009.3573838' }
                  ]
                },
                'phase2-object': {
                  title: 'Introduce Emotional Object',
                  description: 'Each participant presents a personal object they brought to the workshop and describes the emotions associated with it during an initial presentation round. For example, one participant linked their ring to feelings of support and admiration. This personal connection forms the foundation for the entire prototyping process.',
                },
                'phase2-metaphor': {
                  title: 'Elicit Embodied Metaphors',
                  description: 'Participants are guided through embodied metaphor elicitation, where metaphors linked to their objects help translate abstract emotional experiences into concrete sensory descriptions. They document these on dedicated worksheets, exploring physical sensations, temporal patterns, and intensity levels of their emotional experiences.',
                },
                'phase2-body': {
                  title: 'Create Body Map',
                  description: 'Participants use body maps to note areas of emotional resonance, mapping where in their body they feel specific emotions. This phase allows reflection on how emotions are felt physically. These body maps become the basis for placing haptic actuators during the on-body prototyping sessions, ensuring the feedback is positioned where emotions naturally manifest.',
                },
                'phase3': {
                  title: 'Phase 3: Tandem Prototyping Sessions',
                  description: 'The third phase centers on practical implementation of theoretical knowledge. Participants work in pairs with the Hapticlabs DevKit, alternating between designer and user roles. One participant creates and programs haptic feedback patterns while the other experiences them, providing immediate feedback. This iterative process allows both participants to contribute to the design while experiencing affective haptic feedback as intended for their partner\'s emotional object.',
                  scientific: 'Implements Buchenau, M. & Fulton Suri, J. (2000). "Experience prototyping" [DOI: 10.1145/347642.347802] and tandem design methodology for collaborative learning and immediate feedback integration in haptic system development.',
                  citations: [
                    { text: 'Buchenau & Suri (2000)', url: 'https://doi.org/10.1145/347642.347802' }
                  ]
                },
                'phase3-setup': {
                  title: 'DevKit Setup & Exploration',
                  description: 'Participants set up and explore the Hapticlabs DevKit containing three actuator types: ERM (Eccentric Rotating Mass) for simple, strong vibrations; LRA (Linear Resonant Actuator) for precise, responsive feedback; and Piezoelectric for highest precision and fastest response. They familiarize themselves with controlling intensity, frequency, and patterns through the Hapticlabs Studio software.',
                },
                'phase3-designer': {
                  title: 'Designer Role',
                  description: 'In the designer role, participants translate their partner\'s embodied metaphors and body map into haptic feedback parameters. They program patterns in Hapticlabs Studio, adjusting intensity, frequency, and rhythm to match the emotional quality. Then they test the actuators on their partner\'s body at the locations identified in the body mapping phase.',
                },
                'phase3-user': {
                  title: 'User Role', 
                  description: 'In the user role, participants experience the haptic feedback designed for their emotional object. They describe the sensation quality, emotional resonance, and how well it matches their intended emotion. They provide detailed feedback about intensity, timing, placement, and suggest adjustments to better capture the emotional essence.',
                },
                'phase4': {
                  title: 'Phase 4: Reflection & Documentation',
                  description: 'In the final phase, participants provide detailed feedback on the tandem on-body prototyping process, toolkit usefulness, and how well the methodologies (Emotion Typology, Circumplex Model of Affect, embodied metaphors, body mapping techniques) helped them translate the emotions of their chosen object into haptic feedback. This combines a quantitative survey and qualitative group discussion.',
                  scientific: 'Mixed-methods evaluation approach combining quantitative feedback surveys with qualitative group discussion to assess toolkit effectiveness and methodological impact on novice designers\' capabilities.'
                },
                'phase4-discuss': {
                  title: 'Group Discussion',
                  description: 'Facilitated group discussion with six guiding questions allows participants to share experiences, challenges, and insights from the prototyping process. This qualitative data collection explores technical challenges with hardware/software, emotional translation difficulties, and successful design strategies discovered during the workshop.',
                },
                'phase4-survey': {
                  title: 'Quantitative Feedback Survey',
                  description: 'Individual written survey collects quantitative data to evaluate the workshop and methodological techniques, directly linking back to the research questions and hypotheses. Participants rate the usefulness of each toolkit component and methodology in helping them create affective haptic feedback.',
                }
              };
              
              return (
                <>
                  <SimpleTreeView onSelectedItemsChange={(event, itemId) => setSelectedItem(itemId)}>
              <TreeItem itemId="phase1" label="Phase 1: Understanding Emotional Frameworks (30 min)">
                <TreeItem itemId="phase1-intro" label="Emotion Typology Introduction" />
                <TreeItem itemId="phase1-circumplex" label="Circumplex Model of Affect">
                  <TreeItem itemId="phase1-valence" label="Map by Valence (Positive ↔ Negative)" />
                  <TreeItem itemId="phase1-arousal" label="Map by Arousal (High ↔ Low)" />
                </TreeItem>
                <TreeItem itemId="phase1-haptics" label="Introduction to Haptic Feedback" />
                <TreeItem itemId="phase1-object" label="Identify Personal Object" />
              </TreeItem>
              
              <TreeItem itemId="phase2" label="Phase 2: Metaphor Elicitation & Body Mapping (50 min)">
                <TreeItem itemId="phase2-object" label="Introduce Emotional Object" />
                <TreeItem itemId="phase2-metaphor" label="Elicit Embodied Metaphors">
                  <TreeItem itemId="phase2-physical" label="Physical Sensations" />
                  <TreeItem itemId="phase2-temporal" label="Temporal Patterns" />
                  <TreeItem itemId="phase2-intensity" label="Intensity Levels" />
                </TreeItem>
                <TreeItem itemId="phase2-body" label="Create Body Map">
                  <TreeItem itemId="phase2-location" label="Mark Sensation Locations" />
                  <TreeItem itemId="phase2-placement" label="Define Actuator Placement" />
                </TreeItem>
                <TreeItem itemId="phase2-document" label="Document Ideas (20 min)" />
              </TreeItem>
              
              <TreeItem itemId="phase3" label="Phase 3: Tandem Prototyping Sessions (2×45 min)">
                <TreeItem itemId="phase3-setup" label="DevKit Setup & Exploration (10 min)" />
                <TreeItem itemId="phase3-pair" label="Pairing & Cheatsheet (5 min)" />
                <TreeItem itemId="phase3-designer" label="Designer Role">
                  <TreeItem itemId="phase3-translate" label="Translate Metaphors to Parameters" />
                  <TreeItem itemId="phase3-program" label="Program Haptic Patterns" />
                  <TreeItem itemId="phase3-test" label="Test on Partner's Body" />
                </TreeItem>
                <TreeItem itemId="phase3-user" label="User Role">
                  <TreeItem itemId="phase3-experience" label="Experience Feedback" />
                  <TreeItem itemId="phase3-describe" label="Describe Sensation" />
                  <TreeItem itemId="phase3-suggest" label="Suggest Adjustments" />
                </TreeItem>
                <TreeItem itemId="phase3-iterate" label="Iterate Based on Feedback" />
                <TreeItem itemId="phase3-switch" label="Switch Roles & Repeat" />
              </TreeItem>
              
              <TreeItem itemId="phase4" label="Phase 4: Reflection & Documentation (25 min)">
                <TreeItem itemId="phase4-share" label="Share Prototypes" />
                <TreeItem itemId="phase4-discuss" label="Group Discussion">
                  <TreeItem itemId="phase4-challenges" label="Technical Challenges" />
                  <TreeItem itemId="phase4-insights" label="Emotional Insights" />
                  <TreeItem itemId="phase4-patterns" label="Design Patterns" />
                </TreeItem>
                <TreeItem itemId="phase4-survey" label="Feedback Survey" />
              </TreeItem>
            </SimpleTreeView>
            {selectedItem && itemDescriptions[selectedItem] && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  maxWidth: 400,
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: 2,
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                  animation: 'fadeIn 0.3s ease-in',
                  zIndex: 10
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: '#fff' }}>
                  {itemDescriptions[selectedItem].title}
                </Typography>
                <Typography variant="body2" paragraph sx={{ color: '#fff' }}>
                  {itemDescriptions[selectedItem].description}
                </Typography>
                {itemDescriptions[selectedItem].scientific && (
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.3)' }}>
                    <Typography variant="caption" fontWeight="bold" display="block" gutterBottom sx={{ color: '#fff' }}>
                      Scientific Foundation:
                    </Typography>
                    <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.9)', mb: 1, display: 'block' }}>
                      {itemDescriptions[selectedItem].scientific}
                    </Typography>
                    {itemDescriptions[selectedItem].citations && (
                      <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {itemDescriptions[selectedItem].citations.map((citation, index) => (
                          <Box
                            key={index}
                            component="a"
                            href={citation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              fontSize: '0.65rem',
                              px: 1,
                              py: 0.5,
                              bgcolor: 'rgba(255, 255, 255, 0.2)',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              borderRadius: 1,
                              color: '#fff',
                              textDecoration: 'none',
                              transition: 'all 0.2s',
                              '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.3)',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                              }
                            }}
                          >
                            🔗 {citation.text}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            )}
          </>
        );
      })}
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.workshop },
      layout: 'textLeft',
      anchor: 'workshop-flow',
      navigable: true
    },
    {
      id: 'section-toolkit',
      type: 'cardGrid',
      title: 'Toolkit Components',
      content: 'The methodology toolkit combines theoretical frameworks with practical prototyping resources, designed for educational contexts and novice designers.',
      items: [
        {
          title: 'Visual Templates',
          icon: '📋',
          color: 'primary.main',
          description: 'Structured guides for emotion exploration and categorization.',
          features: [
            'Metaphor elicitation worksheets',
            'Emotion categorization frameworks (Circumplex Model, Delft Typology)',
            'Body mapping templates for actuator placement',
            'Visual documentation guides'
          ]
        },
        {
          title: 'Physical Prototyping',
          icon: '🔧',
          color: 'secondary.main',
          description: 'Hardware and materials for hands on haptic experimentation.',
          features: [
            'Hapticlabs DevKit with multiple actuator types',
            'ERM, LRA, and Voice Coil actuators',
            'Tactile materials library',
            'Rapid prototyping components',
            'On body testing equipment'
          ]
        },
        {
          title: 'Digital Workspace',
          icon: '💻',
          color: 'info.main',
          description: 'Collaborative tools for documentation and remote iteration.',
          features: [
            'Miro boards for visual collaboration',
            'Documentation templates',
            'Remote workshop facilitation tools',
            'Iterative refinement workflows',
            'Participant feedback collection'
          ]
        },
        {
          title: 'Workshop Methodology',
          icon: '👥',
          color: 'success.main',
          description: 'Structured approach for facilitating haptic design workshops.',
          features: [
            'Four phase workshop structure',
            'Tandem prototyping guidelines',
            'Participant role rotation system',
            'Feedback collection methods',
            'Educational scaffolding techniques'
          ]
        }
      ],
      columns: {
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2
      },
      cardVariant: 'elevation',
      anchor: 'toolkit',
      navigable: true
    },
    {
      id: 'section-outcomes',
      type: 'outcomes',
      title: 'Key Outcomes & Contributions',
      content: (
        <>
          <Typography variant="body1" paragraph>
            This research provides an accessible framework for novice haptic designers, making affective haptic design more approachable in educational and professional settings. The workshop with 6 participants from diverse backgrounds in human computer interaction demonstrated the toolkit's effectiveness in reducing technical barriers and enhancing collaborative design outcomes.
          </Typography>
          <Typography variant="body1" paragraph>
            Key findings from workshop analysis:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Toolkit reduced technical barriers:</strong> Participants successfully translated abstract emotions into resonant haptic feedback without prior haptic design experience</Typography></li>
            <li><Typography variant="body1"><strong>Tandem approach enhanced collaboration:</strong> Role alternation between designer and user improved communication and created more personally meaningful experiences</Typography></li>
            <li><Typography variant="body1"><strong>Emotional connections matter:</strong> Participants who brought personally meaningful objects achieved deeper emotional resonance in their prototypes</Typography></li>
            <li><Typography variant="body1"><strong>Systematic emotion mapping:</strong> The Circumplex Model of Affect successfully guided participants in mapping emotions to haptic parameters</Typography></li>
            <li><Typography variant="body1"><strong>Body mapping reveals placement insights:</strong> On body testing provided essential context for actuator placement and intensity preferences</Typography></li>
            <li><Typography variant="body1"><strong>Temporal patterns drive emotion:</strong> Rhythm, duration, and pattern evolution proved critical for emotional haptic feedback</Typography></li>
            <li><Typography variant="body1"><strong>Subjective interpretation enriches design:</strong> Individual differences in haptic perception highlighted the need for personalization</Typography></li>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.prototype },
      layout: 'textRight',
      anchor: 'outcomes',
      navigable: true,
      outcomes: [
        "Design patterns for translating emotions into tactile experiences",
        "Workshop materials and templates for emotional haptic prototyping",
        "Validated methodological toolkit for emotion driven haptic design"
      ]
    },
    {
      id: 'section-references',
      type: 'default',
      title: 'References & Resources',
      content: (
        <>
          <Typography variant="body2" paragraph sx={{ mb: 3, fontStyle: 'italic', color: 'text.secondary' }}>
            Master's thesis completed at FH Salzburg, Human-Computer Interaction program, in collaboration with Hapticlabs for hardware prototyping.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Key Academic References
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
            <Button
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
              href="https://doi.org/10.1037/h0077714"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Russell (1980) - Circumplex Model
            </Button>
            <Button
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
              href="https://doi.org/10.1017/S0954579405050340"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Posner et al. (2005)
            </Button>
            <Button
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
              href="https://doi.org/10.1007/s00779-011-0410-4"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Bakker et al. (2012)
            </Button>
            <Button
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
              href="https://doi.org/10.1145/3569009.3573838"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Turmo Vidal et al. (2023)
            </Button>
            <Button
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
              href="https://doi.org/10.1145/347642.347802"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Buchenau & Suri (2000)
            </Button>
          </Box>
          
          <Typography variant="h6" sx={{ mb: 2, mt: 4, color: 'text.secondary' }}>
            Tools & Resources
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
            <Button
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
              href="https://www.hapticlabs.io/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Hapticlabs DevKit
            </Button>
            <Button
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
              href="https://www.hapticlabs.io/tutorial"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Hapticlabs Tutorial
            </Button>
            <Button
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
              href="https://emotiontypology.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                borderRadius: 1.5,
              }}
            >
              Emotion Typology Framework
            </Button>
          </Box>
          
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <li>
              <Typography variant="body2">
                Russell, J. A. (1980). A circumplex model of affect. <em>Journal of Personality and Social Psychology</em>, 39(6), 1161–1178.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Posner, J., Russell, J. A., & Peterson, B. S. (2005). The circumplex model of affect: An integrative approach to affective neuroscience, cognitive development, and psychopathology. <em>Development and Psychopathology</em>, 17(3), 715–734. DOI: 10.1017/S0954579405050340
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Bakker, S., Antle, A. N., & van den Hoven, E. (2012). Embodied metaphors in tangible interaction design. <em>Personal and Ubiquitous Computing</em>, 16(4), 433–449. DOI: 10.1007/s00779-011-0410-4
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Turmo Vidal, L., et al. (2023). Towards Advancing Body Maps as Research Tool. <em>CHI EA '23</em>. DOI: 10.1145/3569009.3573838
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Buchenau, M. & Fulton Suri, J. (2000). Experience prototyping. <em>DIS '00</em>, 424–433. DOI: 10.1145/347642.347802
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Ahmed, A., et al. (2023). Wearable devices for anxiety & depression: A scoping review. <em>Computer Methods and Programs in Biomedicine Update</em>, 3, 100095.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Akshita, et al. (2015). Towards multimodal affective feedback: Interaction between visual and haptic modalities. <em>CHI '15</em>, 2043–2052. ACM.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Alhejaili, R. (2023). Wearable technology for mental wellness monitoring and feedback. Thesis, Queen Mary University of London.
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
masterThesis.media = (() => {
  const firstVideo = masterThesis.sections?.find(s => s.media && s.media.type === 'video');
  if (firstVideo) return firstVideo.media;
  const firstImage = masterThesis.sections?.find(s => s.media && s.media.type === 'image');
  if (firstImage) return firstImage.media;
  return undefined;
})();

export default masterThesis;
