/**
 * ADHDeer Project Data
 *
 * This file contains the structured data for the ADHDeer ADHD support app project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

// Import project images and videos directly with standardized naming
import ADHDeerOverview from '../../../../assets/images/ADHDeer/ADHDeer_Overview.png';
import ADHDeerCoreDimensions from '../../../../assets/images/ADHDeer/ADHDeer_CoreDimensions.png';
import ADHDeerForumOverview from '../../../../assets/images/ADHDeer/ADHDeer_Forum_Overview.png';
import ADHDeerForumPostStep1 from '../../../../assets/images/ADHDeer/ADHDeer_ForumPost_Step1.png';
import ADHDeerForumPostStep2 from '../../../../assets/images/ADHDeer/ADHDeer_ForumPost_Step2.png';
import ADHDeerDiaryStep1 from '../../../../assets/images/ADHDeer/ADHDeer_Diary_Step1.png';
import ADHDeerDiaryStep2 from '../../../../assets/images/ADHDeer/ADHDeer_Diary_Step2.png';
import ADHDeerDiaryStep3 from '../../../../assets/images/ADHDeer/ADHDeer_Diary_Step3.png';
import ADHDeerArticlesStep1 from '../../../../assets/images/ADHDeer/ADHDeer_Articles_Step1.png';
import ADHDeerArticlesStep2 from '../../../../assets/images/ADHDeer/ADHDeer_Articles_Step2.png';
import ADHDeerMoodCalendarStep1 from '../../../../assets/images/ADHDeer/ADHDeer_MoodCalendar_Step1.png';
import ADHDeerMoodCalendarStep2 from '../../../../assets/images/ADHDeer/ADHDeer_MoodCalendar_Step2.png';
import ADHDeerMoodCalendarSymptoms from '../../../../assets/images/ADHDeer/ADHDeer_MoodCalendar_Symptoms.png';
import ADHDeerMainMenuOverview from '../../../../assets/images/ADHDeer/ADHDeer_MainMenu_Overview.png';
import ADHDeerRegistrationDone from '../../../../assets/images/ADHDeer/ADHDeer_Registration_Done.png';
import presentationPDF from '../../../../assets/information/ADHDeer/ADHDeerPresentation.pdf';

// Import utility for asset paths (only for documents)
import { getAssetPath } from '../../../../utils/mediaUtils';

// Create a media object to hold all our imported media
const media = {
  images: {
    overview: ADHDeerOverview,
    coreDimensions: ADHDeerCoreDimensions,
    forumOverview: ADHDeerForumOverview,
    forumPostStep1: ADHDeerForumPostStep1,
    forumPostStep2: ADHDeerForumPostStep2,
    diaryStep1: ADHDeerDiaryStep1,
    diaryStep2: ADHDeerDiaryStep2,
    diaryStep3: ADHDeerDiaryStep3,
    articlesStep1: ADHDeerArticlesStep1,
    articlesStep2: ADHDeerArticlesStep2,
    moodCalendarStep1: ADHDeerMoodCalendarStep1,
    moodCalendarStep2: ADHDeerMoodCalendarStep2,
    moodCalendarSymptoms: ADHDeerMoodCalendarSymptoms,
    mainMenuOverview: ADHDeerMainMenuOverview,
    registrationDone: ADHDeerRegistrationDone
  },
  videos: {
    prototype: '/assets/ADHDeer_Video_Prototype.mp4'
  },
  documents: {
    // Use getAssetPath only for documents in the public folder
    presentation: getAssetPath('ADHDeer', 'ADHDeerPresentation.pdf')
  }
};

// Project data object
const adhdeer = {
  id: 'adhdeer',
  title: "ADHDeer – ADHD Support App",
  description: "A mobile app that helps young people with ADHD manage daily routines through empathic UX design and structured support tools.",
  categories: ["UI Design", "UX Research", "Mental Health UX", "Prototyping", "Design Thinking"],
  cardVariant: 'warning',
  technologies: ["Figma", "Miro", "Adobe Illustrator", "User Testing"],
  links: [
    {
      label: "View Presentation",
      url: presentationPDF,
      contentType: 'pdf',
      openInPopup: true
    },
    {
      label: "Try Figma Prototype",
      url: "https://embed.figma.com/design/XJZe9gLj6NkgA05QERnsmD/ADHDeer---Group?node-id=0-1&embed-host=share",
      contentType: 'iframe',
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
            <strong>ADHDeer</strong> is a mobile app designed during a Design Thinking project at FH Salzburg to support young adults and children with Attention Deficit Hyperactivity Disorder (ADHD). The app helps users and their families manage daily challenges through personalized tools that promote self-awareness, emotional regulation, and structured routines.
          </Typography>
          <Typography variant="body1" paragraph>
            The design team combined personal experiences with ADHD, user centered research, and empathic design methodologies to create a practical digital companion that addresses real needs in the ADHD community.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.overview, aspect: 'landscape' },
      layout: 'textLeft',
      anchor: 'overview',
      navigable: true
    },
    {
      id: 'section-motivation',
      type: 'default',
      title: 'Motivation and Context',
      content: (
        <>
          <Typography variant="body1" paragraph>
            ADHD affects everyday life through challenges with attention, hyperactivity, and impulse control. These traits impact academic performance, social relationships, and emotional wellbeing. Team members brought firsthand ADHD expertise (66.6% of the team), understanding the challenges neurodivergent individuals face daily.
          </Typography>
          <Typography variant="body1" paragraph>
            The project emerged from recognizing that young people with ADHD often feel misunderstood, isolated, and lack accessible tools to manage their condition proactively. This personal connection informed every design decision.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.coreDimensions, aspect: 'landscape' },
      layout: 'textRight',
      anchor: 'motivation',
      navigable: true
    },
    {
      id: 'section-problem',
      type: 'default',
      title: 'Defining the Problem',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Research and empathy work revealed three core challenges:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Communication barriers:</strong> Young people find it difficult to express emotional needs to parents, caregivers, or educators. Parents struggle to gauge the right level of support, often providing too much or too little help.</Typography></li>
            <li><Typography variant="body1"><strong>Diagnosis gaps:</strong> Underdiagnosis and misdiagnosis leave many individuals without proper understanding of their condition, leading to additional mental health challenges including anxiety and depression.</Typography></li>
            <li><Typography variant="body1"><strong>Daily structure needs:</strong> Time management, routine maintenance, and goal setting prove particularly difficult for people with ADHD. These struggles affect confidence and self esteem when not properly addressed.</Typography></li>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.mainMenuOverview, aspect: 'portrait' },
      layout: 'textLeft',
      anchor: 'problem',
      navigable: true
    },
    {
      id: 'section-research',
      type: 'gallery',
      title: 'Research and Empathy',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The research phase combined multiple methods to build deep user understanding:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Interviews and personal insights:</strong> In-depth conversations with ADHD experts, diagnosed individuals, and their families revealed everyday challenges and emotional needs.</Typography></li>
            <li><Typography variant="body1"><strong>Digital ethnography:</strong> Analysis of online communities including Reddit, Quora, and ADHD-specific forums identified common struggles, coping strategies, and gaps in existing support tools.</Typography></li>
            <li><Typography variant="body1"><strong>Collaborative ideation:</strong> Focus groups using mind mapping, brainstorming, and storyboarding techniques helped visualize user journeys and solution possibilities.</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            These research insights shaped the app's focus on both emotional support and practical daily structure tools.
          </Typography>
        </>
      ),
      media: [
        { src: media.images.forumOverview, alt: 'Forum overview screen' },
        { src: media.images.forumPostStep1, alt: 'Forum post creation step 1' },
        { src: media.images.forumPostStep2, alt: 'Forum post creation step 2' }
      ],
      layout: 'gallery',
      anchor: 'research',
      navigable: true
    },
    {
      id: 'section-ideation',
      type: 'gallery',
      title: 'Ideation and Core Functionalities',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Ideation identified three core dimensions for the app:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Mental health and emotional regulation</Typography></li>
            <li><Typography variant="body1">ADHD awareness and understanding</Typography></li>
            <li><Typography variant="body1">Daily routine management and self assessment</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            These dimensions translated into practical features:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Emotion tracking and management:</strong> Interactive tools help users identify, articulate, and manage emotional states.</Typography></li>
            <li><Typography variant="body1"><strong>Routine and task management:</strong> Visual, gamified task scheduling and prioritization designed specifically for ADHD users.</Typography></li>
            <li><Typography variant="body1"><strong>Educational content and self awareness:</strong> Structured information helps users recognize symptoms, strengths, and coping strategies.</Typography></li>
            <li><Typography variant="body1"><strong>Emergency support access:</strong> Low threshold contact for immediate mental health support during acute emotional crises.</Typography></li>
          </Box>
        </>
      ),
      media: [
        { src: media.images.diaryStep1, alt: 'Diary entry step 1' },
        { src: media.images.diaryStep2, alt: 'Diary entry step 2' },
        { src: media.images.diaryStep3, alt: 'Diary entry step 3' }
      ],
      layout: 'gallery',
      anchor: 'ideation',
      navigable: true
    },
    {
      id: 'section-features-tree',
      type: 'default',
      title: 'Core Features Walkthrough',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Explore the main features designed to support young people with ADHD in their daily lives.
          </Typography>
          <Box sx={{ minHeight: 400, flexGrow: 1, maxWidth: 800 }}>
            <SimpleTreeView>
              <TreeItem itemId="forum" label="Community Forum">
                <TreeItem itemId="forum-browse" label="Step 1: Browse Topics" />
                <TreeItem itemId="forum-read" label="Step 2: Read Discussions" />
                <TreeItem itemId="forum-post" label="Step 3: Share Your Experience">
                  <TreeItem itemId="forum-post-anonymous" label="Option: Post Anonymously" />
                  <TreeItem itemId="forum-post-public" label="Option: Post Publicly" />
                </TreeItem>
                <TreeItem itemId="forum-engage" label="Step 4: Engage with Community" />
              </TreeItem>
              
              <TreeItem itemId="diary" label="Personal Diary">
                <TreeItem itemId="diary-open" label="Step 1: Open Diary Entry" />
                <TreeItem itemId="diary-select" label="Step 2: Select Emotion">
                  <TreeItem itemId="diary-happy" label="Happy / Content" />
                  <TreeItem itemId="diary-anxious" label="Anxious / Worried" />
                  <TreeItem itemId="diary-frustrated" label="Frustrated / Overwhelmed" />
                  <TreeItem itemId="diary-sad" label="Sad / Down" />
                </TreeItem>
                <TreeItem itemId="diary-write" label="Step 3: Write Your Thoughts" />
                <TreeItem itemId="diary-save" label="Step 4: Save Entry" />
              </TreeItem>
              
              <TreeItem itemId="mood" label="Mood Calendar">
                <TreeItem itemId="mood-view" label="Step 1: View Calendar Overview" />
                <TreeItem itemId="mood-select" label="Step 2: Select Date" />
                <TreeItem itemId="mood-track" label="Step 3: Track Symptoms">
                  <TreeItem itemId="mood-attention" label="Attention Issues" />
                  <TreeItem itemId="mood-hyperactivity" label="Hyperactivity" />
                  <TreeItem itemId="mood-impulse" label="Impulse Control" />
                </TreeItem>
                <TreeItem itemId="mood-patterns" label="Step 4: Review Patterns" />
                <TreeItem itemId="mood-share" label="Step 5: Share with Healthcare Provider" />
              </TreeItem>
              
              <TreeItem itemId="articles" label="Educational Articles">
                <TreeItem itemId="articles-browse" label="Step 1: Browse Categories" />
                <TreeItem itemId="articles-read" label="Step 2: Read Article" />
                <TreeItem itemId="articles-bookmark" label="Step 3: Bookmark Favorites" />
                <TreeItem itemId="articles-apply" label="Step 4: Apply Strategies" />
              </TreeItem>
              
              <TreeItem itemId="emergency" label="Emergency Support">
                <TreeItem itemId="emergency-access" label="Step 1: Quick Access Button" />
                <TreeItem itemId="emergency-choose" label="Step 2: Choose Support Type">
                  <TreeItem itemId="emergency-hotline" label="Crisis Hotline" />
                  <TreeItem itemId="emergency-trusted" label="Contact Trusted Person" />
                  <TreeItem itemId="emergency-resources" label="Local Resources" />
                </TreeItem>
                <TreeItem itemId="emergency-connect" label="Step 3: Connect Immediately" />
              </TreeItem>
            </SimpleTreeView>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.mainMenuOverview, aspect: 'portrait', fit: 'contain' },
      layout: 'textLeft',
      anchor: 'features',
      navigable: true
    },
    {
      id: 'section-prototype',
      type: 'gallery',
      title: 'Design Execution',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The Figma prototype prioritized accessibility, usability, and engagement for neurodiverse audiences. The design emphasized clarity and visual appeal while avoiding overwhelming or distracting elements.
          </Typography>
        </>
      ),
      media: [
        { src: media.images.moodCalendarStep2, alt: 'Mood calendar entry' },
        { src: media.images.moodCalendarSymptoms, alt: 'Symptom tracking interface' },
        { src: media.images.mainMenuOverview, alt: 'Main menu overview' }
      ],
      layout: 'gallery',
      anchor: 'prototype',
      navigable: true
    },
    {
      id: 'section-articles',
      type: 'gallery',
      title: 'Educational Content',
      content: (
        <Typography variant="body1" paragraph>
          The app includes accessible articles and resources that help users and families understand ADHD and develop effective coping strategies.
        </Typography>
      ),
      media: [
        { src: media.images.articlesStep1, alt: 'Educational articles overview' },
        { src: media.images.articlesStep2, alt: 'Article reading view' }
      ],
      layout: 'gallery',
      anchor: 'articles',
      navigable: true
    },
    {
      id: 'section-onboarding',
      type: 'gallery',
      title: 'Onboarding and Registration',
      content: (
        <Typography variant="body1" paragraph>
          Clear, accessible main menu and onboarding screens provide a smooth entry point for new users.
        </Typography>
      ),
      media: [
        { src: media.images.mainMenuOverview, alt: 'Main menu interface' },
        { src: media.images.registrationDone, alt: 'Registration completion screen' }
      ],
      layout: 'gallery',
      anchor: 'onboarding',
      navigable: true
    },
    {
      id: 'section-video',
      type: 'video',
      title: 'Prototype Video',
      content: (
        <Typography variant="body1" paragraph>
          This video demonstrates the app's core user flows and gamified features in action.
        </Typography>
      ),
      media: { type: 'video', src: media.videos.prototype, aspect: 'landscape' },
      layout: 'textRight',
      anchor: 'video',
      navigable: true
    },
    {
      id: 'section-outcomes',
      type: 'default',
      title: 'Outcomes and Evaluation',
      content: (
        <Typography variant="body1" paragraph>
          Initial user testing generated positive feedback. Test users appreciated the intuitive interface, playful aesthetics, and empathetic tone. They highlighted the app's potential to improve daily structure, emotional awareness, and self-confidence in managing ADHD.
        </Typography>
      ),
      layout: 'textOnly',
      anchor: 'outcomes',
      navigable: true
    },
    {
      id: 'section-future',
      type: 'default',
      title: 'Future Directions',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Recommended enhancements for future development:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>AI driven personalization:</strong> Adaptive feedback that responds to user behavior patterns and emotional trends.</Typography></li>
            <li><Typography variant="body1"><strong>Community features:</strong> Safe, moderated peer support forums that foster connection and understanding among young ADHD users.</Typography></li>
            <li><Typography variant="body1"><strong>Parent and educator modules:</strong> Tailored guidance and resources helping parents and educators provide better support.</Typography></li>
          </Box>
        </>
      ),
      layout: 'textOnly',
      anchor: 'future',
    },
    {
      id: 'section-impact',
      type: 'default',
      title: 'Impact and Conclusion',
      content: (
        <Typography variant="body1" paragraph>
          ADHDeer demonstrates how user centered, empathetic UX design can improve quality of life for young people with ADHD. The project combines research driven insights, compassionate ideation, and thoughtful prototyping to create a supportive digital tool that empowers neurodivergent youth in managing their emotional health, daily routines, and self esteem.
        </Typography>
      ),
      layout: 'textOnly',
      anchor: 'impact',
      navigable: true
    },
    {
      id: 'section-references',
      type: 'default',
      title: 'Project Context',
      content: (
        <>
          <Typography variant="body2" paragraph sx={{ mb: 3, fontStyle: 'italic', color: 'text.secondary' }}>
            Design Thinking project completed at FH Salzburg in collaboration with a multidisciplinary team focused on mental health UX. All project resources are available via the action buttons above.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Related Topics & Resources
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body2">
                <strong>ADHD awareness:</strong> Understanding attention deficit hyperactivity disorder in young people
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Mental health UX:</strong> Designing empathetic digital tools for neurodivergent users
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Gamification for wellbeing:</strong> Using game mechanics to support daily routine management
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Emotion tracking:</strong> Digital tools for emotional regulation and self-awareness
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

adhdeer.media = (() => {
  // Find first video section
  const firstVideo = adhdeer.sections?.find(s => {
    if (Array.isArray(s.media)) {
      return s.media.some(m => m.type === 'video');
    }
    return s.media && s.media.type === 'video';
  });
  if (firstVideo) {
    if (Array.isArray(firstVideo.media)) {
      const video = firstVideo.media.find(m => m.type === 'video');
      if (video) return video;
    } else {
      return firstVideo.media;
    }
  }
  // Otherwise, find first image
  const firstImage = adhdeer.sections?.find(s => {
    if (Array.isArray(s.media)) {
      return s.media.some(m => m.type === 'image');
    }
    return s.media && s.media.type === 'image';
  });
  if (firstImage) {
    if (Array.isArray(firstImage.media)) {
      const image = firstImage.media.find(m => m.type === 'image');
      if (image) return image;
    } else {
      return firstImage.media;
    }
  }
  return undefined;
})();

export default adhdeer;
