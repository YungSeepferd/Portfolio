/**
 * Master Thesis Project Data
 * 
 * This file contains the structured data for the Prototyping Emotions master thesis project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
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

// Define links array with consistent format
const links = [
  {
    label: "View Presentation",
    url: presentationPDF,
    contentType: 'pdf',
    openInPopup: true
  },
  {
    label: "View Thesis",
    url: thesisPDF,
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
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Box
              component="a"
              href="https://doi.org/10.1037/h0077714"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                color: 'primary.light',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              🔗 Russell (1980)
            </Box>
            <Box
              component="a"
              href="https://doi.org/10.1007/s00779-011-0410-4"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                color: 'primary.light',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              🔗 Bakker et al. (2012)
            </Box>
            <Box
              component="a"
              href="https://doi.org/10.1145/3569009.3573838"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                color: 'primary.light',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              🔗 Turmo Vidal et al. (2023)
            </Box>
            <Box
              component="a"
              href="https://doi.org/10.1145/347642.347802"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                color: 'primary.light',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              🔗 Buchenau & Suri (2000)
            </Box>
            <Box
              component="a"
              href="https://emotiontypology.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                color: 'primary.light',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              🔗 Emotion Typology Tool
            </Box>
            <Box
              component="a"
              href="https://www.hapticlabs.io/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                color: 'primary.light',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              🔗 Hapticlabs DevKit
            </Box>
          </Box>
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
